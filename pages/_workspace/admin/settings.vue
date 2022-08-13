<template>
  <div class="p-4">
    <div class="settings">
      <template v-if="$apollo.queries.adminWorkspace.loading"><Preload/></template>
      <template v-else>
      <h3 class="text-center py-4">Admin Settings</h3>

      <b-form
        v-if="show"
        method="POST"
        @submit.prevent="onSubmit"
        @keydown="form.onKeydown($event)"
        @reset.prevent="onReset"
      >
        <section class="p-4">
          <h3>Media</h3>

          <div class="d-flex justify-content-around mb-4">
            <div>
              <div class="profile-avatar mb-2">
                <div v-if="preview_url_logo == null" class="photo-preview">
                  <img
                    src="@/assets/svg/graduate-student.svg"
                    alt=""
                    style="border-radius: 50%"
                  />
                </div>
                <div
                  v-else
                  class="photo-preview"
                  :style="{
                    backgroundImage: `url(${preview_url_logo})`,
                  }"
                ></div>

                <b-form-group>
                  <div class="file-upload">
                    <b-button
                      variant="white"
                      class="shadow-sm"
                      size="sm"
                      pill
                      @click="selectImage"
                    >
                      <b-icon icon="camera-fill" />
                    </b-button>
                    <input
                      id="avatar"
                      ref="Avatar"
                      type="file"
                      accept="image"
                      class="file-upload__input"
                      hidden
                      @change="handleFileUpload()"
                    />
                  </div>
                  <b-form-invalid-feedback :state="!form.errors.has('logo')">
                    {{ form.errors.get('logo') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>

              <div class="text-center">
                <p class="small mb-2">
                  Recommended size: Less than 2MB (150 x 150)
                </p>
                <b-button
                  variant="outline-primary"
                  size="md"
                  class="px-3"
                  pill
                  @click="selectImage"
                >
                  Upload logo
                </b-button>
              </div>
            </div>
            <div>
              <div class="profile-avatar mb-2">
                <div v-if="preview_url_stamp == null" class="photo-preview">
                  <img
                    src="@/assets/svg/graduate-student.svg"
                    alt=""
                    style="border-radius: 50%"
                  />
                </div>
                <div
                  v-else
                  class="photo-preview"
                  :style="{
                    backgroundImage: `url(${preview_url_stamp})`,
                  }"
                ></div>

                <b-form-group>
                  <div class="file-upload">
                    <b-button
                      variant="white"
                      class="shadow-sm"
                      size="sm"
                      pill
                      @click="selectStamp"
                    >
                      <b-icon icon="camera-fill" />
                    </b-button>
                    <input
                      id="Stamp"
                      ref="Stamp"
                      type="file"
                      accept="image"
                      class="file-upload__input"
                      hidden
                      @change="handleStampUpload()"
                    />
                  </div>
                  <b-form-invalid-feedback :state="!form.errors.has('stam')">
                    {{ form.errors.get('stamp') }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>

              <div class="text-center">
                <p class="small mb-2">
                  Recommended size: Less than 2MB (150 x 150)
                </p>
                <b-button
                  variant="outline-primary"
                  size="md"
                  class="px-3"
                  pill
                  @click="selectStamp"
                >
                  Upload stamp
                </b-button>
              </div>
            </div>
          </div>
        </section>

        <section class="p-4">
          <h3>Online Payment</h3>
          <div class="paymnet-method">
            <div class="paymnet-card">
              <div v-if="preview_url_logo == null">
                <img
                  src="@/assets/svg/paystack.svg"
                  alt="online-payment"
                  width="200"
                />
              </div>
              <div v-else>
                <img
                  src="@/assets/svg/paystack.svg"
                  alt="online-payment"
                  width="200"
                />
              </div>
            </div>
            <!-- online payment -->
            <div class="paymnet-input-field">
              <b-form-input
                id="paystack_secret_key"
                v-model="form.paystack_secret_key"
                type="text"
                placeholder="Enter your paystack secret key"
                name="paystack_secret_key"
                trim
                size="lg"
              ></b-form-input>
              <b-form-invalid-feedback
                :state="!form.errors.has('paystack_secret_key')"
              >
                {{ form.errors.get('paystack_secret_key') }}
              </b-form-invalid-feedback>
            </div>
          </div>
        </section>

        <b-button type="submit" variant="primary" class="mr-4" size="lg">
          <b-spinner
            v-if="form.busy"
            variant="light"
            class="mr-1 mb-1"
            small
          />Submit</b-button
        >
      </b-form>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { ADMIN_WORKSPACE_QUERIES } from '~/graphql/workspace/queries'
import { UPDATE_SETTING_ADMIN_MUTATION } from '~/graphql/workspace/mutations'
export default {
  middleware: 'auth',
  data() {
    return {
      preview_url_logo: null,
      preview_url_stamp: null,
      logo: null,
      stamp: null,
      form: new this.$form({
        logo: null,
        stamp: null,
        paystack_secret_key: null,
      }),
      show: true,
    }
  },
  apollo: {
    adminWorkspace: {
      query: ADMIN_WORKSPACE_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
          status: 1,
        }
      },
      result({ data, loading }) {
        if (!loading) {
          const adminWorkspace = data.adminWorkspace
          this.form.paystack_secret_key = adminWorkspace.paystack_secret_key
          this.logo = adminWorkspace.logo
          this.stamp = adminWorkspace.stamp
        }
      },
    },
  },

  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  methods: {
    // logo
    selectImage() {
      this.$refs.Avatar.click()
    },
    handleFileUpload() {
      const input = this.$refs.Avatar
      const file = input.files[0]
      if (!file) return
      const reader = new FileReader()

      reader.onload = (e) => {
        this.preview_url_logo = e.target.result
      }
      reader.readAsDataURL(file)
      this.form.logo = file

      this.isValidFile(file)
    },
    // end of logo
    // stamp
    selectStamp() {
      this.$refs.Stamp.click()
    },
    handleStampUpload() {
      const input = this.$refs.Stamp
      const file = input.files[0]
      if (!file) return
      const reader = new FileReader()

      reader.onload = (e) => {
        this.preview_url_stamp = e.target.result
      }
      reader.readAsDataURL(file)
      this.form.stamp = file

      this.isValidFile(file)
    },
    // end of stamp

    isValidFile(file) {
      const imageFormats = ['image/png', 'image/jpeg', 'image/jpg']

      const inValidType = !imageFormats.includes(file.type)

      if (inValidType) {
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: 'Please upload a valid image',
          timer: 1500,
          color: '#716add',
          backdrop: '#7a7d7f',
        })
        return false
      }

      const size = file.size / 1000
      if (imageFormats.includes(file.type) && size > 2240) {
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: 'Image size must not exceed 5MB',
          color: '#716add',
          backdrop: '#7a7d7f',
        })

        return false
      }

      return true
    },

    // ------create --------//
    async onSubmit() {
      this.form.busy = true

      try {
        await this.$apollo
          .mutate({
            mutation: UPDATE_SETTING_ADMIN_MUTATION,
            variables: {
              workspaceId: parseInt(this.mainWorkspace.id),
              logo: this.form.logo,
              stamp: this.form.stamp,
              paystack_secret_key: this.form.paystack_secret_key,
            },
            update: (store, { data: { updateAdminSettings } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: ADMIN_WORKSPACE_QUERIES,
                variables: {
                  workspaceId: parseInt(this.mainWorkspace.id),
                  status: 1,
                },
              })
              // console.log(this.form.class);

              data.adminWorkspace = updateAdminSettings

              store.writeQuery({
                query: ADMIN_WORKSPACE_QUERIES,
                variables: {
                  workspaceId: parseInt(this.mainWorkspace.id),
                  status: 1,
                },
                data,
              })
            },
          })
          .then(() => {
            this.form.name = null
            Swal.fire({
              timer: 1000,
              text: 'settings saved successfully',
              position: 'top-right',
              color: '#fff',
              background: '#4bb543',
              toast: false,
              showConfirmButton: false,
              backdrop: false,
            })
          })

        this.form.busy = false
      } catch ({ graphQLErrors: errors }) {
        this.form.busy = false
        if (errors && errors.length > 0) {
          const validationErrors = errors.filter(
            (err) => err.extensions.category === 'validation'
          )
          validationErrors.forEach((err) => {
            this.form.errors.set(err.extensions.validation)
          })
        }
      }
    },
  },
}
</script>

<style lang="scss">
.settings {
  background-color: #fff;

  .profile-avatar {
    position: relative;
    text-align: center;
    width: 10rem;
    height: 10rem;

    .photo-preview {
      width: 100px;
      height: 100px;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 50%;
    }

    .file-upload {
      position: absolute;
      display: block;
      cursor: pointer;
      bottom: 0;
      right: -5px;
      padding: 4px;
      background: white;
      border-radius: 50%;

      .btn {
        background-color: white;
        border: 1px solid $gray-200;
      }
    }

    .file-upload__input {
      display: none;
    }
    .img-round {
      border-radius: 50%;
    }
  }
  .paymnet-method {
    display: flex;

    & .paymnet-input-field {
      margin-top: 4rem;
      margin-left: 4rem;
    }
  }
}
</style>

<template>
  <div class="p-4">
    <div class="settings">
      <h3 class="text-center py-4">Admin Settings</h3>

      <section class="p-4">
        <h3>Media</h3>

        <b-form
          v-if="show"
          method="POST"
          @submit.prevent="onSubmit"
          @keydown="form.onKeydown($event)"
          @reset.prevent="onReset"
        >
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

                {{form.logo}}
                {{form.stamp}}
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
        </b-form>
      </section>

      <section class="p-4">
        <h3>Online Payment</h3>
        <div class="paymnet-method">
          <div class="paymnet-card">
            <img
              src="@/assets/svg/paystack.svg"
              alt="online-payment"
              width="200"
            />
          </div>
          <div class="paymnet-input-field">
            <b-form-input
              id="paystack_secret_key"
              v-model="form.paystack_secret_key"
              type="text"
              placeholder="Enter your paystack secret key"
              name="paystack_secret_key"
              trim
              disabled
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
export default {
  middleware: 'auth',
  data() {
    return {
      preview_url_logo: null,
      preview_url_stamp: null,
      form: new this.$form({
        logo: null,
        stamp: null,
        paystack_seccet_key: null,
      }),
      show: true,
    }
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

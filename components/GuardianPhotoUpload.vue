<template>
  <div>
    <b-modal
      size="lg"
      centered
      :value="value"
      :visible="value"
      hide-footer
      title="Upload Photo"
      :hide-backdrop="false"
      @change="$emit('input', $event)"
    >
      <b-form
        method="POST"
        @submit.prevent="onSubmit"
        @keydown="form.onKeydown($event)"
      >
        <div class="d-flex flex-column align-items-center mb-4 edit-lead-modal">
          <div class="profile-avatar mb-2">
            <div v-if="preview_url == null" class="photo-preview">
              <img
                v-if="image == null"
                src="@/assets/svg/graduate-student.svg"
                alt=""
                style="border-radius: 50%"
              />

              <img
                v-else
                :src="`${$config.APIRoot}/storage/${mainWorkspace.id}/guardians/${image}`"
                alt="accountant"
                width="100"
                style="border-radius: 50%"
              />
            </div>
            <div
              v-else
              class="photo-preview"
              :style="{
                backgroundImage: `url(${preview_url})`,
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
              Upload photo
            </b-button>
          </div>

          <b-col md="12" class="text-center p-3 mt-4 mb-2"
            ><b-button
              type="submit"
              pill
              variant="primary"
              class="mr-4"
              size="md"
            >
              <b-spinner
                v-if="form.busy"
                variant="light"
                small
                class="mr-1 mb-1"
              />Upload</b-button
            >
            <b-button
              pill
              class="ml-4"
              style="font-size: 14px"
              size="md"
              type="reset"
              variant="danger"
              >Reset</b-button
            ></b-col
          >
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { USER_GUARDIAN_QUERY } from '~/graphql/guardians/queries'
import { UPLOAD_PHOTO_MUTATION } from '~/graphql/guardians/mutations'
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      image: null,
      preview_url: null,
      form: new this.$form({
        photo: null,
      }),
    }
  },

  created() {
    this.form.id = parseInt(this.$auth.user.id),
    this.image = this.user.photo
  },

  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  apollo: {
    user: {
      query: USER_GUARDIAN_QUERY,
      variables() {
        return {
          id: parseInt(this.$auth.user.id),
        }
      },
    },
  },

  methods: {
    selectImage() {
      this.$refs.Avatar.click()
    },
    handleFileUpload() {
      const input = this.$refs.Avatar
      const file = input.files[0]
      if (!file) return
      const reader = new FileReader()

      reader.onload = (e) => {
        this.preview_url = e.target.result
      }
      reader.readAsDataURL(file)
      this.form.photo = file

      this.isValidFile(file)
    },

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

    async onSubmit() {
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: UPLOAD_PHOTO_MUTATION,
            variables: {
              id: parseInt(this.form.id),
              photo: this.form.photo,
              workspaceId: parseInt(this.mainWorkspace.id),
            },
            update: (store, { data: { uploadPhoto } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: USER_GUARDIAN_QUERY,
                variables: { id: parseInt(this.$auth.user.id) },
              })

              data.user = uploadPhoto

              // // Mutate cache result

              store.writeQuery({
                query: USER_GUARDIAN_QUERY,
                variables: { id: parseInt(this.$auth.user.id) },
                data,
              })
            },
          })
          .then(() => {
            Swal.fire({
              timer: 1500,
              text: 'Your work has been successfully edited ',
              position: 'top-right',
              color: '#fff',
              background: '#4bb543',
              toast: false,
              backdrop: false,
              showConfirmButton: false,
            })
            this.form.busy = false
            this.$emit('input', false)
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

    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form = ''
      // this.form.photo = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/scss/variables';

.edit-lead-modal {
  .profile-avatar {
    position: relative;
    text-align: center;
    width: 100px;
    height: 100px;

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
}
</style>

<template>
  <div class="student">
    <template v-if="!events">
     
      <div style="background-color: #f1f9ae; width: 100%; height: 100vh">
        <div class="grow">
          <b-spinner
            style="width: 30rem; height: 30rem"
            type="grow"
            variant="danger"
          ></b-spinner>
        </div></div
    ></template>
    <template v-else>
      <div class="p-4 student__wrapper">
        <b-form
          v-if="show"
          method="POST"
          @submit.prevent="onSubmit"
          @keydown="form.onKeydown($event)"
          @reset.prevent="onReset"
        >
          <div class="d-flex flex-column align-items-center mb-4">
            <div class="profile-avatar mb-2">
              <div class="photo-preview" v-if="preview_url == null">
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

                <!-- <b-form-invalid-feedback :state="!form.errors.has('photo')">
                  {{ form.errors.get('photo') }}
                </b-form-invalid-feedback> -->
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
          </div>

          <!--  -->

          <b-row class="p-4">
            <b-col md="10" class="p-4">
              <b-form-group label="School Notice">
                <b-form-textarea
                  id="textarea"
                  v-model="form.description"
                  placeholder="Enter something..."
                  rows="20"
                  
                  size="lg"
                  required
                ></b-form-textarea>
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group label="Date">
                <b-form-datepicker
                  id="datepicker-buttons"
                  v-model="form.date"
                  today-button
                  reset-button
                  close-button
                  locale="en"
                  size="lg"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col>

            <b-col md="12" class="p-4">
              <b-button
                type="submit"
                pill
                variant="primary"
                class="mr-4"
                size="lg"
              >
                <b-spinner
                  v-if="form.busy"
                  variant="light"
                  small
                  class="mr-1 mb-1"
                />Register</b-button
              >
              <b-button
                pill
                class="ml-4"
                style="font-size: 1.4rem"
                size="lg"
                type="reset"
                variant="danger"
                >Reset</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </div>
    </template>
  </div>
</template>

<script>
import { UPDATE_EVENT_MUTATION } from '~/graphql/events/mutations'
import { EVENT_QUERIES, EVENT_QUERY } from '~/graphql/events/queries'

export default {
  middleware: 'auth',
  props: {
    slug: String,
  },
  data() {
    return {
      form: new this.$form({
        description: '',
        date: null,
        busy: false,
      }),
      preview_url: null,
      show: true,
    }
  },
  apollo: {
    events: {
      query: EVENT_QUERIES,
    },
    event: {
      query: EVENT_QUERY,
      variables() {
        return {
          id: parseInt(this.slug),
        }
      },
      result({ data, loading }) {
        if (!loading) {
          const event = data.event
          this.form.keys().forEach((key) => {
            if (event[key]) {
              //  if (key === 'image') {
              //   return true
              // }
              this.form[key] = event[key]
            }
          })
          this.form.id = parseInt(data.event.id)
          this.form.description = data.event.description
          this.form.date = data.event.date
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
      if (file) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.preview_url = e.target.result
        }
        reader.readAsDataURL(file)
        this.form.image = file
      }
    },

    // update
    async onSubmit() {
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: UPDATE_EVENT_MUTATION,
            variables: {
              id: parseInt(this.form.id),
              description: this.form.description,
              date: this.form.date,
            },
          })
          .then(({ data }) => {
            this.$router.push('/')
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

<style lang="scss" scoped>
.student {
  font-size: 1.4rem;
  padding: 2rem;
  .form-control,
  .mb-3 {
    background-color: var(--color-input);
    height: 4rem;
    font-size: 1.4rem;
  }
  .grow {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
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

  .student__wrapper {
    background-color: var(--color-white);
    border-radius: 0.5rem;
    border: none;
  }
}
</style>
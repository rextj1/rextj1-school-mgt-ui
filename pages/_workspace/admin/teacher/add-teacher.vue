<template>
  <div class="student">
    <template v-if="nowLoading"><Preload /></template>
    <template v-else>
      <b-button
        :to="{
          name: 'workspace-admin-teacher',
          params: { workspace: mainWorkspace.slug },
        }"
        variant="primary"
        size="lg"
        class="add-student mb-4"
      >
        <b-icon icon="arrow-left" /> Back
      </b-button>
      <div class="p-4 student__wrapper">
        <h2 class="d-flex justify-content-center mb-4 mt-4">
          Register Teacher
        </h2>
        <hr />
        <b-form
          v-if="show"
          method="POST"
          @submit.prevent="onSubmit"
          @keydown="form.onKeydown($event)"
          @reset.prevent="onReset"
        >
          <div class="d-flex flex-column align-items-center mb-4">
            <div class="profile-avatar mb-2">
              <div v-if="preview_url == null" class="photo-preview">
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
                <b-form-invalid-feedback
                  :state="!form.errors.has('teacherTable.photo')"
                >
                  {{ form.errors.get('teacherTable.photo') }}
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
                Upload photo
              </b-button>
            </div>
          </div>

          <!--  -->

          <b-row class="p-4">
            <b-col md="4" class="p-4">
              <b-form-group label="First Name">
                <b-form-input
                  id="firstName"
                  v-model="form.teacherTable.first_name"
                  debounce="500"
                  name="first_name"
                  size="lg"
                  placeholder="Enter First name"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('teacherTable.first_name')"
                >
                  {{ form.errors.get('teacherTable.first_name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group id="last_name" label="Last Name">
                <b-form-input
                  id="first_name"
                  v-model="form.teacherTable.last_name"
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('teacherTable.last_name')"
                >
                  {{ form.errors.get('teacherTable.last_name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group id="input-group-1" label="Middle Name (optional)">
                <b-form-input
                  id="input-1"
                  v-model="form.teacherTable.middle_name"
                  type="text"
                  placeholder="Enter middle name"
                  name="last_name"
                  trim
                ></b-form-input>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="Email:">
                <b-form-input
                  id="input-1"
                  v-model="form.userTable.email"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('userTable.email')"
                >
                  {{ form.errors.get('userTable.email') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="Phone no:">
                <b-form-input
                  id="phone"
                  v-model="form.teacherTable.phone"
                  type="number"
                  placeholder="Enter phone no."
                  name="phone"
                  min="1234567899"
                  max="12345678919"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('teacherTable.phone')"
                >
                  {{ form.errors.get('teacherTable.phone') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group label="Qualification">
                <b-form-input
                  id="qualification"
                  v-model="form.teacherTable.qualification"
                  type="text"
                  placeholder="Enter qualification"
                  name="qualification"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('teacherTable.qualification')"
                >
                  {{ form.errors.get('teacherTable.qualification') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group label="Religion">
                <b-form-input
                  id="religion"
                  v-model="form.userTable.religion"
                  type="text"
                  placeholder="Enter religion"
                  name="religion"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('userTable.religion')"
                >
                  {{ form.errors.get('userTable.religion') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group label="Gender">
                <b-form-select
                  v-model="form.teacherTable.gender"
                  :options="genders"
                  class="mb-3"
                  size="lg"
                  required
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- Please select gender --</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group label="Date of Birth">
                <b-form-datepicker
                  id="datepicker-buttons"
                  v-model="form.teacherTable.birthday"
                  today-button
                  reset-button
                  close-button
                  locale="en"
                  size="lg"
                  name="birthday"
                  required
                ></b-form-datepicker>
                <b-form-invalid-feedback
                  :state="!form.errors.has('teacherTable.birthday')"
                >
                  {{ form.errors.get('teacherTable.birthday') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group label="Blood Group">
                <b-form-select
                  id="bloodGroups"
                  v-model="form.userTable.bloodGroup"
                  value-field="id"
                  text-field="name"
                  :options="bloodGroups"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- Please select blood Group--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>


            <b-col md="3" class="p-4">
              <b-form-group label="Date of Employment">
                <b-form-datepicker
                  id="datepicker-employment"
                  v-model="form.teacherTable.employment"
                  today-button
                  reset-button
                  close-button
                  locale="en"
                  size="lg"
                  name="employment"
                  required
                ></b-form-datepicker>
                <b-form-invalid-feedback
                  :state="!form.errors.has('teacherTable.employment')"
                >
                  {{ form.errors.get('teacherTable.employment') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group label="Country">
                <b-form-select
                  id="country"
                  v-model="form.userTable.country"
                  value-field="id"
                  text-field="name"
                  :options="countries"
                  class="mb-3"
                  size="lg"
                  required
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- Please select country --</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <div v-if="!country">
                <b-form-group label="State">
                  <b-form-select class="mb-3">
                    <b-form-select-option value="null"> </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </div>

              <div v-else>
                <b-form-group label="State">
                  <b-form-select v-model="form.userTable.state" class="mb-3" required>
                    <b-form-select-option
                      v-for="k in country.state"
                      :key="k.id"
                      :value="k.id"
                      >{{ k.name }}</b-form-select-option
                    >
                  </b-form-select>
                </b-form-group>
              </div>
            </b-col>

             <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="City">
                <b-form-input
                  id="city"
                  v-model="form.userTable.city"
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  required
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('userTable.city')"
                >
                  {{ form.errors.get('userTable.city') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

         

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="L.G.A">
                <b-form-input
                  id="lga"
                  v-model="form.userTable.lga"
                  type="text"
                  placeholder="Enter L.G.A"
                  name="lga"
                  required
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('userTable.lga')"
                >
                  {{ form.errors.get('userTable.lga') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="12" class="d-flex justify-content-center p-4 mt-2 mb-4"
              ><b-button
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
              ></b-col
            >
          </b-row>
        </b-form>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import {
  BLOOD_GROUP_QUERIES,
  COUNTRY_QUERIES,
  COUNTRY_QUERY,
  STATE_QUERY,
} from '~/graphql/users/queries'
import { CREATE_TEACHER_MUTATION } from '~/graphql/teachers/mutations'

export default {
  middleware: 'auth',
  data() {
    return {
      countries: [],
      bloodGroups: [],
      k: null,
      form: new this.$form({
        userTable: {
          country: null,
          state: null,
          city: null,
          lga: null,
          email: null,
          bloodGroup: null,
          religion: null,
        },
        teacherTable: {
          first_name: '',
          last_name: '',
          middle_name: null,
          gender: null,
          birthday: null,
          employment: null,
          phone: null,
          photo: null,
          qualification: null,
        },
        busy: false,
      }),

      preview_url: null,
      genders: ['Male', 'Female'],
      show: true,
    }
  },

  apollo: {
    countries: {
      query: COUNTRY_QUERIES,
    },
    bloodGroups: {
      query: BLOOD_GROUP_QUERIES,
    },
    country: {
      query: COUNTRY_QUERY,
      variables() {
        return { id: this.form.userTable.country }
      },
    },
    state: {
      query: STATE_QUERY,
      variables() {
        return { id: this.form.userTable.state }
      },
    },
  },
  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
    nowLoading() {
      return (
        this.$apollo.queries.countries.loading &&
        this.$apollo.queries.bloodGroups.loading &&
        this.$apollo.queries.state.loading &&
        this.$apollo.queries.country.loading
      )
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
      this.form.teacherTable.photo = file

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
          .mutate(
            {
              mutation: CREATE_TEACHER_MUTATION,
              variables: {
                workspaceId: parseInt(this.mainWorkspace.id),
                userTable: this.form.userTable,
                teacherTable: this.form.teacherTable,
              },
            },
            {
              context: {
                hasUpload: true,
              },
            }
          )
          .then(() => {
            Swal.fire({
              timer: 1500,
              text: 'teacher added successfully',
              position: 'top-right',
              color: '#fff',
              background: '#4bb543',
              toast: false,
              backdrop: false,
              showConfirmButton: false,
            })
            this.form.busy = false
            this.$router.push({
              name: 'workspace-admin-teacher',
              params: { workspaceId: parseInt(this.mainWorkspace.id) },
            })
          })
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

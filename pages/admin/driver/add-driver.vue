<template>
  <div class="student">
    <template v-if="!countries && !bloodGroups">
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
      <b-button
        to="/admin/driver"
        variant="primary"
        size="lg"
        class="add-student mb-4"
      >
        <b-icon icon="arrow-left" /> Back
      </b-button>
      <div class="p-4 student__wrapper">
        <h2 class="d-flex justify-content-center mb-4 mt-4">Register Driver</h2>
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

                <b-form-invalid-feedback :state="!form.errors.has('photo')">
                  {{ form.errors.get('photo') }}
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
              <b-form-group id="input-group-1" label="First Name:">
                <b-form-input
                  id="first_name"
                  v-model="form.first_name"
                  type="text"
                  placeholder="Enter first name"
                  name="first_name"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('first_name')"
                >
                  {{ form.errors.get('first_name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group id="input-group-1" label="Last Name">
                <b-form-input
                  id="last_name"
                  v-model="form.last_name"
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="!form.errors.has('last_name')">
                  {{ form.errors.get('last_name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group id="input-group-1" label="Route">
                <b-form-input
                  id="route"
                  v-model="form.route"
                  type="text"
                  placeholder="Enter middle name"
                  name="route"
                ></b-form-input>
                <b-form-invalid-feedback :state="!form.errors.has('route')">
                  {{ form.errors.get('route') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="Driver License">
                <b-form-input
                  id="driver_license"
                  v-model="form.driver_license"
                  type="text"
                  placeholder="Enter license no."
                  name="driver_license"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('driver_license')"
                >
                  {{ form.errors.get('driver_license') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="Vehicle no.">
                <b-form-input
                  id="vehicle_number"
                  v-model="form.vehicle_number"
                  type="text"
                  placeholder="Enter vehicle no."
                  name="vehicle_number"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('vehicle_number')"
                >
                  {{ form.errors.get('vehicle_number') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="Phone no">
                <b-form-input
                  id="phone"
                  v-model="form.phone"
                  type="number"
                  placeholder="Enter phone no."
                  name="phone"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="!form.errors.has('phone')">
                  {{ form.errors.get('phone') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group label="Religion">
                <b-form-input
                  id="religion"
                  v-model="form.religion"
                  type="text"
                  placeholder="Enter religion"
                  name="religion"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="!form.errors.has('religion')">
                  {{ form.errors.get('religion') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group label="Gender">
                <b-form-select
                  id="gender"
                  v-model="form.gender"
                  :options="genders"
                  class="mb-3"
                  value-field="name"
                  text-field="title"
                  required
                  size="lg"
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
              <b-form-group label="Date of birth">
                <b-form-datepicker
                  id="datepicker-buttons"
                  v-model="form.birthday"
                  today-button
                  reset-button
                  close-button
                  locale="en"
                  size="lg"
                  name="birthday"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group label="Blood Group">
                <b-form-select
                  id="bloodGroups"
                  value-field="id"
                  text-field="name"
                  v-model="form.bloodGroup"
                  :options="bloodGroups"
                  required
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
              <b-form-group label="Country">
                <b-form-select
                  id="country"
                  value-field="id"
                  text-field="name"
                  v-model="form.country"
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
                  <b-form-select v-model="form.state" required class="mb-3">
                    <b-form-select-option
                      v-for="k in country.state"
                      :value="k.id"
                      :key="k.id"
                      >{{ k.name }}</b-form-select-option
                    >
                  </b-form-select>
                </b-form-group>
              </div>
            </b-col>

            <b-col md="3" class="p-4">
              <div v-if="!state">
                <b-form-group label="City">
                  <b-form-select class="mb-3">
                    <b-form-select-option value="null"> </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </div>

              <div v-else>
                <b-form-group label="City">
                  <b-form-select v-model="form.city" required class="mb-3">
                    <b-form-select-option
                      v-for="k in state.cities"
                      :value="k.id"
                      :key="k.id"
                      >{{ k.name }}</b-form-select-option
                    >
                  </b-form-select>
                </b-form-group>
              </div>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="L.G.A">
                <b-form-input
                  id="lga"
                  v-model="form.lga"
                  type="text"
                  placeholder="Enter L.G.A"
                  name="lga"
                ></b-form-input>
                <b-form-invalid-feedback :state="!form.errors.has('lga')">
                  {{ form.errors.get('lga') }}
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
import {
  BLOOD_GROUP_QUERIES,
  COUNTRY_QUERIES,
  COUNTRY_QUERY,
  STATE_QUERY,
} from '~/graphql/users/queries'
import { CREATE_DRIVER_MUTATION } from '~/graphql/drivers/mutations'
import Swal from 'sweetalert2'

export default {
  middleware: 'auth',
  data() {
    return {
      form: new this.$form({
        first_name: '',
        last_name: '',
        route: null,
        country: null,
        phone: null,
        state: null,
        city: null,
        lga: null,
        photo: null,
        religion: null,
        bloodGroup: null,
        vehicle_number: null,
        driver_license: null,
        gender: null,
        birthday: null,
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
        return { id: parseInt(this.form.country) }
      },
    },
    state: {
      query: STATE_QUERY,
      variables() {
        return { id: parseInt(this.form.state) }
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

      // this.$emit('input', file[0])
      this.isValidFile(file)
    },

    isValidFile(file) {
      const imageFormats = ['image/png', 'image/jpeg', 'jpg']

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
              mutation: CREATE_DRIVER_MUTATION,
              variables: {
                first_name: this.form.first_name,
                last_name: this.form.last_name,
                route: this.form.route,
                phone: this.form.phone,
                birthday: this.form.birthday,
                lga: this.form.lga,
                vehicle_number: this.form.vehicle_number,
                driver_license: this.form.driver_license,
                gender: this.form.gender,
                religion: this.form.religion,
                state_id: parseInt(this.form.state),
                city_id: parseInt(this.form.city),
                country_id: parseInt(this.form.country),
                blood_group_id: parseInt(this.form.bloodGroup),
                photo: this.form.photo,
              },
            },
            {
              context: {
                hasUpload: true,
              },
            }
          )
          .then(({ data }) => {
            Swal.fire({
              title: 'Done...',
              icon: 'success',
              timer: 1500,
              text: 'Your work has been saved',
              position: 'center',
              color: '#fff',
              background: '#4bb543',
              toast: false,    
              backdrop: false,
              showConfirmButton: false,
            })
            this.form.busy = false
            this.$router.push('/admin/driver')
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
  font-size: 1.6rem;
  padding: 2rem;
  .form-control,
  .mb-3 {
    background-color: var(--color-input);
    height: 4.3rem;
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
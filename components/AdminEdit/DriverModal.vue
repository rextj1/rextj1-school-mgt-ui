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
              <div v-if="preview_url == null" class="photo-preview">
                <img
                  :src="`http://sms.test/storage/driver/${form.photo}`"
                  alt=""
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

            <b-col md="4" class="p-4">
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

            <b-col md="4" class="p-4">
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

            <!-- <b-col md="4" class="p-4">
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
                > -->
                  <!-- This slot appears above the options from 'options' prop -->
                  <!-- <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- Please select blood Group--</b-form-select-option
                    >
                  </template> -->

                  <!-- These options will appear after the ones from 'options' prop -->
                <!-- </b-form-select>
              </b-form-group>
            </b-col> -->

            <b-col md="3" class="p-4">
              <b-form-group label="Country">
                <b-form-select
                  id="country"
                  v-model="form.country"
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
                  <b-form-select v-model="form.state" required class="mb-3">
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
                      :key="k.id"
                      :value="k.id"
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
import { UPDATE_DRIVER_MUTATION } from '~/graphql/drivers/mutations'
import { DRIVER_QUERIES, DRIVER_QUERY } from '~/graphql/drivers/queries'

export default {
  middleware: 'auth',
  props: {
    slug: Array,
  },
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
        image: null,
        photo: null,
        religion: null,
        // bloodGroup: null,
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
    drivers: {
      query: DRIVER_QUERIES,
    },

    driver: {
      query: DRIVER_QUERY,
      variables() {
        return {
          slug: this.slug[0],
        }
      },
      result({ data, loading }) {
        if (!loading) {
          const driver = data.driver
          this.form.keys().forEach((key) => {
            if (driver[key]) {
              //  if (key === 'image') {
              //   return true
              // }
              this.form[key] = driver[key]
            }
          })
          this.form.id = parseInt(data.driver.id)
          this.form.country = parseInt(data.driver.country.id)
          this.form.state = parseInt(data.driver.state.id)
          this.form.city = parseInt(data.driver.city.id)
          this.form.religion = parseInt(data.driver.religion)
          // this.form.bloodGroup = parseInt(data.driver.blood_group.id)
          this.form.lga = data.driver.lga
          this.form.religion = data.driver.religion
          this.form.email = data.driver.email
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
      this.form.image = file
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

    // update
    async onSubmit() {
      const updateId = this.form.id
      const updatedSlug = this.slug[0]
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: UPDATE_DRIVER_MUTATION,
            variables: {
              id: parseInt(this.form.id),
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
              // blood_group_id: parseInt(this.form.bloodGroup),
              photo: this.form.image,
            },
            update: (store, { data: { updateDriver } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: DRIVER_QUERIES,
              })

              data.drives = updateDriver

              // Mutate cache result
             
              console.log(updateDriver)
              store.writeQuery({
                query: DRIVER_QUERIES,
                data,
              })
            },
          })
          .then(({ data }) => {
            this.$bvModal.hide(this.slug[1])
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
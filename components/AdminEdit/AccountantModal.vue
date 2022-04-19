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
            <b-col md="4" class="p-4">
              <b-form-group id="input-group-1" label="First Name:">
                <b-form-input
                  id="input-1"
                  v-model="form.first_name"
                  type="text"
                  placeholder="Enter first name"
                  required
                  trim
                ></b-form-input>
                <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group id="input-group-1" label="Last Name">
                <b-form-input
                  id="input-1"
                  v-model="form.last_name"
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  required
                  trim
                ></b-form-input>
                <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group id="input-group-1" label="middle Name (optional)">
                <b-form-input
                  id="input-1"
                  v-model="form.middle_name"
                  type="text"
                  placeholder="Enter middle name"
                  name="last_name"
                  trim
                ></b-form-input>
                <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="Email:">
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  required
                  trim
                ></b-form-input>
                <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="Phone no:">
                <b-form-input
                  id="input-1"
                  v-model="form.phone"
                  type="number"
                  placeholder="Enter phone no."
                  required
                  trim
                ></b-form-input>
                <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="Qualification">
                <b-form-input
                  id="input-1"
                  v-model="form.qualification"
                  type="text"
                  placeholder="Enter qualification"
                  name="phone"
                  required
                  trim
                ></b-form-input>
                <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group id="input-group-1" label="Religion">
                <b-form-input
                  id="input-1"
                  v-model="form.religion"
                  type="text"
                  placeholder="Enter religion"
                  name="religion"
                  required
                  trim
                ></b-form-input>
                <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
              </b-form-group>
            </b-col>

            <b-col md="3" class="p-4">
              <b-form-group label="Gender">
                <b-form-select
                  v-model="form.gender"
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

            <!-- <b-col md="3" class="p-4">
              <b-form-group label="Date of birth">
                <b-form-datepicker
                  id="datepicker-buttons"
                  v-model="form.birthday"
                  today-button
                  reset-button
                  close-button
                  locale="en"
                  size="lg"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col> -->

            <b-col md="3" class="p-4">
              <b-form-group label="Blood Group">
                <b-form-select
                  id="bloodGroups"
                  value-field="id"
                  text-field="name"
                  v-model="form.bloodGroup"
                  :options="bloodGroups"
                  class="mb-3"
                  size="lg"
                  required
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
              <b-form-group id="input-group-1" label="Facebook link (optional)">
                <b-form-input
                  id="input-1"
                  v-model="form.facebook"
                  type="text"
                  placeholder="Enter facebook..."
                  name="facebook"
                  trim
                ></b-form-input>
                <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
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
                    <b-form-select-option> </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </div>

              <div v-else>
                <b-form-group label="State">
                  <b-form-select v-model="form.state" class="mb-3">
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
                    <b-form-select-option> </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </div>

              <div v-else>
                <b-form-group label="City">
                  <b-form-select v-model="form.city" class="mb-3">
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
                  id="input-1"
                  v-model="form.lga"
                  type="text"
                  placeholder="Enter L.G.A"
                  name="lga"
                  required
                  trim
                ></b-form-input>
                <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
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
import { UPDATE_ACCOUNTANT_MUTATION } from '~/graphql/accountants/mutations'
import { ACCOUNTANT_QUERY } from '~/graphql/accountants/queries'

export default {
  middleware: 'auth',
  props: {
    slug: String,
  },
  data() {
    return {
      form: new this.$form({
        // id: 1,
        // slug: 'buwa',
        first_name: '',
        last_name: '',
        middle_name: null,
        email: null,
        country: null,
        phone: null,
        state: null,
        city: null,
        lga: null,
        // photo: null,
        religion: null,
        bloodGroup: null,
        facebook: null,
        qualification: null,
        gender: null,
        // birthday: null,
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
        return { id: this.form.country }
      },
    },
    state: {
      query: STATE_QUERY,
      variables() {
        return { id: this.form.state }
      },
    },

    accountant: {
      query: ACCOUNTANT_QUERY,
      variables() {
        return {
          slug: this.slug,
        }
      },
      result({ data, loading }) {
        if (!loading) {
          const accountant = data.accountant
          this.form.keys().forEach((key) => {
            if (accountant[key]) {
              //  if (key === 'image') {
              //   return true
              // }
              this.form[key] = accountant[key]

              // this.form.category_id = parseInt(data.book.category.id)
            }
          })
          this.form.id = parseInt(data.accountant.id)
          this.form.country = parseInt(data.accountant.user.country.id)
          this.form.state = parseInt(data.accountant.user.state.id)
          this.form.city = parseInt(data.accountant.user.city.id)
          this.form.religion = parseInt(data.accountant.user.religion)
          this.form.bloodGroup = parseInt(data.accountant.user.blood_group.id)
          this.form.lga = data.accountant.user.lga
          this.form.religion = data.accountant.user.religion
          this.form.email = data.accountant.user.email
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
            mutation: UPDATE_ACCOUNTANT_MUTATION,
            variables: {
              id: parseInt(this.form.id),
              // choices: this.form.data()
              first_name: this.form.first_name,
              last_name: this.form.last_name,
              middle_name: this.form.middle_name,
              email: this.form.email,
              country: parseInt(this.form.country),
              phone: this.form.phone,
              state: parseInt(this.form.state),
              city: parseInt(this.form.city),
              lga: this.form.lga,
              // photo: this.form.photo,
              religion: this.form.religion,
              blood_group: parseInt(this.form.bloodGroup),
              facebook: this.form.facebook,
              qualification: this.form.qualification,
              gender: this.form.gender,
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
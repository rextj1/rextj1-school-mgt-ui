<template>
  <div class="student">
    <div class="p-4 student__wrapper">
      <h2 class="d-flex justify-content-center mb-4 mt-4">
       Register Student
      </h2>
      <hr />
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
          <p class="small mb-2">Recommended size: Less than 2MB (150 x 150)</p>
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
              debounce="500"
              id="firstName"
              v-model="form.firstName"
              name="firstName"
              size="lg"
              placeholder="Enter First name"
              required
              trim
            ></b-form-input>
            <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>
        <b-col md="4" class="p-4">
          <b-form-group label="Last Name">
            <b-form-input
              debounce="500"
              id="lastName"
              v-model="form.lastName"
              name="lastName"
              size="lg"
              placeholder="Enter Last name"
              required
              trim
            ></b-form-input>
            <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>

        <b-col md="4" class="p-4">
          <b-form-group label="Middle Name (optional)">
            <b-form-input
              debounce="500"
              id="middleName"
              v-model="form.middleName"
              name="middleName"
              size="lg"
              placeholder="Enter Middle name"
              required
              trim
            ></b-form-input>
            <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>

        <b-col md="3" class="p-4">
          <b-form-group label="Email">
            <b-form-input
              debounce="500"
              id="email"
              v-model="form.middleName"
              name="email"
              size="lg"
              type="email"
              placeholder="Enter email"
              required
              trim
            ></b-form-input>
            <!-- <b-form-invalid-feedback :state="!form.errors.has('firstName')">
              {{ form.errors.get('firstName') }}
                </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>
        <b-col md="3" class="p-4">
          <b-form-group label="Phone No.">
            <b-form-input
              id="code"
              v-model="form.phone"
              name="phone"
              placeholder="Enter phone no."
              trim
              type="number"
              required
              size="lg"
            ></b-form-input>
            <!-- <b-form-invalid-feedback :state="!form.errors.has('lastName')">
              {{ form.errors.get('lastName') }}
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>

        <b-col md="3" class="p-4">
          <b-form-group label="Parent Phone No.">
            <b-form-input
              id="code"
              v-model="form.parentPhone"
              name="phone"
              placeholder="Enter parent phone no."
              trim
              type="number"
              required
              size="lg"
            ></b-form-input>
            <!-- <b-form-invalid-feedback :state="!form.errors.has('lastName')">
              {{ form.errors.get('lastName') }}
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
              required
            ></b-form-datepicker>
          </b-form-group>
        </b-col>

        <b-col md="3" class="p-4">
          <b-form-group label="Country">
            <b-form-select
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
          <b-form-group label="State">
            <b-form-select
              v-model="form.state"
              :options="states"
              class="mb-3"
              size="lg"
              required
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select state --</b-form-select-option
                >
              </template>

              <!-- These options will appear after the ones from 'options' prop -->
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="3" class="p-4">
          <b-form-group label="L.G.A">
            <b-form-select
              v-model="form.lga"
              :options="lgas"
              class="mb-3"
              size="lg"
              required
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select L.G.A --</b-form-select-option
                >
              </template>

              <!-- These options will appear after the ones from 'options' prop -->
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="3" class="p-4">
          <b-form-group label="Blood Group">
            <b-form-select
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
          <b-form-group label="Class">
            <b-form-select
              v-model="form.class"
              :options="classes"
              class="mb-3"
              size="lg"
              required
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select student class --</b-form-select-option
                >
              </template>

              <!-- These options will appear after the ones from 'options' prop -->
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="3" class="p-4">
          <b-form-group label="Section">
            <b-form-select
              v-model="form.section"
              :options="sections"
              class="mb-3"
              size="lg"
              required
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select section --</b-form-select-option
                >
              </template>

              <!-- These options will appear after the ones from 'options' prop -->
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="3" class="p-4">
          <b-form-group label="Parent Name">
            <b-form-input
              debounce="500"
              id="address"
              v-model="form.parentName"
              name="parentName"
              size="lg"
              placeholder="Enter parent name"
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
          <b-button pill class="ml-4" style="font-size:1.4rem" size="lg" type="reset" variant="danger"
            >Reset</b-button
          ></b-col
        >
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        image: null,
        fullName: '',
        amount: null,
        date: null,
        state: null,
        lga: null,
        class: null,
        section: null,
        bloodGroup: null,
        phone: '',
        country: null,
        gender: null,
        class: null,
        busy: false,
      },
      preview_url: null,
      genders: ['MAle', 'Female'],
      countries: ['Nigeria', 'Ghana'],
      states: ['Port Harcourt', 'Delta'],
      lgas: ['Obio-Akpor', 'Warri North'],
      bloodGroups: ['A', 'A-', 'B+', 'B-', 'AB', 'O+', 'O-'],
      classes: ['jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3'],
      sections: ['A', 'B', 'C', 'D', 'E', 'F'],
    }
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

        // this.$emit('input', file[0])
      }
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
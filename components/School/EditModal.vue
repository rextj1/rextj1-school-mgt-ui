<template>
  <div class="student">
    <div class="p-4 student__wrapper">
      <template v-if="nowLoading"><Preload /></template>
      <template v-else>
        <b-form
          method="POST"
          @submit.prevent="onSubmit"
          @keydown="form.onKeydown($event)"
          @reset.prevent="onReset"
        >
          <b-row class="p-4">
            <b-col md="4" class="p-4">
              <b-form-group label="School Name">
                <b-form-input
                  id="name"
                  v-model="form.name"
                  debounce="500"
                  name="name"
                  size="lg"
                  placeholder="Enter school name"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="!form.errors.has('name')">
                  {{ form.errors.get('name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group label="slug">
                <b-form-input
                  id="slug"
                  v-model="form.slug"
                  debounce="500"
                  name="name"
                  size="lg"
                  placeholder="Enter slug"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="!form.errors.has('slug')">
                  {{ form.errors.get('slug') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group label="First Name">
                <b-form-input
                  id="first_name"
                  v-model="form.first_name"
                  debounce="500"
                  name="first_name"
                  size="lg"
                  placeholder="Enter first name"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="!form.errors.has('first_name')"
                >
                  {{ form.errors.get('first_name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group label="Last Name">
                <b-form-input
                  id="last_name"
                  v-model="form.last_name"
                  debounce="500"
                  name="last_name"
                  size="lg"
                  placeholder="Enter last name"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="!form.errors.has('last_name')">
                  {{ form.errors.get('last_name') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group label="email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  debounce="500"
                  name="email"
                  type="email"
                  size="lg"
                  placeholder="Enter email"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="!form.errors.has('email')">
                  {{ form.errors.get('email') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

            <b-col md="4" class="p-4">
              <b-form-group label="Phone No.">
                <b-form-input
                  id="phone"
                  v-model="form.phone"
                  debounce="500"
                  name="phone"
                  type="number"
                  size="lg"
                  placeholder="Enter phone number"
                  trim
                  required
                ></b-form-input>
                <b-form-invalid-feedback :state="!form.errors.has('phone')">
                  {{ form.errors.get('phone') }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>

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
                  <b-form-select v-model="form.state" class="mb-3">
                    <b-form-select-option
                      v-for="k in country.state"
                      :key="k.id"
                      :value="k.id"
                      required
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
                  <b-form-select v-model="form.city" class="mb-3">
                    <b-form-select-option
                      v-for="k in state.cities"
                      :key="k.id"
                      :value="k.id"
                      required
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
                  required
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
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import {
  COUNTRY_QUERIES,
  COUNTRY_QUERY,
  STATE_QUERY,
} from '~/graphql/users/queries'
import { UPDATE_SCHOOL_MUTATION } from '~/graphql/workspace/mutations'
import { SCHOOL_QUERY } from '~/graphql/workspace/queries'
export default {
  props: {
    slug: Array,
  },
  data() {
    return {
      form: new this.$form({
        name: '',
        slug: '',
        email: '',
        last_name: '',
        first_name: '',
        phone: null,
        country: null,
        state: null,
        city: null,
        lga: null,
        busy: false,
      }),
    }
  },

  props: {
    slug: {
      type: Array,
      require: true,
    },
  },

  computed: {
    nowLoading() {
      return (
        this.$apollo.queries.countries.loading &&
        this.$apollo.queries.school.loading &&
        this.$apollo.queries.country.loading &&
        this.$apollo.queries.state.loading
      )
    },
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  apollo: {
    countries: {
      query: COUNTRY_QUERIES,
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
    school: {
      query: SCHOOL_QUERY,
      variables() {
        return {
          id: parseInt(this.slug[0]),
        }
      },
      result({ data, loading }) {
        if (!loading) {
          const school = data.school
          // console.log(school);

          this.form.name = school.name
          this.form.slug = school.slug
          this.form.email = school.email
          this.form.last_name = school.user.last_name
          this.form.first_name = school.user.first_name
          this.form.phone = school.user.phone
          this.form.country = school.user.country.id
          this.form.state = school.user.state.id
          this.form.city = school.user.city.id
          this.form.lga = school.user.lga
        }
      },
    },
  },

  methods: {
    onSubmit() {
      this.form.busy = true
      // submit exam

      this.$apollo
        .mutate({
          mutation: UPDATE_SCHOOL_MUTATION,
          variables: {
            id: parseInt(this.slug[0]),
            name: this.form.name,
            slug: this.form.slug,
            email: this.form.email,
            phone: parseInt(this.form.phone),
            last_name: this.form.last_name,
            first_name: this.form.first_name,
            country: parseInt(this.form.country),
            state: parseInt(this.form.state),
            city: parseInt(this.form.city),
            lga: this.form.lga,
          },
          update: (store, { data: { updateSchool } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: SCHOOL_QUERY,
              variables: {
                id: parseInt(schoolId),
              },
            })
            console.log(data.school)
            data.school = updateSchool

            // Mutate cache result

            store.writeQuery({
              query: SCHOOL_QUERY,
              variables: {
                id: parseInt(this.slug[0]),
              },

              data,
            })
          },
        })
        .then(() => {
          Swal.fire({
            title: 'Done...',
            icon: 'success',
            timer: 1500,
            text: 'School updated successfully',
            position: 'center',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            showConfirmButton: false,
          })
          this.form.busy = false
          this.$bvModal.hide(this.slug[1])
        })
        .catch(({ graphQLErrors }) => {
          this.form.busy = false

          Swal.fire({
            icon: 'warning',
            text: `There's error proccessing this page!`,
            position: 'top-right',
            color: '#fff',
            background: '#cc3300',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
        })
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
.grow {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
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

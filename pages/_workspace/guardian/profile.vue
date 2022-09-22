<template>
  <div class="profile p-4">
    <template v-if="$apollo.queries.user.loading"> <Preload /></template>
    <template v-else>
      <b-button
        class="shadow-sm mb-3"
        variant="warning"
        size="lg"
        @click="changePassword"
        >Change Password</b-button
      >
      <!-- {{ user.guardian.students[0] }} -->

      <b-jumbotron header="" class="students shadow" bg-variant="light">
        <h3>
          About
          <b-badge variant="primary"
            >{{ students.last_name }} {{ students.first_name }}</b-badge
          >
        </h3>
        <div class="d-flex justify-content-center mb-4">
          <b-img
            :src="`${$config.APIRoot}/storage/students/${students.photo}`"
            thumbnail
            fluid
            alt="Responsive image"
            width="230"
          ></b-img>
        </div>
        <b-row no-gutters class="sm-query">
          <b-col md="6" class="first-detail p-4">
            <p>Full Name</p>
            <p>Phone no:</p>

            <p>Email</p>
            <p>Address</p>
            <p>Children</p>
          </b-col>
          <b-col md="6" class="first-details p-4">
            <p>
              {{ students.guardian_name }}
            </p>
            <p>{{ students.guardian_no }}</p>

            <p>
              {{ students.guardian_email }}
            </p>
            <p>{{ students.guardian_address }}</p>

            <h3 v-for="student in user.guardian.students" :key="student.id">
              <p>
                <b-badge
                  :id="student.id"
                  style="line-height: 1.6"
                  variant="warning"
                  class="px-2"
                  >{{ student.last_name }} {{ student.first_name }}</b-badge
                >
              </p>
            </h3>
          </b-col>
        </b-row>
      </b-jumbotron>

      <b-modal id="passwordModal" size="sm" centered hide-header hide-footer>
        <div class="p-5">
          <div class="margin-down">
            <!-- description -->
            <b-form
              method="POST"
              @submit.prevent="onSubmit"
              @keydown="form.onKeydown($event)"
              @reset.prevent="onReset"
            >
              <!-- description -->

              <b-form-group label="Old Password">
                <b-form-input
                  v-model="form.oldPassword"
                  placeholder="Enter old Password"
                  type="password"
                  :state="password"
                  required
                  size="lg"
                ></b-form-input>
                <b-form-invalid-feedback :state="password" class="mt-2">
                  {{ validationPassword }}
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Password">
                <b-form-input
                  v-model="form.password"
                  placeholder="Enter Password"
                  type="password"
                  required
                  size="lg"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Confirm Password">
                <b-form-input
                  v-model="confirmPassword"
                  placeholder="Comfirm password"
                  type="password"
                  :state="validation"
                  required
                  size="lg"
                ></b-form-input>
                <b-form-invalid-feedback :state="validation" class="mt-2">
                  Your password must be 6-11 characters long.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                class="mr-4"
                size="lg"
                :disabled="form.busy"
              >
                <b-spinner
                  v-if="form.busy"
                  variant="light"
                  class="mr-1 mb-1"
                  small
                />Add Subject</b-button
              >
            </b-form>
          </div>
        </div>
      </b-modal>
    </template>
  </div>
</template>

<script>
import { USER_GUARDIAN_QUERY } from '@/graphql/guardians/queries'
import { CHANGE_USER_PASSWORD_MUTATION } from '~/graphql/users/mutations'
import Swal from 'sweetalert2'
export default {
  middleware: 'auth',
  data() {
    return {
      confirmPassword: '',
      validationPassword: '',
      form: new this.$form({
        oldPassword: '',
        password: '',
        busy: false,
      }),
    }
  },
  computed: {
    students() {
      return this.user.guardian.students[0]
    },
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
    changePassword() {
      this.$bvModal.show('passwordModal')
    },
    onSubmit() {
      this.form.busy = true
      if (this.password == this.form.confirmPassword) {
        alert('uuu')
        this.$apollo
          .mutate({
            mutation: CHANGE_USER_PASSWORD_MUTATION,
            variables: {
              id: parseInt(this.user.id),
              oldPassword: this.form.oldPassword,
              password: this.form.password,
            },
          })
          .then(({ data }) => {
            if (data.updateUserPassword == true) {
              Swal.fire({
                text: `password changed successfully!`,
                position: 'top-right',
                color: '#fff',
                background: '#5cb85c',
                toast: false,
                backdrop: false,
                timer: 1500,
                showConfirmButton: false,
              })
              this.confirmPassword = ''
              this.form.oldPassword = ''
              this.form.password = ''
              this.validationPassword = ''
              this.form.busy = false
              this.$bvModal.hide('passwordModal')
              return
            }

            this.validationPassword = 'Wrong old password entered.'
            this.form.busy = false
          })
      } else {
        return
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  font-size: 1.6rem;
  padding: 1rem;

  .first-detail p {
    display: block;
    margin-left: 40%;
  }
  .first-details p {
    display: block;
    margin-left: 30%;
    font-weight: bold;
  }
  @include media-breakpoint-down(md) {
    .first-detail p {
      margin-left: 0;
    }
    .first-details p {
      margin-left: 0;
    }
  }
  @include media-breakpoint-down(sm) {
    .col-md-6 {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .first-details p {
      margin-left: 50%;
    }
  }
}
</style>

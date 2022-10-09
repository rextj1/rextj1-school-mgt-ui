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

      <b-card class="students shadow">
        <div class="text-center mb-4">
          <b-img
            src="@/assets/svg/user-avatar.svg"
            thumbnail
            fluid
            alt="Responsive image"
            width="230"
          ></b-img>
        </div>
        <div class="d-flex justify-content-between p-4">
          <div>
            <p>Full Name</p>
            <p>Phone no:</p>

            <p>Email</p>
            <p>Address</p>
            <p>Children</p>
          </div>

          <div style="font-weight: bold">
            <p>
              {{ students.guardian_name }}
            </p>
            <p>{{ students.guardian_no }}</p>

            <p>
              {{ students.guardian_email }}
            </p>
            <p>{{ students.guardian_address }}</p>

            <ol v-for="student in user.guardian.students" :key="student.id">
              <li>
                Name:
                <b-badge variant="primary"
                  >{{ student.last_name }} {{ student.first_name }}</b-badge
                >
                <br />
                Class:
                <b-badge variant="warning">{{ student.klase.name }}</b-badge>
              </li>
            </ol>
          </div>
        </div>
      </b-card>
      <!-- change password modal -->
      <b-modal id="passwordModal" size="sm" centered hide-header hide-footer>
        <div class="p-5">
          <div class="form">
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
                  required
                  size="lg"
                ></b-form-input>

                <span style="color: red">{{ oldPassword }}</span>
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
                  class="validation"
                  v-model="confirmPassword"
                  placeholder="Comfirm password"
                  type="password"
                  required
                  size="lg"
                  @input="changeColor"
                  :style="{ border: isGreen }"
                ></b-form-input>
                <span style="color: red">{{ passwordValidation }}</span>
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
                />Change Password</b-button
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
      isGreen: '',
      passwordValidation: null,
      oldPassword: null,
      confirmPassword: '',
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
    changeColor() {
      if (this.form.password != null) {
        if (this.confirmPassword == this.form.password) {
          this.isGreen = 2 + 'px solid green'
        } else {
          this.isGreen = 2 + 'px solid red'
        }
      }
    },
    onSubmit() {
      this.form.busy = true
      if (this.confirmPassword == this.form.password) {
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
              this.form.busy = false
              this.oldPassword = null

              this.passwordValidation = null
              this.isGreen = ''
              this.$bvModal.hide('passwordModal')
              return
            }

            this.oldPassword = 'Wrong user password entered.'
            if (this.confirmPassword == this.form.password) {
              this.passwordValidation = null
            } else {
              this.passwordValidation = 'Unmatched passwords'
            }
            this.form.busy = false
          })
      } else {
        this.passwordValidation = 'Unmatched passwords'
        this.form.busy = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  font-size: 1.6rem;
  padding: 1rem;

  // .first-detail p {
  //   display: block;
  //   margin-left: 40%;
  // }
  // .first-details p {
  //   display: block;
  //   margin-left: 30%;
  //   font-weight: bold;
  // }
  // @include media-breakpoint-down(md) {
  //   .first-detail p {
  //     margin-left: 0;
  //   }
  //   .first-details p {
  //     margin-left: 0;
  //   }
  // }
  // @include media-breakpoint-down(sm) {
  //   .col-md-6 {
  //     flex: 0 0 50%;
  //     max-width: 50%;
  //   }
  //   .first-details p {
  //     margin-left: 50%;
  //   }
  // }
}
</style>

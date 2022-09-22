<template>
  <div class="accountant-profile p-4">
    <template v-if="$apollo.queries.user.loading"><Preload /></template>
    <template v-else>
      <div>
        <b-button
          class="shadow-sm mb-3"
          variant="warning"
          size="lg"
          @click="changePassword"
          >Change Password</b-button
        >
        <div class="shadow-sm p-4" style="background-color: #fff">
          About <b-badge variant="success" class="mb-4">
             {{ accountant.first_name }} {{ accountant.last_name }}
            {{ accountant.middle_name }}
          </b-badge>
          <div class="d-flex justify-content-center mb-4">
            <div v-if="accountant.photo == 'null'">
              <b-img
                src="~/assets/images/teacher.jpeg"
                thumbnail
                fluid
                alt="Responsive image"
                width="230"
              ></b-img>
            </div>
            <div v-else>
              <b-img
                :src="`${$config.APIRoot}/storage/${mainWorkspace.id}/accountants/${accountant.photo}`"
                thumbnail
                fluid
                alt="Responsive image"
                width="230"
              ></b-img>
            </div>
          </div>
          <b-row no-gutters class="sm-query">
            <b-col md="6" class="first-detail">
              <p>Sex</p>
              <p>Birth Date</p>
              <p>Registration Code:</p>
              <p>Qualification</p>
              <p>Phone No:</p>
              <p>Country</p>
              <p>State</p>
              <p>Blood Group</p>
            </b-col>
            <b-col md="6" class="first-details">
              <p>{{ accountant.gender }}</p>
              <p>{{ accountant.birthday }}</p>

              <p>{{ accountant.code }}</p>
              <p>{{ accountant.qualification }}</p>
              <p>{{ accountant.phone }}</p>
              <p>{{ user.country.name }}</p>
              <p>{{ user.state.name }}</p>
              <p>{{ user.blood_group != null ? user.blood_group.name : '' }}</p>
            </b-col>
          </b-row>
        </div>
      </div>

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
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { USER_ACCOUNTANT_QUERY } from '~/graphql/accountants/queries'
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
  apollo: {
    user: {
      query: USER_ACCOUNTANT_QUERY,
      variables() {
        return {
          id: parseInt(this.$auth.user.id),
        }
      },
    },
  },
  watch: {
    validation() {
      return (
        this.confirmPassword.length > 5 && this.form.confirmPassword.length < 12
      )
    },
  },
  computed: {
    ...mapState(useWorkspaceStore, ['currentWorkspace']),
    mainWorkspace() {
      return this.currentWorkspace
    },
    accountant() {
      return this.user.accountant
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
.accountant-profile {
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

<template>
  <div class="profile">
    <template v-if="$apollo.queries.user.loading"><Preload /></template>
    <template v-else>
      <b-jumbotron header="" class="user shadow">
        <h1>About</h1>

        <!-- <div class="d-flex justify-content-center mb-4">
          <b-img
            :src="`${$config.APIRoot}/storage/user/${user.photo}`"
            thumbnail
            fluid
            alt="Responsive image"
            width="230"
          ></b-img>
        </div> -->
        <b-row no-gutters class="sm-query">
          <b-col md="6" class="first-detail p-4">
            <p>Full Name</p>
            <p>Phone no:</p>
            <p>Qualifications</p>
            <p>Code</p>
            <p>Gender</p>
            <p>Blood Group</p>
            <p>Country</p>
            <p>State</p>
            <p>city</p>
            <p>L.G.A</p>
          </b-col>
          <b-col md="6" class="first-details p-4">
            <p>{{ user.last_name }} {{ user.first_name }}</p>
            <p>{{ user.phone }}</p>
          </b-col>

          <h3>Change Password</h3>
          <!-- Add Classes -->
        </b-row>
        <div class="margin-down">
          <!-- description -->
          <b-form
            method="POST"
            @submit.prevent="onSubmit"
            @keydown="form.onKeydown($event)"
            @reset.prevent="onReset"
          >
            <!-- description -->
            <b-row no-gutters>
              <b-col md="3">
                <b-form-group label="Old Password">
                  <b-form-input
                    v-model="form.oldPassword"
                    placeholder="Old password"
                    type="password"
                    required
                    size="lg"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Password">
                  <b-form-input
                    v-model="password"
                    placeholder="Enter Password"
                    type="password"
                    required
                    size="lg"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-col md="2"> </b-col>

                <b-form-group label="Confirm Password">
                  <b-form-input
                    v-model="confirmPassword"
                    placeholder="Comfirm password"
                    type="password"
                    required
                    size="lg"
                  ></b-form-input>
                </b-form-group>

                <b-button
                  type="submit"
                  variant="primary"
                  class="mr-4"
                  size="lg"
                >
                  <b-spinner
                    v-if="form.busy"
                    variant="light"
                    class="mr-1 mb-1"
                    small
                  />Add Subject</b-button
                >
              </b-col>
            </b-row>
          </b-form>
        </div>
      </b-jumbotron>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { USER_QUERY } from '~/graphql/users/queries'
import { CHANGE_USER_PASSWORD_MUTATION } from '~/graphql/users/mutations'
import Swal from 'sweetalert2'
export default {
  middleware: 'auth',

  data() {
    return {
      confirmPassword: '',
      form: new this.$form({
        oldPassword: '',
        password: '',
        busy: false,
      }),
    }
  },

  computed: {
    ...mapState(useWorkspaceStore, ['currentWorkspace']),
    mainWorkspace() {
      return this.currentWorkspace
    },
  },
  apollo: {
    user: {
      query: USER_QUERY,
      variables() {
        return {
          id: parseInt(this.$auth.user.id),
        }
      },
    },
  },
  methods: {
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
          .then(() => {
            this.form.confirmPassword = ''
            this.form.busy = false
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
          })
          .catch(() => {
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

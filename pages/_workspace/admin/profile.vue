<template>
  <div class="admin-profile p-3">
    <template v-if="$apollo.queries.user.loading"><Preload /></template>
    <template v-else>
      <b-button
        v-if="mainWorkspace.slug != 'ronazonworkspace'"
        class="shadow-sm mb-3"
        variant="light"
        pill
        size="md"
        @click="changePassword"
        >Change Password</b-button
      >

      <b-card class="user shadow">
        <div v-if="user.photo == null" class="text-center mb-4 mt-4">
          <b-img
            src="@/assets/svg/user-avatar.svg"
            thumbnail
            fluid
            alt="School image"
            width="150"
          ></b-img>
        </div>

        <div v-else class="text-center mb-4 mt-4">
          <b-img
            :src="`${$config.APIRoot}/storage/user/${user.photo}`"
            thumbnail
            fluid
            alt="Responsive image"
            width="150"
          ></b-img>
        </div>

        <div class="d-flex justify-content-between p-5">
          <div>
            <p>User Role</p>
            <p>Full Name</p>
            <p>Email</p>
            <p>Phone no:</p>
            <p>Gender</p>
            <p>Country</p>
            <p>State</p>
            <p>city</p>
            <p>L.G.A</p>
          </div>

          <div style="font-weight: bold">
            <p>{{ user.user_type }}</p>
            <p>{{ user.last_name }} {{ user.first_name }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.phone }}</p>
            <p>{{ mainWorkspace.gender }}</p>
            <p>{{ user.country != null ? user.country.name : '' }}</p>
            <p>{{ user.state != null ? user.state.name : '' }}</p>
            <p>{{ user.city != null ? user.city : '' }}</p>
            <p>{{ user.lga }}</p>
          </div>
        </div>
      </b-card>

      <!-- change password modal -->
      <b-modal id="passwordModal" size="md" centered hide-header hide-footer>
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
                  size="md"
                ></b-form-input>

                <span style="color: red">{{ oldPassword }}</span>
              </b-form-group>

              <b-form-group label="Password">
                <b-form-input
                  v-model="form.password"
                  placeholder="Enter Password"
                  type="password"
                  required
                  size="md"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Confirm Password">
                <b-form-input
                  class="validation"
                  v-model="confirmPassword"
                  placeholder="Comfirm password"
                  type="password"
                  required
                  size="md"
                  @input="changeColor"
                  :style="{ border: isGreen }"
                ></b-form-input>
                <span style="color: red">{{ passwordValidation }}</span>
              </b-form-group>

              <b-button
                type="submit"
                variant="warning"
                class="shadow-sm mr-4"
                size="md"
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
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { USER_QUERY } from '~/graphql/users/queries'
import { CHANGE_USER_PASSWORD_MUTATION } from '~/graphql/users/mutations'
import Preload from '~/components/Preload.vue'
import Swal from 'sweetalert2'

export default {
  components: { Preload },
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
.admin-profile {
  .custom-select {
    font-size: 16px;
  }

  .custom-select:focus {
    box-shadow: none;
  }

  .custom-select,
  .form-control,
  .mb-3 {
    height: 50px;
    font-size: 16px;
    color: #000;
  }
}
</style>

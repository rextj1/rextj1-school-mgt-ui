<template>
  <div class="profile">
    <template v-if="$apollo.queries.user.loading"><Preload /></template>
    <template v-else>

    
      <b-button
        class="shadow-sm mb-3"
        variant="warning"
        size="lg"
        @click="changePassword"
        >Change Password</b-button
      >
      <b-jumbotron bg-variant="light" class="teacher shadow">
        <h1>
          About
          <b-badge variant="success"
            >{{ teacher.last_name }} {{ teacher.first_name }}
            {{ teacher.middle_name }}
          </b-badge>
        </h1>
        <div class="d-flex justify-content-center mb-4">
          <b-img
            :src="`${$config.APIRoot}/storage/teacher/${teacher.photo}`"
            thumbnail
            fluid
            alt="Responsive image"
            width="230"
          ></b-img>
        </div>
        <b-row no-gutters class="sm-query">
          <b-col md="6" class="first-detail p-4">
            <p>Phone no:</p>
            <p>Qualifications</p>
            <p>Code</p>
            <p>Gender</p>
            <p>Blood Group</p>
            <p>Country</p>
            <p>State</p>
            <p>city</p>
            <p>L.G.A</p>

            <p>
              <b-badge style="font-size: 1.6rem" variant="warning"
                >Subjects Assigned</b-badge
              >
            </p>
          </b-col>
          <b-col md="6" class="first-details p-4">
            <p></p>
            <p>{{ teacher.phone }}</p>
            <p>{{ teacher.qualification }}</p>
            <p>{{ teacher.code }}</p>

            <p>{{ teacher.gender }}</p>
            <p>
              {{ user.blood_group != null ? user.blood_group.name : '' }}
            </p>
            <p>
              {{ user.country.name }}
            </p>
            <p>
              {{ user.state.name }}
            </p>
            <p>
              {{ user.city.name }}
            </p>
            <p>
              {{ user.lga }}
            </p>

            <h3 v-for="klase in teacher.klases" :key="klase.id">
              <p>
                <b-badge
                  :id="klase.id"
                  style="line-height: 1.6"
                  variant="warning"
                  class="px-2"
                  >{{ klase.name }}</b-badge
                >
              </p>
              <b-popover :target="klase.id" triggers="hover click">
                <b-nav vertical>
                  <b-nav-item
                    v-for="subject in klase.subjects"
                    :key="subject.id"
                  >
                    <div style="font-size: 1.4rem">{{ subject.subject }}</div>
                  </b-nav-item>
                </b-nav>
              </b-popover>
            </h3>

            <h3 v-for="subject in teacher.subjects" :key="subject.id">
              <p>
                <b-badge
                  :id="subject.id"
                  style="line-height: 1.6"
                  variant="warning"
                  class="px-2"
                  >{{ subject.subject }}</b-badge
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
import { USER_TEACHER_QUERY } from '@/graphql/teachers/queries'
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
      query: USER_TEACHER_QUERY,
      variables() {
        return {
          id: parseInt(this.$auth.user.id),
        }
      },
    },
  },
  computed: {
    teacher() {
      return this.user.teacher
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

<template>
  <div class="font">
    <div class="form-wrapper">
      <div class="cover-box">
        <div class="form-width">
          <b-form
            method="POST"
            @submit.prevent="onSubmit"
            @keydown="form.onKeydown($event)"
          >
            <b-form-group label="Password">
              <b-form-input
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                required
                class="shadow"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Confirm Password">
              <b-form-input
                v-model="form.confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
                class="shadow"
              ></b-form-input>
            </b-form-group>
            <!-- <p style="color: #d953df; font-size: 1.2rem">{{ emailAlert }}</p> -->

            <div class="button-container mt-4">
              <b-button
                type="submit"
                variant="primary"
                class="shadow"
                size="lg"
                pill
                :disabled="form.busy"
              >
                <b-spinner
                  v-if="form.busy"
                  variant="light"
                  small
                  class="mr-1 mb-1"
                />
                Submit
              </b-button>
            </div>
          </b-form>
        </div>
      </div>

      <div class="left-side"></div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { UPDATE_PASSWORD_MUTATION } from '~/graphql/users/mutations'
export default {
  layout: 'auth',

  middleware: 'auth',

  auth: 'guest',

  data() {
    return {
      form: new this.$form({
        password: '',
        busy: false,
      }),
    }
  },
  methods: {
    async onSubmit() {
      this.form.busy = true

      try {
        await this.$apollo
          .mutate({
            mutation: UPDATE_PASSWORD_MUTATION,
            variables: {
              email: this.$route.query.email,
              password: this.form.password,
            },
          })
          .then(() => {
            Swal.fire({
              timer: 1000,
              text: 'password updated successfully',
              position: 'top-right',
              color: '#fff',
              background: '#4bb543',
              toast: false,
              showConfirmButton: false,
              backdrop: false,
            })

            this.$router.push({
              name: 'login',
            })

            this.form.password = ''
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
  },
}
</script>

<style lang="scss" scoped>
.font {
  font-size: 1.6rem;
  .form-wrapper {
    display: flex;

    .form-control,
    .mb-3 {
      height: 4.5rem;
      font-size: 1.4rem;
      border-radius: 0.5rem;
    }

    .cover-box {
      // box-shadow: 0 0 0.2rem 0;
      background-color: #fff;
      width: 50%;
      height: 100vh;

      .form-width {
        color: #fff;
        // position: relative;
        // top: 20rem;
        // left: 18rem;
        max-width: 50%;
        margin: 35vh auto;
      }
    }
    .bold-color {
      color: #fff;
      margin-left: 4rem;
    }
    .bold-color-link {
      color: #fff;
      display: inline-block;
      margin-top: 1rem;
    }

    .left-side {
      background: linear-gradient(to right, #5142f5, #047edf 99%);
      animation: fide-slide-down 2s 0.5s ease-out forwards;
      background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.528)
        ),
        url('~/assets/images/background.jpg');
      background-position: center;
      height: 100vh;
      background-size: cover;
      width: 50%;
    }
  }
}
</style>

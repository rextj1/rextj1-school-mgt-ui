<template>

    <div class="form-wrapper">
      <div class="cover-box">
        <div class="form-width">
          <b-form
            method="POST"
            @submit.prevent="onLogin"
            @keydown="form.onKeydown($event)"
          >
            <b-form-group label="Email">
              <b-form-input
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
                class=""
                :state="getInputState('email')"
              ></b-form-input>
              <b-form-invalid-feedback
                :state="getInputState('email')"
                class="mt-2"
              >
                {{ form.errors.get('email') }}
              </b-form-invalid-feedback>
            </b-form-group>

            <label>Password</label>
            <b-input-group label="Password" label-for="password">
              <input
                id="password"
                v-model="form.password"
                class="form-control"
                :type="[showPassword == true ? 'text' : 'password']"
                required
                name="password"
                placeholder="Enter password"
              />

              <b-input-group-append
                is-text
                class="icon-pass"
                @click="showPassword = !showPassword"
              >
                <b-icon
                  :icon="showPassword ? 'eye-slash-fill' : 'eye-fill'"
                ></b-icon>
                <b-form-invalid-feedback class="mt-2">
                  {{ form.errors.get('password') }}
                </b-form-invalid-feedback>
              </b-input-group-append>
            </b-input-group>

            <nuxt-link
              variant="link"
              :to="{ name: 'forgotpassword' }"
              class="bold-color-link"
            >
              <p style="color: #0f5f4f">Forgot Password</p>
            </nuxt-link>

            <div class="button-container mt-4">
              <b-button
                type="submit"
                variant="primary"
                size="md"
                pill
                :disabled="form.busy"
              >
                <b-spinner
                  v-if="form.busy"
                  variant="light"
                  small
                  class="mr-1 mb-1"
                />
                Log in
              </b-button>
            </div>
          </b-form>
        </div>
      </div>

      <div class="left-side"></div>
    </div>
 
</template>

<script>
export default {
  layout: 'auth',

  middleware: 'auth',

  auth: 'guest',

  data() {
    return {
      showPassword: false,
      form: new this.$form({
        email: '',
        password: '',
        busy: false,
      }),
    }
  },
  methods: {
    getInputState(input) {
      return this.form.errors.has(input) ? false : null
    },
    async onLogin() {
      const credentials = this.form.data()
      this.form.busy = true

      try {
        await this.$auth.loginWith('graphql', credentials)

        // I would normally set this.form.busy = false here
        // but doing that has this effect where the busy spinner
        // stops spinning a few seconds before navigating out...
      } catch ({ graphQLErrors: errors, ...rest }) {
        this.form.busy = false
        if (errors && errors.length) {
          for (let i = 0; i < errors.length; i++) {
            if (errors[i].message === 'validation') {
              this.form.errors.set(errors[i].extensions.validation)
            } else if (errors[i].extensions.code === 'InvalidCredentials') {
              this.form.errors.set('email', 'Email or password is incorrect.')
            }
          }
        } else {
          // console.log(rest)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .form-wrapper {
    display: flex;

    @include media-breakpoint-down(md) {
      display: block;
    }

    .form-control,
    .mb-3 {
      height: 3.2rem;
      font-size: 1.2rem;
      border-radius: 0.5rem;
    }

    .cover-box {
      // box-shadow: 0 0 0.2rem 0;
      background-color: #fff;
      width: 50%;
      height: 100vh;
      
      @include media-breakpoint-down(md) {
        width: 100%;
      }

      .form-width {
        color: #fff;
        max-width: 50%;
        margin: 35vh auto;

        @include media-breakpoint-down(md) {
          position: absolute;
           margin:0;
          left: 25%;
          top: 25%;
          translate: translate(-50%, -50%);
        }
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
      background-color: #2753d7;
      // background: linear-gradient(to right, #5142f5, #047edf 99%);
      // animation: fide-slide-down 2s 0.5s ease-out forwards;
      // background-image: linear-gradient(
      //     to bottom,
      //     rgba(0, 0, 0, 0),
      //     rgba(0, 0, 0, 0.528)
      //   ),
      //   url('~/assets/images/background.jpg');
      // background-position: center;
      // height: 100vh;
      // background-size: cover;
      width: 50%;

      @include media-breakpoint-down(md) {
        display: none;
      }
    }
  }

</style>

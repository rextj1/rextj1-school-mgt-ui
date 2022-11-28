<template>
  <div class="form-wrapper">
    <div class="cover-box">
      <div class="form-width">
        <b-form
          method="POST"
          @submit.prevent="onLogin"
          @keydown="form.onKeydown($event)"
        >
          <b-form-group class="mb-4">
            <label style="color: #111"
              >Email
              <b-icon
                scale="0.6"
                class="mb-1"
                style="margin-left: -6.7px"
                variant="primary"
                icon="star-fill"
            /></label>
            <b-form-input
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
              :state="getInputState('email')"
            ></b-form-input>
            <b-form-invalid-feedback
              :state="getInputState('email')"
              class="mt-2"
            >
              {{ form.errors.get('email') }}
            </b-form-invalid-feedback>
          </b-form-group>

          <label style="color: #111"
            >Password<b-icon
              scale="0.6"
              class="mb-1"
              style="margin-left: -2.5px"
              variant="primary"
              icon="star-fill"
          /></label>

          <div class="password-icon click-icon">
            <input
              id="password"
              v-model="form.password"
              class="form-control change-eye"
              :type="[showPassword == true ? 'text' : 'password']"
              required
              name="password"
              placeholder="Enter password"
            /><b-icon
              style="color: #111"
              class="h5 mt-3"
              :icon="showPassword ? 'eye-slash-fill' : 'eye-fill'"
              @click="showPassword = !showPassword"
            />
            <b-form-invalid-feedback class="mt-2">
              {{ form.errors.get('password') }}
            </b-form-invalid-feedback>
          </div>

          <div class="d-flex justify-content-between">
            <div class="mt-4">
              <b-checkbox
                ><span style="color: #111">Remember me</span></b-checkbox
              >
            </div>

            <div class="mt-2">
              <nuxt-link
                variant="link"
                :to="{ name: 'forgotpassword' }"
                class="bold-color-link"
              >
                <p style="color: #2753d7">Forgot Password?</p>
              </nuxt-link>
            </div>
          </div>

          <div class="button-container mt-4">
            <b-button
              type="submit"
              variant="primary"
              size="lg"
              pill
              style="width: 100%"
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

    <div class="left-side">
      <div class="login-statement">
        <h5>WELCOME TO</h5>
        <h2>EDU ZONE</h2>
        <div class="line"></div>
        <h5>TO ACCESS DASHBOARD</h5>
      </div>
    </div>
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
    width: 100%;
    border-radius: 100px;
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
      position: absolute;
      top: 50%;
      left: 25%;
      width: 22%;
      transform: translate(-50%, -50%);

      @include media-breakpoint-down(md) {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 65%;
        translate: translate(-50%, -50%);
      }

      .password-icon {
        display: flex;

        &.click-icon {
          flex: 0 0 100%;
        }
        & .change-eye {
          border-radius: 100px;
          width: 100%;
          margin-right: -36px;
          &:focus {
            outline: none;
          }
        }
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
    background-color: var(--color-primary);
    background: linear-gradient(to right, rgb(81, 66, 245), #047edf 99%);
    animation: fide-slide-down 2s 0.5s ease-out forwards;
    background-image: linear-gradient(
        to bottom,
        #2753d7c4,
         #240ae9b6,
      ),
      url('~/assets/images/background.jpg');
    background-position: center;
    height: 100vh;
    background-size: cover;
    width: 50%;

    & .login-statement {
      position: absolute;
      top: 50%;
      right: 25%;
      transform: translate(50%, -50%);

      text-transform: uppercase;
    }
    h2 {
      font-weight: bold;
      color: #fff;
      letter-spacing: 1.5px;
      margin-bottom: 20px;
    }
    h5 {
      font-weight: bold;
      color: rgba(255, 255, 255, 0.652);
      letter-spacing: 1.5px;
    }
    & .line {
      width: 250px;
      height: 2px;
      background-color: rgba(255, 255, 255, 0.866);
      margin-bottom: 20px;
    }

    @include media-breakpoint-down(md) {
      display: none;
    }
  }
}
</style>

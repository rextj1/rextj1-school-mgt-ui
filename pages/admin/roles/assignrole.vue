<template>
  <div v-if="!roles"></div>
  <div v-else class="create">
    <div>
      <div>
        <nuxt-link to="/assignRole">
          <b-icon class="h5 mt-1" scale="0.7" icon="arrow-left"></b-icon
          >BACK</nuxt-link
        >
      </div>
    </div>

    <div>
      <b-form
        v-if="show"
        method="POST"
        @submit.prevent="onSubmit"
        @keydown="form.onKeydown($event)"
        @reset.prevent="onReset"
      >
        <b-form-row>
          <b-col>
            <b-form-group label="User Name">
              <b-form-input
                id="name"
                v-model="form.name"
                name="name"
              ></b-form-input>
              <b-form-invalid-feedback :state="!form.errors.has('name')">
                {{ form.errors.get('name') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col>
            <b-form-group label="User Email">
              <b-form-input
                id="email"
                v-model="form.email"
                name="email"
                required
              ></b-form-input>
              <b-form-invalid-feedback :state="!form.errors.has('email')">
                {{ form.errors.get('email') }}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <label>User Password</label>
        <b-input-group label="Password" label-for="password">
          <input
            id="password"
            v-model="form.password"
            class="form-control shadow-sm"
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
              :icon="showPassword ? 'eye-fill' : 'eye-slash-fill'"
            ></b-icon>
            <b-form-invalid-feedback class="mt-2">
              {{ form.errors.get('password') }}
            </b-form-invalid-feedback>
          </b-input-group-append>
        </b-input-group>

        <b-form-group label="Assign Role">
          <b-form-select
            id="role"
            v-model.number="form.role"
            :options="roles"
            value-field="id"
            text-field="name"
            name="role"
            required
          ></b-form-select>
          <b-form-invalid-feedback :state="!form.errors.has('roles')">
            {{ form.errors.get('roles') }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="primary">
          <b-spinner
            v-if="form.busy"
            variant="light"
            small
            class="mr-1 mb-1"
          />create Role</b-button
        >
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { ROLES_QUERIES } from '~/graphql/users/queries'
export default {
  middleware: 'auth',

  data() {
    return {
      active: 'active',
      showPassword: false,
      form: new this.$form({
        email: '',
        password: null,
        role: null,
        busy: false,
      }),

      show: true,
    }
  },
  apollo: {
    roles: {
      query: ROLES_QUERIES,
    },
  },

  //   methods: {
  //     getInputState(input) {
  //       return this.form.errors.has(input) ? false : null
  //     },
  //     onSubmit() {
  //       this.form.busy = true
  //       this.$apollo
  //         .mutate({
  //           mutation: ASSIGN_ROLE_MUTATION,
  //           variables: this.form,
  //         })
  //         .then(({ data }) => {
  //           this.form.busy = false
  //           this.$router.push('/assignRole')
  //         })
  //         .catch(() => {
  //           this.form.busy = false
  //         })
  //     },
  //   },
}
</script>

<style lang="scss" scoped>
</style>
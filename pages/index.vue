<template>
  <div class="margin-down">
    <!-- description -->
<!-- {{ form.roa }} -->
    <b-form
      method="POST"
      @submit.prevent="onSubmit"
      @keydown="form.onKeydown($event)"
    >
      <b-row class="p-4">
        <b-col md="4" class="p-4">
          <input type="text" v-model="form.roa.a" id="" />
          <input type="text" v-model="form.rob.b" id="" />
          <input type="text" v-model="form.roc.c" id="" />
          <input type="text" v-model="form.rod.d" id="" />
          <input type="text" v-model="form.roe.e" id="" />
        </b-col>
      </b-row>

      <div class="d-flex justify-content-center">
        <b-button type="submit" variant="primary" class="mr-4" size="lg">
          <b-spinner
          v-if="form.busy"
            variant="light"
            small
            class="mr-1 mb-1"
          />Register</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
import { CREATE_ROW_MUTATION } from '~/graphql/notices/mutations'
export default {
  data() {
    return {
      form: new this.$form({
        roa: { a: '', id: 1 },
        rob: { b: '', id: 2 },
        roc: { c: '', id: 3 },
        rod: { d: '', id: 4 },
        roe: { e: '', id: 5 },
      }),
    }
  },
  methods: {
    onSubmit() {
      this.form.busy = true
      this.$apollo
        .mutate({
          mutation: CREATE_ROW_MUTATION,
          variables: {description: this.form.data()}
        })
        .then(({ data }) => {
          this.form.busy = false
          console.log(data)
          // this.$router.push('/admin/teacher')
        })
        .catch(() => {})
    },
  },
}
</script>

<template>
  <div class="margin-down">
    <!-- description -->
    <b-form
      v-show="show"
      method="POST"
      @submit.prevent="onSubmit"
      @keydown="form.onKeydown($event)"
    >
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row">
              <b-input
                v-model="form.time"
                style="width: 11rem"
                type="text"
                required
              ></b-input>
            </th>

            <th scope="row">
              <b-form-input v-model="form.monday" type="text"></b-form-input>
            </th>
            <th scope="row">
              <b-form-input v-model="form.tuesday" type="text"></b-form-input>
            </th>
            <th scope="row">
              <b-form-input v-model="form.wednesday" type="text"></b-form-input>
            </th>
            <th scope="row">
              <b-form-input v-model="form.thursday" type="text"></b-form-input>
            </th>
            <th scope="row">
              <b-form-input v-model="form.friday" type="text"></b-form-input>
            </th>
          </tr>
        </tbody>
      </table>
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
export default {
  data() {
    return {
      selected: null,
      show: true,
      form: new this.$form({
        class: null,
        time: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        busy: false,
      }),
    }
  },
  methods: {
    onSubmit() {
      alert(this.form.class)
      this.form.busy = true
      this.$apollo
        .mutate({
          mutation: CREATE_TIMETABLE_MUTATION,
          variables: this.form.data(),
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

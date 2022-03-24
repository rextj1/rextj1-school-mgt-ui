<template>
  <div class="timetable">
    <h2 class="d-flex justify-content-center p-4">
      {{ currentClass }} Class Timetable
    </h2>
    <div class="exam-timetble">
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
              <input
                required
                v-model="form.time"
                style="width: 11rem"
                type="text"
              />
            </th>
            <th scope="row"><input v-model="form.monday" type="text" /></th>
            <th scope="row"><input v-model="form.tuesday" type="text" /></th>
            <th scope="row"><input v-model="form.wednesday" type="text" /></th>
            <th scope="row"><input v-model="form.thurday" type="text" /></th>
            <th scope="row"><input v-model="form.friday" type="text" /></th>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center">
        <b-button size="lg" variant="danger">Submit</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentClass: String,
  },
  data() {
    return {
      form: {
        time: '',
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
      },
    }
  },
}
</script>

<style lang="scss">
.exam-timetble {
  font-size: 1.6rem;
  background-color: var(--color-white);

  input {
    width: 14.5rem;
  }
}
</style>
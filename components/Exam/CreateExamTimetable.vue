<template>
  <div class="timetable">
    <h2 class="d-flex justify-content-center p-4">
      {{ currentClass }} Class Timetable
    </h2>
    <div class="exam-timetable">
      <table class="table table-bordered">
        <thead class="">
          <tr>
            <th scope="col">Date</th>
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
                style="width: 8rem"
                v-model="form.date"
                type="text"
              />
            </th>
            <th scope="row">
              <input
                required
                v-model="form.date"
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
        date: '',
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
.exam-timetable {
  font-size: 1.6rem;
  background-color: var(--color-white);

  input {
    max-width: 13.5rem;
  }
}
</style>
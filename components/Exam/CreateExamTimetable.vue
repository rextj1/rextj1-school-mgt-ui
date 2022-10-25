<template>
  <div class="exam-timetable py-3">
    <h2 class="text-center">
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
                v-model="form.date"
                required
                style="width: 80px"
                type="text"
              />
            </th>
            <th scope="row">
              <input
                v-model="form.date"
                required
                style="width: 110px"
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
        <b-button size="md" variant="danger">Submit</b-button>
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

<style lang="scss" scoped>
.exam-timetable {

  input {
    max-width: 135px;
  }
}
</style>

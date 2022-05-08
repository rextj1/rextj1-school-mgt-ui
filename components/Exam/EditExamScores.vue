<template>
  <div class="timetable">
    <h2 class="d-flex justify-content-center p-4">
      {{ currentClass }} Class Timetable
    </h2>
    <div class="exam-timetable table-responsive">
      <table class="table table-striped table-sm align-table">
        <thead class="">
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Name</th>
             <th scope="col">Subject</th>
            <th scope="col">ADM No.</th>
            <th scope="col">1ST (CA) 20%</th>
            <th scope="col">2ND (CA) 20%</th>
            <th scope="col">Exam 60%</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>John Kelvin</td>
            <td>English Language</td>
            <td>12345</td>
            <td scope="row"><input v-model="form.ca1" type="number" min="0" max="20" /></td>
            <td scope="row"><input v-model="form.ca2" type="number" min="0" max="20"/></td>
            <td scope="row"><input v-model="form.totalMark" type="number" min="0" max="60" /></td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center">
        <b-button size="lg" variant="danger">Submit Scores</b-button>
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
    width: 6rem;
    text-align:center
  }
}
</style>
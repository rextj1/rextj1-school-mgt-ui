<template>
  <div class="timetable p-4">
    <h2 class="d-flex justify-content-center p-4"></h2>
    <div class="exam-timetable table-responsive p-4">
      <b-form
        method="POST"
        @submit.prevent="onLogin"
        @keydown="form.onKeydown($event)"
      >
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
          <!-- {{
            mark
          }} -->
          <tbody>
            <tr v-for="(mark, value) in marks" :key="mark.id">
              <td>{{ value + 1 }}</td>
              <td>
                {{ mark.student.first_name }} {{ mark.student.last_name }}
              </td>
              <td>{{ mark.subject.subject }}</td>

              <td></td>
              <td scope="row">
                <input
                  v-model="mark.ca1"
                  @input="sendText(mark, $event.target.value, 'ca1')"
                  type="number"
                  min="0"
                  max="20"
                />
              </td>
              <td scope="row">
                <input
                  v-model="mark.ca2"
                  type="number"
                  min="0"
                  max="20"
                  @input="sendText(mark, $event.target.value, 'ca2')"
                />
              </td>
              <td scope="row">
                <input
                  v-model="mark.exam_total"
                  @input="sendText(mark, $event.target.value, 'exam')"
                  type="number"
                  min="0"
                  max="60"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="d-flex justify-content-center mt-4">
          <b-button size="lg" type="submit" variant="danger"
            >Submit Scores</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { MARK_QUERIES } from '@/graphql/marks/queries'
import { CREATE_ROW_MUTATION } from '~/graphql/marks/mutations'
export default {
  middleware: 'auth',
  // props: {
  //   currentClass: String,
  // },

  data() {
    return {
      scores: [],
      form: new this.$form({
        ca: [],
      }),
    }
  },
  apollo: {
    marks: {
      query: MARK_QUERIES,
      variables: {
        klase_id: 1,
        subject_id: 1,
      },
    },
  },
  methods: {
    sendText(mark, value, keyName) {
      const index = this.scores.findIndex((score) => score.markId === mark.id)
      console.log(index)
      if (index === -1) {
        this.scores = [
          ...this.scores,
          {
            markId: mark.id,
            [keyName]: value,
          },
        ]
      } else {
        this.scores = [
          ...this.scores.slice(0, index),
          {
            ...this.scores[index],
            [keyName]: value,
          },
          ...this.scores.slice(index + 1),
        ]
      }

      console.log(this.scores)
    },
    onLogin() {
     this.$apollo.mutate({
       mutation: CREATE_ROW_MUTATION,
       variables: {marks: this.scores}
     }).then(({data})=> {
       console.log(data);
     })
    },
  },
}
</script>

<style lang="scss">
.exam-timetable {
  font-size: 1.6rem;
  background-color: var(--color-white);

  input {
    width: 6rem;
    text-align: center;
  }
}
</style>
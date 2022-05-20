<template>
  <div>
    <div class="card">
      <div class="card-header"></div>

      <div class="card">
        <div class="card-body">
          <div class="p-3 roles-table">
            <h2
              class="p-4 d-flex justify-content-center"
              style="font-weight: bold"
            >
              Student Result Section
            </h2>
            <b-table :items="klaseResults" :fields="fields">
              <template #cell(#)="data">
                {{ data.index + 1 }}
              </template>

              <template #cell(student)="data">
                {{ data.value.first_name }} {{ data.value.last_name }}
              </template>

              <template #cell(adm_no)="data">
                {{ data.item.student.adm_no }}
              </template>

              <template #cell(term)="data">
                {{ data.item.term.name }}
              </template>

              <template #cell(session)="data">
                {{ data.item.session.name }}
              </template>

              <template #cell(klase)="data">
                {{ data.item.klase.name }}
              </template>

              <template #cell(actions)="data">
                <router-link
                  variant="primary"
                  :to="{
                    name: 'admin-exam-slug',
                    params: { slug: data.item.student.id },
                    query: {
                      students,
                    },
                  }"
                >
                  <b-icon icon="eye" class="mr-1"></b-icon>
                  View Result
                </router-link>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { STUDENT_EXAM_RESULT_QUERIES } from '~/graphql/examRecord/queries'
import { STUDENT_MARK_RESULT_QUERIES } from '~/graphql/marks/queries'
export default {
  props: {
    klaseResults: Array,
    student: Array,
  },
  data() {
    return {
      students: [],
      studentExamResult: [],
      studentMarkResult: [],
      resultsModal: 'pop-up',
      fields: [
        {
          key: '#',
          sortable: false,
        },
        {
          key: 'student',
          label: 'Full Name',
          sortable: false,
        },
        {
          key: 'adm_no',
          label: 'Adm_no.',
        },
        {
          key: 'klase',
          label: 'Class',
        },
        {
          key: 'term',
          label: 'Term.',
        },
        {
          key: 'session',
          label: 'Session.',
        },

        {
          key: '',
          sortable: false,
        },
        {
          key: 'actions',
          label: 'Actions',
          sortable: false,
        },
      ],
    }
  },

  methods: {
    position(i) {
      var j = i % 10
      const k = i % 100
      if (j == 1 && k != 11) {
        return i + '<sup>st</sup>'
      }
      if (j == 2 && k != 12) {
        return i + `<sup>nd</sup>`
      }
      if (j == 3 && k != 13) {
        return i + '<sup>rd</sup>'
      }
      if (i > 3) {
        return i + '<sup>th</sup>'
      }
    },
    resultModal(item) {
      this.$bvModal.show(this.resultsModal)

      setTimeout(() => {
        this.$apollo.addSmartQuery('studentExamResult', {
          query: STUDENT_EXAM_RESULT_QUERIES,
          variables() {
            return {
              klase_id: parseInt(this.student[0]),
              student_id: parseInt(item),
              term_id: parseInt(this.student[1]),
              session_id: parseInt(this.student[2]),
            }
          },
          result({ loading, data }, key) {
            if (!loading) {
              this.studentExamResult = data.studentExamResult
            }
          },
        })
      }, 100)
      setTimeout(() => {
        this.$apollo.addSmartQuery('studentMarkResult', {
          query: STUDENT_MARK_RESULT_QUERIES,
          variables() {
            return {
              klase_id: parseInt(this.student[0]),
              student_id: parseInt(item),
              term_id: parseInt(this.student[1]),
              session_id: parseInt(this.student[2]),
            }
          },
          result({ loading, data }, key) {
            if (!loading) {
              this.studentMarkResult = data.studentMarkResult
            }
          },
        })
      }, 100)
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  font-size: 1.5rem;
  .text-center {
    border: 2px solid #000;
  }
}
</style>
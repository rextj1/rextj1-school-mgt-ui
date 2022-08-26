<template>
  <div>
    <div v-if="nowLoading"><Preload /></div>
    <div v-else>
      <div class="card">
        <div class="card-header">
          {{studentMarkResult}}
          <div class="card">
            <vue-html2pdf
              ref="html2Pdf"
              :show-layout="true"
              :float-layout="false"
              :enable-download="false"
              :preview-modal="true"
              :paginate-elements-by-height="1400"
              filename="Pdf"
              :pdf-quality="2"
              :manual-pagination="false"
              pdf-format="a4"
              pdf-orientation="landscape"
              pdf-content-width=""
            >
              <section slot="pdf-content">
                <div class="p-4 text-center">
                  <div
                    class="student__wrapper"
                    style="
                      border: 2px solid #000;
                      font-weight: bold;
                      width: 75%;
                      margin: auto;
                    "
                  >
                    <div
                      style="
                        font-weight: bold;
                        border: 4px solid #f0ad4e;
                        width: 98%;
                        margin: auto;
                        margin-top: 0.5rem;
                      "
                    >
                      <div
                        v-for="first in studentExamResult"
                        :key="first.id"
                        style="
                          margin-top: 1rem;
                          padding: 1rem;

                          overflow-x: auto;
                          font-weight: bold;
                        "
                      >
                        <div
                          class="
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                          style=""
                        >
                          <!-- :src="`${$config.APIRoot}/student/storage/${first.student.photo}`" -->
                          <div class="school-logo" style="">
                            <img
                              src="@/assets/svg/ronazon-logo.svg"
                              alt="logo"
                              width="100"
                            />
                          </div>
                          <div class="d-flex flex-column align-items-center">
                            <h2><em>Ronazon Academy International</em></h2>
                            <h4>Result sheet {{ first.klase.name }}</h4>
                          </div>
                          <div class="student-picture">
                            <img
                              src="@/assets/images/teacher.jpeg"
                              alt="student-photo"
                              width="60"
                            />
                          </div>
                        </div>
                        <!-- end header -->
                        <div class="d-flex justify-content-between">
                          <div
                            class="d-flex align-items-stretch"
                            style="margin-top: 3rem"
                          >
                            <h4>NAME OF STUDENT:</h4>
                            <h4 style="margin-left: 0.5rem">
                              {{ first.student.first_name }}
                              {{ first.student.last_name }}
                              {{ first.student.middle_name }}
                            </h4>
                          </div>
                          <div
                            class="d-flex align-items-stretch"
                            style="margin-top: 3rem"
                          >
                            <h4>ADM No:</h4>
                            <h4 style="margin-left: 0.5rem">
                              {{ first.student.adm_no }}
                            </h4>
                          </div>
                          <div
                            class="d-flex align-items-stretch"
                            style="margin-top: 3rem"
                          >
                            <h4>Class:</h4>
                            <h4 style="margin-left: 0.5rem">
                              {{ first.klase.name }}
                            </h4>
                          </div>
                          <div
                            class="d-flex align-items-stretch"
                            style="margin-top: 3rem"
                          >
                            <h4>Term:</h4>

                            <h4 style="margin-left: 0.5rem" v-if="term == 1">
                              First Term
                            </h4>
                            <h4
                              style="margin-left: 0.5rem"
                              v-else-if="term == 2"
                            >
                              Secound Term
                            </h4>
                            <h4 style="margin-left: 0.5rem" v-else>
                              Third Term
                            </h4>
                          </div>
                        </div>
                        <div class="d-flex justify-content-between">
                          <div
                            class="d-flex align-items-stretch"
                            style="margin-top: 3rem"
                          >
                            <h4>POSITION:</h4>
                            <h4
                              style="margin-left: 0.5rem"
                              v-html="position(first.position)"
                            ></h4>
                          </div>
                           <div
                            class="d-flex align-items-stretch"
                            style="margin-top: 3rem"
                          >
                            <h4>SECTION:</h4>
                            <h4 style="margin-left: 0.5rem">{{first.section.name}}</h4>
                          </div>
                          <div
                            class="d-flex align-items-stretch"
                            style="margin-top: 3rem"
                          >
                            <h4>SESSION:</h4>
                            <h4 style="margin-left: 0.5rem">{{first.session.name}}</h4>
                          </div>
                          <div
                            class="d-flex align-items-stretch"
                            style="margin-top: 3rem"
                          >
                            <h4>Age:</h4>

                            <h5
                              style="margin-top: 0.3rem; margin-left: 0.5rem"
                              v-html="getAge(first.student.birthday)"
                            ></h5>
                          </div>
                          <div
                            class="d-flex align-items-stretch"
                            style="margin-top: 3rem"
                          >
                            <h4>NUMBERS IN CLASS:</h4>

                            <h4 style="margin-left: 0.5rem">
                              {{ numStudents }}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- table -->

                    <div
                      style="
                        overflow-x: auto;
                        font-weight: bold;
                        width: 99%;
                        margin: 2rem auto;
                      "
                    >
                      <div class="d-flex flex-column">
                        <table
                          border="2"
                          style="text-align: center; border: 3px solid #292b2c"
                        >
                          <tr style="color: #1c0988">
                            <th style="padding: 0.5rem" rowspan="2">
                              Subjects
                            </th>
                            <th style="padding: 0.5rem" colspan="3">
                              Contineous Assesment
                            </th>
                            <th style="padding: 0.5rem" rowspan="2">
                              Exam <br />60%
                            </th>
                            <th style="padding: 0.5rem" rowspan="2">
                              Final remarks <br />(100%)
                            </th>
                            <th style="padding: 0.5rem" rowspan="2">Grade</th>
                            <th style="padding: 0.5rem" rowspan="2">
                              Subject <br />position
                            </th>
                            <th style="padding: 0.5rem" rowspan="2">Remarks</th>
                          </tr>
                          <tr style="color: #1c0988">
                            <th style="padding: 0.5rem">Ca1<br />(20%)</th>
                            <th style="padding: 0.5rem">Ca2<br />(20%)</th>
                            <th style="padding: 0.5rem">Total<br />(40%)</th>
                          </tr>
                          <tr
                            v-for="second in studentMarkResult"
                            :key="second.id"
                          >
                            <th style="padding: 0.5rem; color: #d9534f">
                              {{ second.subject.subject }}
                            </th>
                            <td style="padding: 0.5rem">{{ second.ca1 }}</td>
                            <td style="padding: 0.5rem">{{ second.ca2 }}</td>
                            <td style="padding: 0.5rem">{{ second.tca }}</td>
                            <td style="padding: 0.5rem">{{ second.exam }}</td>
                            <td style="padding: 0.5rem">
                              {{ second.exam_total }}
                            </td>

                            <td
                              v-if="
                                second.grade == null
                                  ? ''
                                  : second.grade.name == 'F'
                              "
                              style="padding: 0.5rem; color: #d9534f"
                            >
                              {{
                                second.grade == null ? '' : second.grade.name
                              }}
                            </td>

                            <td v-else style="padding: 0.5rem; color: green">
                              {{
                                second.grade == null ? '' : second.grade.name
                              }}
                            </td>

                            <td
                              style="padding: 0.5rem"
                              v-html="position(second.sub_position)"
                            ></td>

                            <td
                              v-if="
                                second.grade == null
                                  ? ''
                                  : second.grade.name == 'F'
                              "
                              style="padding: 0.5rem; color: #d9534f"
                            >
                              {{
                                second.grade == null ? '' : second.grade.remark
                              }}
                            </td>

                            <td v-else style="padding: 0.5rem; color: green">
                              {{
                                second.grade == null ? '' : second.grade.remark
                              }}
                            </td>
                          </tr>

                          <tr
                            v-for="(third, index) in studentExamResult"
                            :key="index"
                            style="color: #1c0988"
                          >
                            <th style="padding: 0.5rem" colspan="3">
                              Total score obtained: {{ third.total }}
                            </th>
                            <th style="padding: 0.5rem" colspan="3">
                              Final Average: {{ third.avg }}
                            </th>
                            <th style="padding: 0.5rem" colspan="3">
                              Class Average: {{ third.klase_avg }}
                            </th>
                          </tr>
                        </table>
                      </div>

                      <div
                        style="margin-top: 2rem; font-weight: bold"
                        class="d-flex"
                      >
                        <div>
                          <table
                            border="2"
                            style="width: 30rem; border: 2px solid #d9534f"
                          >
                            <tr>
                              <td
                                style="width: 30rem; border: 2px solid #d9534f"
                              >
                                Principal Remarks
                              </td>
                              <td
                                style="width: 30rem; border: 2px solid #d9534f"
                              >
                                Albert
                              </td>
                            </tr>
                          </table>
                        </div>

                        <!-- comments -->
                        <div class="ml-auto">
                          <table
                            border="2"
                            style="width: 30rem; border: 2px solid #d9534f"
                          >
                            <tr>
                              <td
                                style="width: 30rem; border: 2px solid #d9534f"
                              >
                                Principal Remarks
                              </td>
                              <td
                                style="width: 30rem; border: 2px solid #d9534f"
                              >
                                Albert
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </vue-html2pdf>
            <div class="d-flex justify-content-center mb-4">
              <b-button
                variant="danger"
                size="lg"
                @click.prevent="generateReport"
                >Download</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { STUDENT_EXAM_RESULT_QUERIES } from '~/graphql/examRecord/queries'
import { STUDENT_MARK_RESULT_QUERIES } from '~/graphql/marks/queries'
export default {
  middleware: 'auth',

  computed: {
    nowLoading() {
      return (
        this.$apollo.queries.studentExamResult.loading &&
        this.$apollo.queries.studentMarkResult.loading
      )
    },
    numStudents() {
      return this.$route.query.numStudents
    },
    term() {
      return this.$route.query.student[1]
    },
    studentId() {
      return this.$route.params.slug
    },
    klaseId() {
      return this.$route.query.student[0]
    },
    sessionId() {
      return this.$route.query.student[2]
    },
    sectionId() {
      return this.$route.query.student[3]
    },
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  apollo: {
    studentExamResult: {
      query: STUDENT_EXAM_RESULT_QUERIES,
      variables() {
        return {
          klase_id: parseInt(this.klaseId),
          student_id: parseInt(this.studentId),
          term_id: parseInt(this.term),
          session_id: parseInt(this.sessionId),
          section_id: parseInt(this.sectionId),
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
    //
    studentMarkResult: {
      query: STUDENT_MARK_RESULT_QUERIES,
      variables() {
        return {
          klase_id: parseInt(this.klaseId),
          student_id: parseInt(this.studentId),
          term_id: parseInt(this.term),
          session_id: parseInt(this.sessionId),
          section_id: parseInt(this.sectionId),
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
  },

  methods: {
    position(i) {
      const j = i % 10
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
    getAge(item) {
      const dob = new Date(item)
      const month_diff = Date.now() - dob.getTime()
      const age_dt = new Date(month_diff)
      const year = age_dt.getUTCFullYear()
      const age = Math.abs(year - 1970)
      return age + ' years'
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
  // color: #1c0988;
}
</style>

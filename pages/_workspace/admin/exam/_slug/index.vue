<template>
  <div>
    <div v-if="nowLoading"><Preload /></div>
    <div v-else>
      <div class="card">
        <div class="card-header">
          <b-button variant="primary" @click="handleEditCommits()"
            >Edit Comments</b-button
          >

          <!-- {{ studentExamResult }} -->
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
                <div class="p-4">
                  <div
                    class="student__wrapper"
                    style="
                      border: 2px solid #111;
                      font-weight: bold;
                      width: 90%;
                      margin: auto;
                    "
                  >
                    <div
                      v-for="first in studentExamResult"
                      :key="first.id"
                      style="
                        margin-top: 1rem;
                        padding: 0.5rem;

                        overflow-x: auto;
                        font-weight: bold;
                      "
                    >
                      <div
                        class="
                          mt-4
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
                          <h1 style="font-weight: bold; color: #1c0988">
                            <em>Ronazon Academy International</em>
                          </h1>
                          <h3 style="font-weight: bold; color: #1c0988">
                            Result sheet {{ first.klase.name }}
                          </h3>
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
                      <!-- section 1 -->

                      <div class="mt-4">
                        <table
                          border="2"
                          style="
                            border: 2px solid #292b2c;
                            width: 100%;
                            margin: 0;
                            text-transform: uppercase;
                          "
                        >
                          <tr style="color: #1c0988">
                            <th style="padding: 0.5rem" colspan="2">
                              <span class="d-flex">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  NAME OF STUDENT:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.student.first_name }}
                                  {{ first.student.last_name }}
                                  {{ first.student.middle_name }}
                                </h5>
                              </span>
                            </th>

                            <th style="padding: 0.5rem" colspan="1">
                              <span class="d-flex">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  SEX:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.student.gender }}
                                </h5>
                              </span>
                            </th>
                            <th style="padding: 0.5rem" rowspan="1">
                              <span class="d-flex">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  ADMISSION NO:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.student.adm_no }}
                                </h5>
                              </span>
                            </th>

                            <th style="padding: 0.5rem" rowspan="1">
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  AGE:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                  v-html="getAge(first.student.birthday)"
                                ></h5>
                              </span>
                            </th>
                          </tr>
                          <tr>
                            <th style="padding: 0.5rem" colspan="1">
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  ATTENDANCE:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.num_present }} /
                                  {{ first.num_total }}
                                </h5>
                              </span>
                            </th>

                            <th style="padding: 0.5rem" colspan="1">
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  NUMBER IN CLASS:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ numStudents }}
                                </h5>
                              </span>
                            </th>

                            <th style="padding: 0.5rem" colspan="1">
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  POSITION:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                  v-html="position(first.position)"
                                ></h5>
                              </span>
                            </th>

                            <th style="padding: 0.5rem" colspan="1">
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  RESULT STATUS:
                                </h5>
                                <h5
                                  v-if="first.avg >= setPromotion.name"
                                  class="mt-2 ml-2"
                                  style="color: green; font-weight: bold"
                                >
                                  PASS
                                </h5>
                                <h5
                                  v-else
                                  class="mt-2 ml-2"
                                  style="color: #d9534f; font-weight: bold"
                                >
                                  FAIL
                                </h5>
                              </span>
                            </th>
                            <th
                              v-if="term == 1"
                              style="padding: 0.5rem"
                              colspan="1"
                            >
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  class:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.klase.name }}
                                </h5>
                              </span>
                            </th>

                            <th
                              v-if="term == 2"
                              style="padding: 0.5rem"
                              colspan="1"
                            >
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  class:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.klase.name }}
                                </h5>
                              </span>
                            </th>

                            <th
                              v-if="term == 3 && first.ps != 'graduated'"
                              style="padding: 0.5rem"
                              colspan="1"
                            >
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  PROMOTED TO:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.promoted_to }}
                                </h5>
                              </span>
                            </th>

                            <th
                              v-if="term == 3 && first.ps == 'graduated'"
                              style="padding: 0.5rem"
                              colspan="1"
                            >
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  class :
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.klase.name }}
                                </h5>
                              </span>
                            </th>
                          </tr>

                          <tr>
                            <th
                              style="padding: 0.5rem"
                              rowspan="1"
                              v-if="first.ps != 'graduated'"
                            >
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  Term Begins:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.term_start }}
                                </h5>
                              </span>
                            </th>

                            <th
                              style="padding: 0.5rem"
                              rowspan="1"
                              v-if="first.ps != 'graduated'"
                            >
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  Term Ends:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.term_end }}
                                </h5>
                              </span>
                            </th>

                            <th
                              style="padding: 0.5rem"
                              colspan="2"
                              v-if="first.ps == 'graduated'"
                            >
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  Graduate Student
                                </h5>
                              </span>
                            </th>
                            <th
                              style="padding: 0.5rem"
                              colspan="1"
                              v-if="term == 1"
                            >
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  TERM:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.term.name }}
                                </h5>
                              </span>
                            </th>

                            <th
                              style="padding: 0.5rem"
                              colspan="1"
                              v-if="term == 2"
                            >
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  TERM:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.term.name }}
                                </h5>
                              </span>
                            </th>

                            <th
                              style="padding: 0.5rem"
                              colspan="1"
                              v-if="term == 3"
                            >
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  TERM:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #1f1f9f; font-weight: bold"
                                >
                                  {{ first.term.name }}
                                </h5>
                              </span>
                            </th>

                            <th style="padding: 0.5rem" colspan="1">
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  SECTION:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #1f1f9f; font-weight: bold"
                                >
                                  {{ first.section.name }}
                                </h5>
                              </span>
                            </th>
                            <th style="padding: 0.5rem" rowspan="1">
                              <span class="d-flex align-items-stretch">
                                <h5
                                  class="mt-2"
                                  style="color: #1c09f5; font-weight: bold"
                                >
                                  SESSION:
                                </h5>
                                <h5
                                  class="mt-2 ml-2"
                                  style="color: #111; font-weight: bold"
                                >
                                  {{ first.session.name }}
                                </h5>
                              </span>
                            </th>
                          </tr>
                        </table>
                      </div>
                    </div>

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

                      <!-- comments -->

                      <div
                        class="d-flex justify-content-between"
                        style="margin-top: 4rem; font-weight: bold"
                      >
                        <div
                          class="mt-4"
                          style="width: 30rem; border: 2px solid #292b2c"
                        >
                          <div class="mr-2" style="width: 30rem">
                            <div
                              class="text-center p-1"
                              style="
                                margin: 0;
                                background-color: #007bff;
                                color: #fff;
                              "
                            >
                              A GRADE KEY
                            </div>
                          </div>

                          <span
                            class="p-1 mt-2 d-flex justify-content-between"
                            style="color: #1c0988"
                            v-for="grade in grades"
                            :key="grade.id"
                          >
                            <span>{{ grade.name }} - {{ grade.remark }}</span>
                            <span class="ml-auto m-r-2" style="color: #1c0988"
                              >{{ grade.mark_from }} -
                              {{ grade.mark_to }} %</span
                            >
                          </span>
                        </div>

                        <!-- comments -->

                        <div class="mt-4 ml-3">
                          <div
                            class="p-1"
                            style="width: 59rem; border: 2px solid #111"
                          >
                            <div
                              class="text-center p-1"
                              style="
                                margin: 0;
                                background-color: #007bff;
                                color: #fff;
                              "
                            >
                              Teacher's Remark
                            </div>
                            <div v-if="!studentExamResult"></div>
                            <h5 v-else class="p-2 mt-2" style="color: #1c0988">
                              {{ studentExamResult[0].p_comment }}
                            </h5>
                          </div>

                          <div
                            class="p-1"
                            style="
                              width: 59rem;
                              border: 2px solid #111;
                              margin-top: 0.2px;
                            "
                          >
                            <div
                              class="text-center p-1"
                              style="
                                margin: 0;
                                background-color: #007bff;
                                color: #fff;
                              "
                            >
                              Head Teacher's Remark
                            </div>
                            <div v-if="!studentExamResult"></div>
                            <h5
                              v-else
                              class="p-2 mt-2"
                              style="color: #1c0988; font-style: italic"
                            >
                              {{ studentExamResult[0].t_comment }}
                            </h5>
                          </div>
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

      <!-- edit modal -->

      <ExamResultCommitsModal
        v-if="examRecords"
        v-model="isResultComments"
        :studentExamResult="examRecords"
        :student="[klaseId, studentId, term, sessionId, sectionId]"
      />
      <!-- end modal -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { STUDENT_EXAM_RESULT_QUERIES } from '~/graphql/examRecord/queries'
import { STUDENT_MARK_RESULT_QUERIES } from '~/graphql/marks/queries'
import { GRADE_QUERIES } from '~/graphql/grades/queries'
import { SET_PROMOTION_QUERIES } from '~/graphql/promotions/queries'

export default {
  middleware: 'auth',
  data: () => ({
    isResultComments: false,
    examRecords: null,
    setPromotion: {},
  }),

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
    teacherRemarks() {
      return this.teacherRemark()
    },
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
    grades: {
      query: GRADE_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
    setPromotion: {
      query: SET_PROMOTION_QUERIES,
      variables() {
        return {
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
    teacherRemark() {
      const a = this.studentExamResult[0].t_comment
      a.substring(0, 50)
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
    handleEditCommits() {
      this.examRecords = this.studentExamResult
      this.isResultComments = true
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

<template>
  <div v-if="!studentExamResult && !studentMarkResult"></div>
  <div v-else>
    <div class="card">
      <div class="card-header">
        <div class="card">
          <div class="card-body">
            <div class="p-3 roles-table">
              <h2
                class="p-4 d-flex justify-content-center"
                style="font-weight: bold"
              >
                Student Result Section
              </h2>
            </div>
          </div>

          <vue-html2pdf
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
            ref="html2Pdf"
          >
            <section slot="pdf-content">
              <div class="p-4 text-center">
                <div class="student__wrapper" style="padding: 3rem 4rem">
                  <div v-for="first in studentExamResult" :key="first.id">
                    <div
                      class="
                        d-flex
                        justify-content-between
                        align-items-center
                        mb-4
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
                        <h2>Ronazon Academy</h2>
                        <h4>Result sheet {{ first.klase.name }}</h4>
                      </div>
                      <div class="student-picture">
                        <img
                          src="@/assets/images/teacher.jpeg"
                          alt="student-photo"
                          width="100"
                        />
                      </div>
                    </div>
                    <!-- end header -->
                    <div class="d-flex justify-content-between">
                      <div
                        class="d-flex align-items-stretch"
                        style="margin-top: 3rem"
                      >
                        <h4>Name:</h4>
                        <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">
                          {{ first.student.first_name }}
                          {{ first.student.last_name }}
                          {{ first.student.middle_name }}
                        </h5>
                      </div>
                      <div
                        class="d-flex align-items-stretch"
                        style="margin-top: 3rem"
                      >
                        <h4>ADM No:</h4>
                        <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">
                          {{ first.student.adm_no }}
                        </h5>
                      </div>
                      <div
                        class="d-flex align-items-stretch"
                        style="margin-top: 3rem"
                      >
                        <h4>Class:</h4>
                        <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">
                          {{ first.klase.name }}
                        </h5>
                      </div>
                      <div
                        class="d-flex align-items-stretch"
                        style="margin-top: 3rem"
                      >
                        <h4>House:</h4>

                        <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">
                          Red House
                        </h5>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div
                        class="d-flex align-items-stretch"
                        style="margin-top: 3rem"
                      >
                        <h4>Report sheet for:</h4>
                        <h4
                          style="margin-top: 0.3rem; margin-left: 0.5rem"
                          v-html="position(first.position)"
                        ></h4>
                      </div>
                      <div
                        class="d-flex align-items-stretch"
                        style="margin-top: 3rem"
                      >
                        <h4>Academic year:</h4>
                        <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">
                          2020-2023
                        </h5>
                      </div>
                      <div
                        class="d-flex align-items-stretch"
                        style="margin-top: 3rem"
                      >
                        <h4>Age:</h4>

                        <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">
                          {{ first.student.birthday }}
                        </h5>
                      </div>
                      <div
                        class="d-flex align-items-stretch"
                        style="margin-top: 3rem"
                      >
                        <h4>House:</h4>

                        <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">
                          JSS 1
                        </h5>
                      </div>
                    </div>
                  </div>

                  <!-- table -->

                  <div
                    style="margin-top: 2rem; padding: 3rem; overflow-x: auto"
                  >
                    <div class="d-flex flex-column">
                      <table border="2" style="text-align: center">
                        <tr>
                          <th style="padding: 0.5rem" rowspan="2">Subjects</th>
                          <th style="padding: 0.5rem" colspan="3">
                            Contineous Assesment
                          </th>
                          <th style="padding: 0.5rem" rowspan="2">
                            Exam <br />60
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
                        <tr>
                          <th style="padding: 0.5rem">ca1(20%)</th>
                          <th style="padding: 0.5rem">ca2(20%)</th>
                          <th style="padding: 0.5rem">Total(40%)</th>
                        </tr>
                        <tr
                          v-for="second in studentMarkResult"
                          :key="second.id"
                        >
                          <th style="padding: 0.5rem">
                            {{ second.subject.subject }}
                          </th>
                          <td style="padding: 0.5rem">{{ second.ca1 }}</td>
                          <td style="padding: 0.5rem">{{ second.ca2 }}</td>
                          <td style="padding: 0.5rem">{{ second.tca }}</td>
                          <td style="padding: 0.5rem">{{ second.exam }}</td>
                          <td style="padding: 0.5rem">
                            {{ second.exam_total }}
                          </td>
                          <td style="padding: 0.5rem">
                            {{
                              second.grade == null
                                ? ''
                                : second.grade.name
                            }}
                          </td>

                          <td
                            style="padding: 0.5rem"
                            v-html="position(second.sub_position)"
                          ></td>
                          <td style="padding: 0.5rem">
                            {{
                              second.grade == null
                                ? ''
                                : second.grade.remark
                            }}
                          </td>
                        </tr>

                        <tr v-for="third in studentExamResult" :key="third.id">
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
                    <div style="margin-top: 2rem; font-weight: bold">
                      <u>Key</u>
                    </div>

                    <div class="d-flex">
                      <div style="list-style: inside">
                        <ol>
                          <li>70% - 100% = Excellent</li>
                          <li>60% - 69% = Very Good</li>
                          <li>50% - 59% = Good</li>
                          <li>40% - 49% = Fair</li>
                          <li>0 - 39% = poor</li>
                        </ol>
                      </div>

                      <table border="2" class="ml-auto">
                        <tr>
                          <th>Affected trait</th>
                          <th>Rating</th>
                        </tr>
                        <tr>
                          <th>Fitness</th>
                          <th></th>
                        </tr>
                      </table>
                    </div>

                    <div class="mt-4 remarks">
                      <div class="d-flex">
                        Teacher's comment:
                        <p
                          style="
                            width: 70%;
                            border-bottom: 1px solid #000;
                            margin-left: 2rem;
                          "
                        >
                          A very bright
                        </p>
                      </div>
                      <div class="d-flex">
                        Principal's comment:
                        <p
                          style="
                            width: 70%;
                            border-bottom: 1px solid #000;
                            margin-left: 2rem;
                          "
                        >
                          An excellent performance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </vue-html2pdf>
          <div class="d-flex justify-content-center mb-4">
            <b-button variant="danger" size="lg" @click.prevent="generateReport"
              >Download</b-button
            >
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
  middleware: 'auth',

  data() {
    return {}
  },

  apollo: {
    studentExamResult: {
      query: STUDENT_EXAM_RESULT_QUERIES,
      variables() {
        return {
          klase_id: parseInt(this.$route.query.student[0]),
          student_id: parseInt(this.$route.params.slug),
          term_id: parseInt(this.$route.query.student[1]),
          session_id: parseInt(this.$route.query.student[2]),
        }
      },
    },
    //
    studentMarkResult: {
      query: STUDENT_MARK_RESULT_QUERIES,
      variables() {
        return {
          klase_id: parseInt(this.$route.query.student[0]),
          student_id: parseInt(this.$route.params.slug),
          term_id: parseInt(this.$route.query.student[1]),
          session_id: parseInt(this.$route.query.student[2]),
        }
      },
    },
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
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  font-size: 1.5rem;
}
</style>
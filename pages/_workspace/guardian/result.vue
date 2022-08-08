<template>
  <div class="p-4 view-payment">
    <template v-if="!klases && !terms && !sessions && !user">
      <div></div
    ></template>
    <template v-else>
      <b-card class="p-3 mb-4 d-flex">
        <b-form @submit.prevent="markSubmit">
          <b-row>
            <b-col md="2">
              <b-form-group label="Select Class">
                <b-form-select
                  id="klases"
                  v-model="form.class"
                  value-field="id"
                  text-field="name"
                  :options="klases"
                  class="mb-3"
                  size="lg"
                >
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
              <b-form-group label="Select Term">
                <b-form-select
                  id="terms"
                  v-model="form.term"
                  value-field="id"
                  text-field="name"
                  :options="terms"
                  class="mb-3"
                  size="lg"
                >
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
              <b-form-group label="Select Session">
                <b-form-select
                  id="sessions"
                  v-model="form.session"
                  value-field="id"
                  text-field="name"
                  :options="sessions"
                  class="mb-3"
                  size="lg"
                >
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
              <div v-if="!user.guardian">
                <b-form-group label="State">
                  <b-form-select class="mb-3">
                    <b-form-select-option value="null"> </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </div>

              <div v-else>
                <b-form-group label="Select Student">
                  <b-form-select v-model="form.student_id" class="mb-3">
                    <b-form-select-option
                      v-for="student in user.guardian.students"
                      :key="student.id"
                      :value="student.id"
                      >{{ student.first_name }}
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </div>
            </b-col>

            <b-button
              type="submit"
              variant="danger"
              size="lg"
              style="height: 3.85rem; margin-top: 2.85rem"
              >Submit</b-button
            >
          </b-row>
        </b-form>
      </b-card>

      <div v-show="timetableDropdownClass" class="libarian__wrapper">
        <ExamSingleStudentResult
          :klase-results="klaseResults"
          :student-exam-result="studentExamResult"
          :student-mark-result="studentMarkResult"
          :student="[form.class, form.term, form.session, form.student_id]"
        />
      </div>
    </template>
  </div>
</template>

<script>
import {
  EXAM_RECORD_QUERIES,
  STUDENT_EXAM_RESULT_QUERIES,
} from '~/graphql/examRecord/queries'
import { USER_GUARDIAN_QUERY } from '~/graphql/guardians/queries'
import { KLASES_QUERIES } from '~/graphql/klases/queries'
import {
  SESSION_QUERIES,
  STUDENT_MARK_RESULT_QUERIES,
  TERM_QUERIES,
} from '~/graphql/marks/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      k: null,
      klaseResults: [],
      studentExamResult: [],
      studentMarkResult: [],
      user: [],
      timetableDropdownClass: false,
      form: {
        class: null,
        session: null,
        term: null,
        student_id: null,
      },

      dynamicClass: '',
      activeTab: '',
      registerMenu: false,
      registrationMenuClass: '',
    }
  },
  apollo: {
    klases: {
      query: KLASES_QUERIES,
    },
    terms: {
      query: TERM_QUERIES,
    },
    sessions: {
      query: SESSION_QUERIES,
    },
    user: {
      query: USER_GUARDIAN_QUERY,
      variables() {
        return {
          id: parseInt(this.$auth.user.id),
        }
      },
    },
  },
  methods: {
    dynamicStudentClass(item) {
      this.dynamicClass = item
    },
    markSubmit() {
      if (
        this.form.class === null ||
        this.form.term === null ||
        this.form.session === null
      ) {
        return false
      } else {
        this.timetableDropdownClass = true
      }

      setTimeout(() => {
        this.$apollo.addSmartQuery('klaseResults', {
          query: EXAM_RECORD_QUERIES,
          variables() {
            return {
              klase_id: parseInt(this.form.class),
              term_id: parseInt(this.form.term),
              session_id: parseInt(this.form.session),
            }
          },
          result({ loading, data }, key) {
            if (!loading) {
              this.klaseResults = data.klaseResults
            }
          },
        })
      }, 100)
      setTimeout(() => {
        this.$apollo.addSmartQuery('studentExamResult', {
          query: STUDENT_EXAM_RESULT_QUERIES,
          variables() {
            return {
              klase_id: parseInt(this.form.class),
              student_id: parseInt(this.form.student_id),
              term_id: parseInt(this.form.term),
              session_id: parseInt(this.form.session),
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
              klase_id: parseInt(this.form.class),
              student_id: parseInt(this.form.student_id),
              term_id: parseInt(this.form.term),
              session_id: parseInt(this.form.session),
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
  },
}
</script>

<style lang="scss">
.view-payment {
  font-size: 1.6rem;

  .custom-select:focus {
    box-shadow: none;
  }

  .custom-select,
  .form-control,
  .mb-3 {
    height: 4rem;
    font-size: 1.4rem;
    color: #000;
  }

  .libarian__wrapper {
    padding: 2rem;
    font-size: 1.4rem;
    background-color: var(--color-white);
    border-radius: 0.5rem;
    border: none;

    .nav-link.active {
      border-top: 5px solid limegreen;
    }

    .menu {
      ul {
        z-index: 999;
        position: absolute;
        border: none;
        top: -3.5rem;
        left: 14.2rem;
        background-color: #fff;
      }

      li:not(:last-child) {
        background-color: #fff;
        padding: 1rem 4.8rem;
        border-bottom: 1px solid gray;
        cursor: pointer;

        &:hover {
          background-color: var(--color-input);
        }
      }
    }
  }
}
</style>
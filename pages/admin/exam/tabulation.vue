<template>
  <div class="p-4 view-payment">
    <template v-if="!klases && !terms && !sessions">
      <div style="background-color: #f1f9ae; width: 100%; height: 100vh">
        <div class="grow">
          <b-spinner
            style="width: 30rem; height: 30rem"
            type="grow"
            variant="danger"
          ></b-spinner>
        </div></div
    ></template>
    <template v-else>
      <b-card class="p-3 mb-4 d-flex">
        <b-form @submit.prevent="markSubmit">
          <b-row no-gutters>
            <b-col md="3">
              <b-form-group label="Clases">
                <b-form-select
                  id="klases"
                  value-field="id"
                  text-field="name"
                  v-model="form.class"
                  :options="klases"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- select class--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="3">
              <b-form-group label="Terms">
                <b-form-select
                  id="terms"
                  value-field="id"
                  text-field="name"
                  v-model="form.term"
                  :options="terms"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- select term--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="3">
              <b-form-group label="Session">
                <b-form-select
                  id="sessions"
                  value-field="id"
                  text-field="name"
                  v-model="form.session"
                  :options="sessions"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- select session--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

          <b-button type="submit" variant="danger">Submit</b-button>
        </b-form>
      </b-card>

      <div class="libarian__wrapper" v-show="timetableDropdownClass">
        <ExamTabulation
          :records="records"
          :examRecords="examRecords"
          :term="form.term"
        />
      </div>
    </template>
  </div>
</template>

<script>
import {
  EXAM_RECORDS_QUERIES,
  EXAM_RECORD_QUERIES,
} from '~/graphql/examRecord/queries'
import { KLASES_QUERIES } from '~/graphql/klases/queries'
import { SESSION_QUERIES, TERM_QUERIES } from '~/graphql/marks/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      records: [],
      examRecords: [],
      timetableDropdownClass: true,
      form: {
        class: null,
        session: null,
        term: null,
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
              this.records = data.klaseResults
            }
          },
        })
      }, 100)
      setTimeout(() => {
        this.$apollo.addSmartQuery('examRecords', {
          query: EXAM_RECORDS_QUERIES,
          variables() {
            return {
              klase_id: parseInt(this.form.class),
              session_id: parseInt(this.form.term),
            }
          },
          result({ loading, data }, key) {
            if (!loading) {
              this.examRecords = data.examRecords
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
  .grow {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
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
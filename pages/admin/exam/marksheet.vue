<template>
  <div class="p-4 view-payment">
    <template v-if="!klases && !terms && !subjects && !sessions">
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
          <b-row>
            <b-col md="2">
              <b-form-group label="Classes">
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
                      >-- Select class --</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
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
                      >-- Select term--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
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
                      >-- Select session--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
              <b-form-group label="Subject">
                <b-form-select
                  id="subject"
                  value-field="id"
                  text-field="subject"
                  v-model="form.subject"
                  :options="subjects"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- Select subject--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-button
              type="submit"
              variant="danger"
              size="lg"
              style="height: 3.8rem; margin-top: 2.83rem"
              >Submit</b-button
            >
          </b-row>
        </b-form>
      </b-card>

      <div class="libarian__wrapper" v-show="timetableDropdownClass">
        <ExamEditExamScores
          :marks="marks"
          :student="[form.class, form.subject, form.term, form.session]"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { KLASES_QUERIES } from '~/graphql/klases/queries'
import { CREATE_FIELD_MUTATION } from '~/graphql/marks/mutations'
import {
  MARK_QUERIES,
  SESSION_QUERIES,
  TERM_QUERIES,
} from '~/graphql/marks/queries'
import { SUBJECTS_QUERIES } from '~/graphql/subjects/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      marks: [],
      timetableDropdownClass: false,
      form: {
        class: null,
        subject: null,
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
    subjects: {
      query: SUBJECTS_QUERIES,
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
      this.$apollo
        .mutate({
          mutation: CREATE_FIELD_MUTATION,
          variables: {
            klase: parseInt(this.form.class),
            subject: parseInt(this.form.subject),
            session: parseInt(this.form.session),
            term: parseInt(this.form.term),
          },
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          err
        })

      setTimeout(() => {
        this.$apollo.addSmartQuery('marks', {
          query: MARK_QUERIES,
          variables: {
            klase_id: parseInt(this.form.class),
            subject_id: parseInt(this.form.subject),
            session_id: parseInt(this.form.session),
            term_id: parseInt(this.form.term),
          },
          result({ loading, data }, key) {
            if (!loading) {
              this.marks = data.marks
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
  .custom-select {
    option {
      font-size: 1.5rem !important;
    }
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
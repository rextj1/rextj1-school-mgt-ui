<template>
  <div class="p-4 view-payment">
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

          <b-col md="3">
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
                    >-- select subject--</b-form-select-option
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
      <ExamEditExamScores />
    </div>
  </div>
</template>

<script>
import { KLASES_QUERIES } from '~/graphql/klases/queries'
import { CREATE_FIELD_MUTATION } from '~/graphql/marks/mutations'
import { SESSION_QUERIES, TERM_QUERIES } from '~/graphql/marks/queries'
import { SUBJECTS_QUERIES } from '~/graphql/subjects/queries'
export default {
  data() {
    return {
      timetableDropdownClass: true,
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
    sessions: SESSION_QUERIES,
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
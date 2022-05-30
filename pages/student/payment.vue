<template>
  <div class="p-4 view-payment">
    <div v-if="!terms && !sessions"></div>
    <div v-else>
      <b-card class="p-3 mb-4 d-flex">
        <b-form @submit.prevent="markSubmit">
          <b-row>
            <b-col md="4">
              <b-form-group label="Terms">
                <b-form-select
                  id="terms"
                  v-model="form.term"
                  value-field="id"
                  text-field="name"
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

            <b-col md="4">
              <b-form-group label="Session">
                <b-form-select
                  id="sessions"
                  v-model="form.session"
                  value-field="id"
                  text-field="name"
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

      <div v-show="timetableDropdownClass" class="libarian__wrapper">
        <PaymentStudentFeePayment
          :marks="marks"
          :student="[form.term, form.session]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { CREATE_FIELD_MUTATION } from '~/graphql/marks/mutations'
import { SESSION_QUERIES, TERM_QUERIES } from '~/graphql/marks/queries'
import { STUDENT_PAYMENT_RECORD_QUERIES } from '~/graphql/payments/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      marks: [],
      timetableDropdownClass: true,
      form: {
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
            session: parseInt(this.form.session),
            term: parseInt(this.form.term),
          },
        })
        .then(({ data }) => {})
        .catch((err) => {
          err
        })

      setTimeout(() => {
        this.$apollo.addSmartQuery('marks', {
          query: STUDENT_PAYMENT_RECORD_QUERIES,
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
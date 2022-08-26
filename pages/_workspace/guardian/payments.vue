<template>
  <div class="p-4 view-payment">
    <div v-if="nowLoading"><Preload /></div>
    <div v-else>
      <b-card class="p-3 mb-4 d-flex">
        <b-form @submit.prevent="onSubmit">
          <b-row>
            <b-col md="3">
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

            <b-col md="3">
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

            <b-col md="3">
              <div v-if="!user">
                <b-form-group label="Select Student">
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
              variant="primary"
              size="lg"
              style="height: 3.8rem; margin-top: 2.83rem"
              >
              <b-spinner
              v-if="isBusy"
              class="mr-1 mb-1"
              small
              variant="light"
              />
              Submit</b-button>
          </b-row>
        </b-form>
      </b-card>

      <div v-show="timetableDropdownClass" class="libarian__wrapper">
        <PaymentStudentPaymentRecords
          :PaidPaymentrecords="PaidPaymentrecords"
          :DuePaymentrecords="DuePaymentrecords"
          :student="[form.term, form.session]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { CREATE_FIELD_MUTATION } from '~/graphql/marks/mutations'
import { TERM_QUERIES } from '~/graphql/marks/queries'
import { STUDENT_PAYMENT_RECORD_QUERIES } from '~/graphql/payments/queries'
import { SESSION_QUERIES } from '~/graphql/sessions/queries'
import { USER_GUARDIAN_QUERY } from '~/graphql/guardians/queries'

export default {
  middleware: 'auth',
  data() {
    return {
      PaidPaymentrecords: null,
      DuePaymentrecords: null,
      studentPaymentRecords: {},
      timetableDropdownClass: true,
      isBusy: false,
      form: {
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
    terms: {
      query: TERM_QUERIES,
    },
    sessions: {
      query: SESSION_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
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
  computed: {
    nowLoading() {
      return (
        this.$apollo.queries.terms.loading &&
        this.$apollo.queries.sessions.loading
      )
    },
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  methods: {
    dynamicStudentClass(item) {
      this.dynamicClass = item
    },
    onSubmit() {
      if (
        this.form.term === null ||
        this.form.session === null ||
        this.form.student_id === null
      ) {
        return false
      } else {
       
      
      this.isBusy = true
       this.timetableDropdownClass = false
      this.$apollo.addSmartQuery('studentPaymentRecords', {
        query: STUDENT_PAYMENT_RECORD_QUERIES,
        variables: {
          student_id: parseInt(this.form.student_id),
          session_id: parseInt(this.form.session),
          term_id: parseInt(this.form.term),
          workspaceId: parseInt(this.mainWorkspace.id),
          status: 'Due',
        },
        result({ loading, data }, key) {
          if (!loading) {
            console.log(data, 'due')
            this.DuePaymentrecords = data.studentPaymentRecords
          }
        },
      })

      this.$apollo.addSmartQuery('studentPaymentRecords', {
        query: STUDENT_PAYMENT_RECORD_QUERIES,
        variables: {
          student_id: parseInt(this.form.student_id),
          session_id: parseInt(this.form.session),
          term_id: parseInt(this.form.term),
          workspaceId: parseInt(this.mainWorkspace.id),
          status: 'Paid',
        },
        result({ loading, data }, key) {
          if (!loading) {
            console.log(data, 'paid')
            this.PaidPaymentrecords = data.studentPaymentRecords
            this.isBusy = false
             this.timetableDropdownClass = true
          }
        },
      })
      }
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

<template>
  <div class="p-4 view-payment">
    <div v-if="nowLoading"><Preload /></div>
    <div v-else>
      <b-card class="px-2 mb-4">
        <b-form @submit.prevent="onSubmit">
          <div class="d-flex">
            <div v-if="!user">
              <b-form-group label="Select Student">
                <b-form-select class="mb-3">
                  <b-form-select-option value="null"> </b-form-select-option>
                </b-form-select>
              </b-form-group>
            </div>

            <div v-else>
              <b-form-group label="Select Student">
                <b-form-select
                  v-model="form.student_id"
                  class="mb-3 option-width"
                >
                  <b-form-select-option
                    v-for="student in user.guardian.students"
                    :key="student.id"
                    :value="student.id"
                    >{{ student.last_name }} {{ student.first_name }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
            </div>

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
              Submit</b-button
            >
          </div>
        </b-form>
      </b-card>

      <div v-show="timetableDropdownClass">
        <PaymentGuardianPaymentRecords
          v-if="DuePaymentrecords || PaidPaymentrecords"
          :PaidPaymentrecords="PaidPaymentrecords"
          :DuePaymentrecords="DuePaymentrecords"
          :email="user.guardian.email"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
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
      if (this.form.student_id === null) {
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

  .option-width {
    width: 35rem;

    @include media-breakpoint-down(sm) {
      width: 25rem;
    }
  }

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
}
</style>

<template>
  <div class="payment-fonts">
    <template v-if="$apollo.queries.studentPaymentRecord.loading"
      ><Preload
    /></template>
    <template v-else>
      <b-row no-gutters>
        <b-col md="12">
          <div class="card-body">
            <div class="card-student" style="background-color: #fff">
              <div style="padding: 5rem; margin: auto; min-height: 100vh">
                <!-- {{ studentPaymentRecord }} -->

                <div class="mt-4">
                  <div class="text-center mb-4">
                    <b-img
                      src="@/assets/svg/ronazon-logo.svg"
                      width="100"
                    ></b-img>
                  </div>

                  <h1
                    class="text-center"
                    style="color: #1c0988; font-weight: bold"
                  >
                    {{ mainWorkspace.name }}
                  </h1>
                  <h4
                    class="text-center"
                    style="
                      text-transform: uppercase;
                      color: #1c0988;
                      font-weight: bold;
                      margin-bottom: 5rem;
                    "
                  >
                    {{ studentPaymentRecord.term.name }} Payment Receipt ({{
                      studentPaymentRecord.session.name
                    }}
                    Session)
                  </h4>
                </div>

                <div
                  class="d-flex justify-content-align mt-2 p-3"
                  style="background-color: #007bff; color: #fff"
                >
                  STUDENT INFORMATION
                </div>

                <div class="d-flex justify-content-center">
                  <b-img
                    class="mt-3"
                    thumbnail
                    src="@/assets/images/teacher.jpeg"
                    width="100"
                  ></b-img>
                </div>

                <div class="d-flex justify-content-between mt-5">
                  <div>
                    <h4>FULL NAME:</h4>
                    <h4>ADM_NO:</h4>
                    <h4>CLASS:</h4>
                  </div>

                  <div style="text-transform: uppercase">
                    <h4>
                      {{ studentPaymentRecord.student.first_name }}
                      {{ studentPaymentRecord.student.last_name }}
                      {{ studentPaymentRecord.student.middle_name }}
                    </h4>
                    <h4>
                      {{ studentPaymentRecord.student.adm_no }}
                    </h4>
                    <h4>{{ studentPaymentRecord.student.last_name }}</h4>
                    <h4>{{ studentPaymentRecord.klase.name }}</h4>
                  </div>
                </div>

                <h3
                  class="d-flex justify-content-align mt-4 p-3"
                  style="background-color: #007bff; color: #fff"
                >
                  PAYMENT INFORMATION
                </h3>
                <div class="d-flex justify-content-between mt-4">
                  <div>
                    <h4>TITLE:</h4>

                    <h4>REFERENCE:</h4>

                    <h4>Amount</h4>

                    <h4>Amount Paid:</h4>

                    <h4>Balance</h4>
                    <h4>Payment Date</h4>
                  </div>

                  <div style="margin-left: 3rem">
                    <h4>{{ studentPaymentRecord.title }}</h4>
                    <h4>{{ studentPaymentRecord.ref_no }}</h4>
                    <h4>
                      <span>&#x20A6;</span>{{ studentPaymentRecord.amount }}
                    </h4>
                    <h4>
                      <span>&#x20A6;</span>{{ studentPaymentRecord.amt_paid }}
                    </h4>
                    <h4>
                      <span>&#x20A6;</span>{{ studentPaymentRecord.balance }}
                    </h4>
                    <h4>{{ studentPaymentRecord.created_at | formatDate }}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { STUDENT_PAYMENT_RECORD_QUERY } from '~/graphql/payments/queries'
export default {
  middleware: 'auth',
  filters: {
    formatDate(value) {
      const date = moment.utc(value).local()
      return date.format('D MMM YYYY')
    },
  },
  data() {
    return {
      form: new this.$form({
        amount: null,
      }),
    }
  },
  // pk_test_d5fd91ddaacfe58b24ad1d30afa93df737aff214
  computed: {
    ...mapState(useWorkspaceStore, ['currentWorkspace']),
    mainWorkspace() {
      return this.currentWorkspace
    },
    studentId() {
      return this.$route.query.student_id
    },

    sessionId() {
      return this.$route.query.session_id
    },
    termId() {
      return this.$route.query.term_id
    },
  },
  apollo: {
    studentPaymentRecord: {
      query: STUDENT_PAYMENT_RECORD_QUERY,
      variables() {
        return {
          student_id: parseInt(this.studentId),
          session_id: parseInt(this.sessionId),
          term_id: parseInt(this.termId),
          workspaceId: parseInt(this.mainWorkspace.id),
          status: 'Due',
        }
      },
    },
  },
}
</script>

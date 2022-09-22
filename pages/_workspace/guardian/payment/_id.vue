<template>
  <div class="payment-wrapper p-4">
    <template v-if="$apollo.queries.studentPaymentRecords.loading"
      ><Preload
    /></template>
    <template v-else>
      <b-row no-gutters>
        <b-col md="12">
          <div class="card-body">
            <div class="card-student" style="background-color: #fff">
              <div style="padding: 5rem; margin: auto; min-height: 100vh">
                <!-- {{ studentPaymentRecords }} -->

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
                    {{ studentPaymentRecords.term.name }} Payment Receipt ({{
                      studentPaymentRecords.session.name
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
                      {{ studentPaymentRecords.student.first_name }}
                      {{ studentPaymentRecords.student.last_name }}
                      {{ studentPaymentRecords.student.middle_name }}
                    </h4>
                    <h4>
                      {{ studentPaymentRecords.student.adm_no }}
                    </h4>
                    <h4>{{ studentPaymentRecords.student.last_name }}</h4>
                    <h4>{{ studentPaymentRecords.klase.name }}</h4>
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
                    <h4>{{ studentPaymentRecords.title }}</h4>
                    <h4>{{ studentPaymentRecords.ref_no }}</h4>
                    <h4>
                      <span>&#x20A6;</span>{{ studentPaymentRecords.amount }}
                    </h4>
                    <h4>
                      <span>&#x20A6;</span>{{ studentPaymentRecords.amt_paid }}
                    </h4>
                    <h4>
                      <span>&#x20A6;</span>{{ studentPaymentRecords.balance }}
                    </h4>
                    <h4>{{ studentPaymentRecords.created_at | formatDate }}</h4>
                  </div>
                </div>
                <hr />

                <section
                  v-if="studentPaymentRecords.balance > 0"
                  class="online-payment"
                >
                  <h2 class="text-center mt-2 p-3" style="">PAY WITH CARD</h2>

                  <div class="text-center image">
                    <b-img
                      src="@/assets/svg/visa.svg"
                      class="svg-image"
                    ></b-img>
                    <b-img
                      src="@/assets/svg/mastercard.svg"
                      class="svg-image"
                    ></b-img>
                  </div>

                  <div class="text-center mt-4">
                    <b-form
                      method="POST"
                      @submit.prevent="initializePaystack()"
                      @keydown="form.onKeydown($event)"
                      @reset.prevent="onReset"
                    >
                      <div class="d-flex">
                        <label class="p-2">Amount</label>
                        <b-form-input
                          id="amount"
                          v-model="form.amount"
                          value-field="id"
                          type="number"
                          placeholder="Enter amount..."
                          min="0"
                          style="height: 3rem; font-size: 1.8rem"
                          :max="`${studentPaymentRecords.amount}`"
                          class="mb-3"
                          size="lg"
                          required
                        >
                        </b-form-input>
                      </div>

                      <b-button
                        type="submit"
                        variant="warning"
                        size="lg"
                        style="
                          height: 3.8rem;
                          font-size: 1.8rem;
                          margin-top: 1.83rem;
                          width: 100%;
                          font-weight: bold;
                        "
                        >Pay Now</b-button
                      >
                    </b-form>
                  </div>
                </section>
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
import Swal from 'sweetalert2'
import { CREATE_STUDENT_PAYMENT_MUTATION } from '~/graphql/payments/mutations'
import { STUDENT_PAYMENT_RECORD_QUERIES } from '~/graphql/payments/queries'
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
    guardianEmail() {
      return this.$route.query.email
    },

    klaseId() {
      return this.$route.query.klase_id
    },
    sessionId() {
      return this.$route.query.session_id
    },
    termId() {
      return this.$route.query.term_id
    },
  },
  apollo: {
    studentPaymentRecords: {
      query: STUDENT_PAYMENT_RECORD_QUERIES,
      variables() {
        return {
          klase_id: parseInt(this.klaseId),
          student_id: parseInt(this.studentId),
          session_id: parseInt(this.sessionId),
          term_id: parseInt(this.termId),
          workspaceId: parseInt(this.mainWorkspace.id),
          status: 'Due',
        }
      },
    },
  },
  methods: {
    initializePaystack() {
      this.$paystack({
        key: this.mainWorkspace.paystack_secret_key,
        email: this.guardianEmail,
        amount: this.form.amount * 100,
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        currency: 'NGN',
        callback: () => {
          this.$apollo
            .mutate({
              mutation: CREATE_STUDENT_PAYMENT_MUTATION,
              variables: {
                student_id: parseInt(this.studentId),
                session_id: parseInt(this.sessionId),
                term_id: parseInt(this.termId),
                amt_paid: parseInt(this.form.amount),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
              update: (store, { data: { createPaymentRecord } }) => {
                // Read the data from our cache for this query.
                const data = store.readQuery({
                  query: STUDENT_PAYMENT_RECORD_QUERIES,
                  variables: {
                    klase_id: parseInt(this.klaseId),
                    student_id: parseInt(this.studentId),
                    session_id: parseInt(this.sessionId),
                    term_id: parseInt(this.termId),
                    workspaceId: parseInt(this.mainWorkspace.id),
                    status: 'Due',
                  },
                })

                data.paymentRecords = createPaymentRecord

                store.writeQuery({
                  query: STUDENT_PAYMENT_RECORD_QUERIES,
                  variables: {
                    klase_id: parseInt(this.klaseId),
                    student_id: parseInt(this.studentId),
                    session_id: parseInt(this.sessionId),
                    term_id: parseInt(this.termId),
                    workspaceId: parseInt(this.mainWorkspace.id),
                    status: 'Due',
                  },
                  data,
                })
              },
            })
            .then(() => {
              Swal.fire({
                timer: 1500,
                icon: 'success',
                text: 'School Fee upadted successfully',
                position: 'center',
                color: '#fff',
                background: '#4bb543',
                toast: false,
                backdrop: false,
                showConfirmButton: false,
              })
            })
        },
        onClose: () => {
          this.$router.push('')
        },
      })
    },
  },
}
</script>

<style lang="scss">
.payment-wrapper {
  font-size: 1.4rem !important;

  .online-payment {
    width: 40%;
    margin: 0 auto;

    & .image {
      width: 100%;
      margin-bottom:2rem;
      .svg-image {
        width: 10rem;
      }
    }
  }
}
</style>

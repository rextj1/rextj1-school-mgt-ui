<template>
  <div class="payment-wrapper p-4">
    <template v-if="$apollo.queries.studentPaymentRecord.loading"
      ><Preload
    /></template>
    <template v-else>
      <b-button
        v-if="
          mainWorkspace.bank != '' ||
          mainWorkspace.account_no != '' ||
          mainWorkspace.account_name != ''
        "
        class="shadow-sm mb-3"
        variant="primary"
        size="lg"
        @click="handleBankDetails"
        >Click yet to see bank details</b-button
      >
      <b-card>
        <div style="padding: 5rem; margin: auto; min-height: 100vh">
          <div class="mt-4">
            <div class="text-center mb-4">
              <b-img src="@/assets/svg/ronazon-logo.svg" width="100"></b-img>
            </div>

            <h1 class="text-center" style="color: #1c0988; font-weight: bold">
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
              <h4><span>&#x20A6;</span>{{ studentPaymentRecord.amount }}</h4>
              <h4><span>&#x20A6;</span>{{ studentPaymentRecord.amt_paid }}</h4>
              <h4><span>&#x20A6;</span>{{ studentPaymentRecord.balance }}</h4>
              <h4>{{ studentPaymentRecord.created_at | formatDate }}</h4>
            </div>
          </div>
          <hr />

          <section
            v-if="studentPaymentRecord.balance > 0"
            class="online-payment"
          >
            <h2 class="text-center mt-2 p-3" style="">PAY WITH CARD</h2>

            <div class="d-flex justify-content-center image">
              <b-img src="@/assets/svg/visa.svg" class="svg-image"></b-img>
              <b-img
                src="@/assets/svg/mastercard.svg"
                class="svg-image"
              ></b-img>
            </div>

            <div class="text-center form-wrapper">
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
                    style="height: 3.3rem; font-size: 1.8rem"
                    :max="`${studentPaymentRecord.amount}`"
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
                    height: 3.6rem;
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

        <!-- change password modal -->
        <b-modal id="bankDetails" size="md" centered hide-footer>
          <div class="p-2">
            <h3 class="text-center mb-5">
              <span style="color: green">Bank Details</span>
            </h3>
            <div class="d-flex justify-content-between p-4">
              <div>
                <h4>Account Name</h4>
                <h4>Account Number</h4>
                <h4>Bank</h4>
              </div>

              <div style="font-weight: bold">
                <h4>{{ mainWorkspace.account_name }}</h4>
                <h4>{{ mainWorkspace.account_no }}</h4>
                <h4>{{ mainWorkspace.bank }}</h4>
              </div>
            </div>
          </div>
        </b-modal>
      </b-card>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { CREATE_STUDENT_PAYMENT_MUTATION } from '~/graphql/payments/mutations'
import { STUDENT_PAYMENT_RECORD_QUERY } from '~/graphql/payments/queries'
import Preload from '~/components/Preload.vue'

export default {
  components: {Preload},
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
    studentPaymentRecord: {
      query: STUDENT_PAYMENT_RECORD_QUERY,
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
    handleBankDetails() {
      this.$bvModal.show('bankDetails')
    },
    handleCancel() {
      this.$bvModal.hide('bankDetails')
    },
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
                  query: STUDENT_PAYMENT_RECORD_QUERY,
                  variables: {
                    klase_id: parseInt(this.klaseId),
                    student_id: parseInt(this.studentId),
                    session_id: parseInt(this.sessionId),
                    term_id: parseInt(this.termId),
                    workspaceId: parseInt(this.mainWorkspace.id),
                    status: 'Due',
                  },
                })

                data.paymentRecord = createPaymentRecord

                store.writeQuery({
                  query: STUDENT_PAYMENT_RECORD_QUERY,
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
    @include media-breakpoint-up(md) {
      width: 40%;
    }
    @include media-breakpoint-down(xm) {
      width: 73%;
    }

    & .image {
      width: 100%;
      margin-bottom: 2rem;
      .svg-image {
        width: 10rem;
      }
    }
    .form-wrapper {
      margin-top: 5rem;
    }
  }
}
</style>

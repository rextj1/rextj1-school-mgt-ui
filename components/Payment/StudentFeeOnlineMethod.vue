<template>
  <div class="online-payment">
    <b-row no-gutters>
      <b-col md="12">
        <div class="card-body">
          <div class="card-student p-3" style="background-color: #fff">
            <h2 class="d-flex justify-content-center mb-4 mt-4">
              Confirm Student Fee
            </h2>
            <hr />

            <button @click="initializePaystack()">Pay with Paystack</button>

            <!-- table -->
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { CREATE_STUDENT_PAYMENT_MUTATION } from '~/graphql/payments/mutations'
import { PAID_PAYMENT_RECORD_QUERIES } from '~/graphql/payments/queries'
export default {
  props: {
    studentPaymentRecords: Object,
    student: Array,
  },
  data() {
    return {
      form: {
        amount: 600000,
      },
    }
  },
  // pk_test_d5fd91ddaacfe58b24ad1d30afa93df737aff214
  computed: {
    ...mapState(useWorkspaceStore, ['currentWorkspace']),
    mainWorkspace() {
      return this.currentWorkspace
    },
  },
  methods: {
    initializePaystack() {
      this.$paystack({
        key: this.mainWorkspace.paystack_secret_key,
        email: 'tojufutughe@gmail.com',
        amount: this.form.amount,
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        currency: 'NGN',
        callback: () => {
          this.$apollo
            .mutate({
              mutation: CREATE_STUDENT_PAYMENT_MUTATION,
              variables: {
                student_id: parseInt(student[2]),
                term_id: parseInt(student[0]),
                session_id: parseInt(student[1]),
                amt_paid: parseInt(this.form.amount),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
              update: (store, { data: { createPaymentRecord } }) => {
                // Read the data from our cache for this query.
                const data = store.readQuery({
                  query: PAID_PAYMENT_RECORD_QUERIES,
                  variables: {
                    klase_id: parseInt(this.student[0]),
                    session_id: parseInt(this.student[2]),
                    term_id: parseInt(this.student[1]),
                    workspaceId: parseInt(this.mainWorkspace.id),
                  },
                })

                data.paymentRecords = data.paymentRecords.filter((t) => {
                  return t.status === 'Due'
                })

                store.writeQuery({
                  query: PAYMENT_RECORD_QUERIES,
                  variables: {
                    klase_id: parseInt(this.student[3]),
                    session_id: parseInt(this.student[1]),
                    term_id: parseInt(this.student[0]),
                    workspaceId: parseInt(this.mainWorkspace.id),
                  },
                  data,
                })
              },
            })
            .then(({ data }) => {
              this.$router.push('/student/profile')
            })
        },
        onClose: () => {
          this.$router.push('/student/profile')
        },
      })
    },
  },
}
</script>

<style lang="scss">
.online-payment {
  padding: 20px;

  .card-body {
    padding: 0;
    .card-student {
      border: none;
      border-radius: 5px;
      height: auto;

      .input-group > .input-group-append > .btn,
      .input-group > .input-group-append > .input-group-text {
        background: var(--color-primary);
        color: #fff;
        font-size: 10px;
      }
      .input-group:not(.has-validation) > .custom-select:not(:last-child),
      .input-group > .form-control:not(:first-child),
      .input-group > .custom-select:not(:first-child),
      .custom-select {
        height: 32px;
        font-size: 12px;
      }
      .form-control,
      .mb-3 {
        height: 32px;
        font-size: 12px;
      }
    }
  }
}
</style>

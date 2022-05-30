  <template>
  <div class="fonts">
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
import Swal from 'sweetalert2'
import { CREATE_STUDENT_PAYMENT_MUTATION } from '~/graphql/payments/mutations'
export default {
  props: {
    CurrentClass: String,
  },
  data() {
    return {
      form: {
        amount: 600000,
      },
    }
  },
  methods: {
    initializePaystack() {
      this.$paystack({
        key: 'pk_test_d5fd91ddaacfe58b24ad1d30afa93df737aff214',
        email: 'tojufutughe@gmail.com',
        amount: this.form.amount,
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        currency: 'NGN',
        callback: () => {
          this.$apollo
            .mutate({
              mutation: CREATE_STUDENT_PAYMENT_MUTATION,
              variables: {
                student_id: 1,
                term_id: 2,
                session_id: 1,
                amt_paid: parseInt(this.form.amount),
              },
              // update: (store, { data: { createPaymentRecord } }) => {
              //   // Read the data from our cache for this query.
              //   const data = store.readQuery({
              //     query: PAYMENT_RECORD_QUERIES,
              //     variables: {
              //       klase_id: parseInt(this.student[0]),
              //       session_id: parseInt(this.student[2]),
              //       term_id: parseInt(this.student[1]),
              //     },
              //   })

              //   data.paymentRecords = data.paymentRecords.filter((t) => {
              //     return t.status === 'Due'
              //   })

              //   store.writeQuery({
              //     query: PAYMENT_RECORD_QUERIES,
              //     variables: {
              //       klase_id: parseInt(this.student[0]),
              //       session_id: parseInt(this.student[2]),
              //       term_id: parseInt(this.student[1]),
              //     },
              //     data,
              //   })
              // },
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
.fonts {
  font-size: 1.4rem !important;
  padding: 2rem;

  .add-student {
    font-size: 1.6rem;
    box-shadow: 0 5px 5px 0 #1f64b367;
  }
  .card-body {
    padding: 0;
    .card-student {
      border: none;
      border-radius: 0.5rem;
      height: auto;

      .input-group > .input-group-append > .btn,
      .input-group > .input-group-append > .input-group-text {
        background: var(--color-primary);
        color: #fff;
        font-size: 1rem;
      }
      .input-group:not(.has-validation) > .custom-select:not(:last-child),
      .input-group > .form-control:not(:first-child),
      .input-group > .custom-select:not(:first-child),
      .custom-select {
        height: 3.2rem;
        font-size: 1.2rem;
      }
      .form-control,
      .mb-3 {
        height: 3.2rem;
        font-size: 1.2rem;
      }
    }
  }
}
</style>



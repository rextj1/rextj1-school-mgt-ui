<template>
  <div class="p-3 view-payment">
     <template v-if="$fetchState.pending"><Preload /></template>
    <template v-else>
      <PaymentStudentPaymentRecords
        v-if="DuePaymentrecords"
        :PaidPaymentrecords="PaidPaymentrecords"
        :DuePaymentrecords="DuePaymentrecords"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { STUDENT_PAID_PAYMENT_RECORD_QUERIES, STUDENT_PAYMENT_RECORD_QUERIES } from '~/graphql/payments/queries'
import { USER_STUDENT_QUERY } from '~/graphql/students/queries'
import PaymentStudentPaymentRecords from '~/components/Payment/StudentPaymentRecords.vue'
import Preload from '~/components/Preload.vue'
export default {
  components: { PaymentStudentPaymentRecords, Preload },
  middleware: 'auth',
  data() {
    return {
      PaidPaymentrecords: [],
      DuePaymentrecords: null,
      studentPaymentRecords: [],
      studentPaidPaymentRecords: [],
      user: {}
    }
  },
  async fetch() {
    const { app, route, redirect } = this.$nuxt.context

    const {
      apolloProvider: { defaultClient: apolloClient },
    } = app

    const {
      data: { user },
    } = await apolloClient.query({
      query: USER_STUDENT_QUERY,
      variables: { id: parseInt(this.$auth.user.id) },
    })
    this.user = user

    const {
      data: { studentPaymentRecords },
    } = await apolloClient.query({
      query: STUDENT_PAYMENT_RECORD_QUERIES,
      variables: {
        student_id: parseInt(user.student.id),
        status: 'Due',
        workspaceId: parseInt(this.mainWorkspace.id),
      },
    })
    this.DuePaymentrecords = studentPaymentRecords

    const {
      data: { studentPaidPaymentRecords },
    } = await apolloClient.query({
      query: STUDENT_PAID_PAYMENT_RECORD_QUERIES,
      variables: {
        student_id: parseInt(user.student.id),
        status: 'Paid',
        workspaceId: parseInt(this.mainWorkspace.id),
      },
    })
    this.PaidPaymentrecords = studentPaidPaymentRecords
  },
  fetchDelay: 1000,

  computed: {
    student() {
      return this.user.student.id
    },
    nowLoading() {
      return this.$apollo.queries.user.loading
    },
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
}
</script>
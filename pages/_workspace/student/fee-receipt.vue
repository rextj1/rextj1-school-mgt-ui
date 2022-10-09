<template>
  <div class="p-4">
    <template v-if="nowLoading"><Preload /></template>
    <template v-else>
      <PaymentStudentPaymentReceipt
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
import { STUDENT_PAYMENT_RECORD_QUERIES } from '~/graphql/payments/queries'
import { USER_STUDENT_QUERY } from '~/graphql/students/queries'

export default {
  middleware: 'auth',
  data() {
    return {
      PaidPaymentrecords: [],
      DuePaymentrecords: null,
      studentPaymentRecords: [],
    }
  },

  beforeUpdate() {
    this.$apollo.addSmartQuery('studentPaymentRecords', {
      query: STUDENT_PAYMENT_RECORD_QUERIES,
      variables: {
        student_id: parseInt(this.user.student.id),
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
        student_id: parseInt(this.user.student.id),
        workspaceId: parseInt(this.mainWorkspace.id),
        status: 'Paid',
      },
      result({ loading, data }, key) {
        if (!loading) {
          this.PaidPaymentrecords = data.studentPaymentRecords
        }
      },
    })
  },

  apollo: {
    user: {
      query: USER_STUDENT_QUERY,
      variables() {
        return {
          id: parseInt(this.$auth.user.id),
        }
      },
    },
  },
  computed: {
    nowLoading() {
      return this.$apollo.queries.user.loading
    },
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
}
</script>

<style lang="scss" scoped></style>

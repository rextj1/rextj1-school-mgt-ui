<template>
  <div class="p-4 view-payment">
    <div v-if="nowLoading"><Preload /></div>
    <div v-else>
      <PaymentStudentPaymentRecords
        v-if="DuePaymentrecords || PaidPaymentrecords"
        :PaidPaymentrecords="PaidPaymentrecords"
        :DuePaymentrecords="DuePaymentrecords"
      />
    </div>
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
      PaidPaymentrecords: null,
      DuePaymentrecords: null,
      studentPaymentRecords: {},
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
}
</style>

<template>
  <div class="p-4 view-payment">
    <div v-if="nowLoading"><Preload /></div>
    <div v-else>
      <div>
        <PaymentStudentPaymentReceipt
          v-if="PaidPaymentrecords"
          :PaidPaymentrecords="PaidPaymentrecords"
          :DuePaymentrecords="DuePaymentrecords"
        />
      </div>
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

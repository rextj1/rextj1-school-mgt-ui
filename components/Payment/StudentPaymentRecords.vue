<template>
  <div>
    <b-card no-body>
      <b-tabs card style="font-size: 1.4rem">
        <b-tab active>
          <template #title>
            <strong>Due Payment</strong>
          </template>
          <h3 v-if="DuePaymentrecords == null" class="text-center mt-4">
            No record found
          </h3>
          <div class="table-down" v-else>
            <b-table-simple hover responsive>
              <b-thead>
                <tr>
                  <b-th>Full Name</b-th>
                  <b-th>Ref No</b-th>
                  <b-th>class</b-th>
                  <b-th>term</b-th>
                  <b-th>Session</b-th>
                  <b-th>Amount</b-th>
                  <b-th>Amount Paid</b-th>
                  <b-th>Balance</b-th>
                  <b-th>Status</b-th>
                  <b-th>Receipt</b-th>
                  <b-th>Action</b-th>
                </tr>
              </b-thead>

              <tbody>
                <b-tr>
                  <b-td>
                    {{ DuePaymentrecords.student.first_name }}
                    {{ DuePaymentrecords.student.last_name }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecords.ref_no }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecords.klase.name }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecords.term.name }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecords.session.name }}
                  </b-td>
                  <b-td style="color: red">
                    {{ DuePaymentrecords.amount }}
                  </b-td>
                  <b-td style="color: green">
                    {{ DuePaymentrecords.amt_paid }}
                  </b-td>
                  <b-td style="color: red">
                    {{ DuePaymentrecords.balance }}
                  </b-td>
                  <b-td style="color: red">
                    {{ DuePaymentrecords.status }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecords.receipt }}
                  </b-td>
                  <b-td>
                    <b-button
                      variant="primary"
                      :to="{
                        name: 'workspace-student-payments-id',
                        params: {
                          workspace: mainWorkspace.slug,
                          id: DuePaymentrecords.id,
                        },
                        query: {
                          student_id: DuePaymentrecords.student.id,
                          term_id: DuePaymentrecords.term.id,
                          session_id: DuePaymentrecords.session.id,
                        },
                      }"
                      >Pay Now</b-button
                    >
                  </b-td>
                </b-tr>
              </tbody>
            </b-table-simple>
          </div>
        </b-tab>

        <b-tab>
          <template #title>
            <strong>Paid Payment</strong>
          </template>
          <h3 v-if="PaidPaymentrecords == null" class="text-center mt-4">
            No record found
          </h3>
          <div class="table-down" v-else>
            <b-table-simple hover responsive>
              <b-thead>
                <tr>
                  <b-th>Full Name</b-th>
                  <b-th>Ref No</b-th>
                  <b-th>class</b-th>
                  <b-th>term</b-th>
                  <b-th>Session</b-th>
                  <b-th>Amount</b-th>
                  <b-th>Amount Paid</b-th>
                  <b-th>Balance</b-th>
                  <b-th>Status</b-th>
                  <b-th>Receipt</b-th>
                  <b-th>Action</b-th>
                </tr>
              </b-thead>

              <tbody>
                <b-tr>
                  <b-td>
                    {{ PaidPaymentrecords.student.first_name }}
                    {{ PaidPaymentrecords.student.last_name }}
                  </b-td>
                  <b-td>
                    {{ PaidPaymentrecords.ref_no }}
                  </b-td>
                  <b-td>
                    {{ PaidPaymentrecords.klase.name }}
                  </b-td>
                  <b-td>
                    {{ PaidPaymentrecords.term.name }}
                  </b-td>
                  <b-td>
                    {{ PaidPaymentrecords.session.name }}
                  </b-td>
                  <b-td style="color: red">
                    {{ PaidPaymentrecords.amount }}
                  </b-td>
                  <b-td style="color: green">
                    {{ PaidPaymentrecords.amt_paid }}
                  </b-td>
                  <b-td style="color: red">
                    {{ PaidPaymentrecords.balance }}
                  </b-td>
                  <b-td style="color: red">
                    {{ PaidPaymentrecords.status }}
                  </b-td>
                  <b-td>
                    {{ PaidPaymentrecords.receipt }}
                  </b-td>
                </b-tr>
              </tbody>
            </b-table-simple>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
export default {
  props: {
    PaidPaymentrecords: {
      type: null,
      default: null,
    },
    DuePaymentrecords: {
      type: null,
      default: null,
    },
    email: {
      type: String,
      require: false,
    },
  },

  methods: {
    generateDueReport() {
      this.$refs.html2Pdf.generatePdf()
    },
    generatePaidReport() {
      this.$refs.html2Pdf1.generatePdf()
    },
  },
  computed: {
    ...mapState(useWorkspaceStore, ['currentWorkspace']),
    mainWorkspace() {
      return this.currentWorkspace
    },
  },
}
</script>

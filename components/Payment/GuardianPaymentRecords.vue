<template>
  <div>
    <b-card no-body>
      <b-tabs card style="font-size: 1.4rem">
        <b-tab active>
          <template #title>
            <strong>Due Payment</strong>
          </template>
          <h3 v-if="DuePaymentrecords.length == 0" class="text-center mt-4">
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
                <b-tr
                  v-for="DuePaymentrecord in DuePaymentrecords"
                  :key="DuePaymentrecord.id"
                >
                  <b-td>
                    {{ DuePaymentrecord.student.first_name }}
                    {{ DuePaymentrecord.student.last_name }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecord.ref_no }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecord.klase.name }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecord.term.name }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecord.session.name }}
                  </b-td>
                  <b-td style="color: red">
                    {{ DuePaymentrecord.amount }}
                  </b-td>
                  <b-td style="color: green">
                    {{ DuePaymentrecord.amt_paid }}
                  </b-td>
                  <b-td style="color: red">
                    {{ DuePaymentrecord.balance }}
                  </b-td>
                  <b-td style="color: red">
                    {{ DuePaymentrecord.status }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecord.receipt }}
                  </b-td>
                  <b-td>
                    <b-button
                      variant="primary"
                      :to="{
                        name: 'workspace-guardian-payment-id',
                        params: {
                          workspace: mainWorkspace.slug,
                          id: DuePaymentrecord.id,
                        },
                        query: {
                          student_id: DuePaymentrecord.student.id,
                          klase_id: DuePaymentrecord.klase.id,
                          term_id: DuePaymentrecord.term.id,
                          session_id: DuePaymentrecord.session.id,
                          email: email,
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
          <h3 v-if="PaidPaymentrecords.length == 0" class="text-center mt-4">
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
                <b-tr
                  v-for="PaidPaymentrecord in PaidPaymentrecords"
                  :key="PaidPaymentrecord.id"
                >
                  <b-td>
                    {{ PaidPaymentrecord.student.first_name }}
                    {{ PaidPaymentrecord.student.last_name }}
                  </b-td>
                  <b-td>
                    {{ PaidPaymentrecord.ref_no }}
                  </b-td>
                  <b-td>
                    {{ PaidPaymentrecord.klase.name }}
                  </b-td>
                  <b-td>
                    {{ PaidPaymentrecord.term.name }}
                  </b-td>
                  <b-td>
                    {{ PaidPaymentrecord.session.name }}
                  </b-td>
                  <b-td style="color: red">
                    {{ PaidPaymentrecord.amount }}
                  </b-td>
                  <b-td style="color: green">
                    {{ PaidPaymentrecord.amt_paid }}
                  </b-td>
                  <b-td style="color: red">
                    {{ PaidPaymentrecord.balance }}
                  </b-td>
                  <b-td style="color: red">
                    {{ PaidPaymentrecord.status }}
                  </b-td>
                  <b-td>
                    {{ PaidPaymentrecord.receipt }}
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
      default: [],
    },
    DuePaymentrecords: {
      type: Array,
      default: [],
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

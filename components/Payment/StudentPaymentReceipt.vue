<template>
  <div class="payment-receipt p-3" style="background-color: #fff">
    <b-card no-body>
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
              <b-td>
                <b-button
                  v-show="PaidPaymentrecords.amt_paid > 0"
                  size="smd"
                  class="px-3 ml-2"
                  @click.prevent="generatePaidReport"
                >
                  <b-icon class="ml-2" scale="1.5" icon="printer" />
                </b-button>

                <vue-html2pdf
                  ref="html2Pdf1"
                  :show-layout="true"
                  :float-layout="false"
                  :enable-download="false"
                  :preview-modal="true"
                  :paginate-elements-by-height="1400"
                  filename="Pdf"
                  :pdf-quality="2"
                  :manual-pagination="false"
                  pdf-format="a4"
                  pdf-orientation="landscape"
                  pdf-content-width=""
                >
                  <section slot="pdf-content">
                    <div
                      class="card-student display"
                      style="background-color: #fff"
                    >
                      <div
                        style="padding: 5rem; margin: auto; min-height: 100vh"
                      >
                        <!-- {{ PaidPaymentrecords }} -->

                        <div class="m-4">
                          <h1 align="center">{{ mainWorkspace.name }}</h1>
                          <h3 align="center">
                            {{ PaidPaymentrecords.term.name }} Payment Receipt
                          </h3>
                          <h3 align="center">
                            {{ PaidPaymentrecords.session.name }} Session
                          </h3>
                        </div>

                        <div
                          class="d-flex justify-content-align mt-2 p-3"
                          style="background-color: #007bff; color: #fff"
                        >
                          STUDENT INFORMATION
                        </div>

                        <div class="d-flex justify-content-center">
                          <b-img
                            thumbnail
                            src="@/assets/images/teacher.jpeg"
                            width="100"
                          ></b-img>
                        </div>

                        <div class="d-flex justify-content-between mt-4">
                          <div>
                            <h4>FULL NAME:</h4>
                            <h4>ADM_NO:</h4>
                            <h4>CLASS:</h4>
                          </div>

                          <div
                            style="margin-top: 1rem; text-transform: uppercase"
                          >
                            <h4>
                              {{ PaidPaymentrecords.student.first_name }}
                              {{ PaidPaymentrecords.student.last_name }}
                              {{ PaidPaymentrecords.student.middle_name }}
                            </h4>
                            <h4>
                              {{ PaidPaymentrecords.student.adm_no }}
                            </h4>
                            <h4>
                              {{ PaidPaymentrecords.student.last_name }}
                            </h4>
                            <h4>{{ PaidPaymentrecords.klase.name }}</h4>
                          </div>
                        </div>

                        <h3
                          class="d-flex justify-content-align mt-2 p-3"
                          style="background-color: #007bff; color: #fff"
                        >
                          PAYMENT INFORMATION
                        </h3>
                        <div class="d-flex justify-content-between">
                          <div>
                            <h4>TITLE:</h4>

                            <h4>REFERENCE:</h4>

                            <h4>Amount</h4>

                            <h4>Amount Paid:</h4>

                            <h4>Balance</h4>
                          </div>

                          <div style="margin-left: 3rem; margin-top: 1rem">
                            <h4>{{ PaidPaymentrecords.title }}</h4>
                            <h4>{{ PaidPaymentrecords.ref_no }}</h4>
                            <h4>
                              <span>&#x20A6;</span
                              >{{ PaidPaymentrecords.amount }}
                            </h4>
                            <h4>
                              <span>&#x20A6;</span
                              >{{ PaidPaymentrecords.amt_paid }}
                            </h4>
                            <h4>
                              <span>&#x20A6;</span
                              >{{ PaidPaymentrecords.balance }}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </vue-html2pdf>
              </b-td>
            </b-tr>
          </tbody>
        </b-table-simple>
      </div>
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

<style lang="scss" scoped>
.payment-receipt {
  .display {
    display: none;
  }
}
</style>

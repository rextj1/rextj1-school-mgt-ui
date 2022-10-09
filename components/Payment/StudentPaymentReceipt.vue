<template>
  <div class="payment-receipt p-3" style="background-color: #fff">
    <b-card no-body>
      <b-tabs card style="font-size: 1.4rem">
        <b-tab active>
          <template #title>
            <strong>Incomplate Payment</strong>
          </template>

          <h3 v-if="DuePaymentrecords == null" class="text-center mt-4">
            No record found
          </h3>

          <div class="table-down">
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
                  v-for="(DuePaymentrecord, index) in DuePaymentrecords"
                  :key="DuePaymentrecord.id"
                  v-show="DuePaymentrecord.amt_paid > 0"
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
                      v-show="DuePaymentrecord.amt_paid > 0"
                      size="smd"
                      class="px-3 ml-2"
                      @click.prevent="generateDueReport(index)"
                    >
                      <b-icon class="ml-2" scale="1.5" icon="printer" />
                    </b-button>

                    <vue-html2pdf
                      ref="html2Pdf"
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
                            style="
                              padding: 5rem;
                              margin: auto;
                              min-height: 100vh;
                            "
                          >
                            <!-- {{ PaidPaymentrecord }} -->

                            <div class="m-4">
                              <h1 align="center">{{ mainWorkspace.name }}</h1>
                              <h3 align="center">
                                {{ DuePaymentrecord.term.name }} Payment Receipt
                              </h3>
                              <h3 align="center">
                                {{ DuePaymentrecord.session.name }} Session
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
                                style="
                                  margin-top: 1rem;
                                  text-transform: uppercase;
                                "
                              >
                                <h4>
                                  {{ DuePaymentrecord.student.first_name }}
                                  {{ DuePaymentrecord.student.last_name }}
                                  {{ DuePaymentrecord.student.middle_name }}
                                </h4>
                                <h4>
                                  {{ DuePaymentrecord.student.adm_no }}
                                </h4>
                                <h4>
                                  {{ DuePaymentrecord.student.last_name }}
                                </h4>
                                <h4>{{ DuePaymentrecord.klase.name }}</h4>
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
                                <h4>{{ DuePaymentrecord.title }}</h4>
                                <h4>{{ DuePaymentrecord.ref_no }}</h4>
                                <h4>
                                  <span>&#x20A6;</span
                                  >{{ DuePaymentrecord.amount }}
                                </h4>
                                <h4>
                                  <span>&#x20A6;</span
                                  >{{ DuePaymentrecord.amt_paid }}
                                </h4>
                                <h4>
                                  <span>&#x20A6;</span
                                  >{{ DuePaymentrecord.balance }}
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
                  v-for="(PaidPaymentrecord, index) in PaidPaymentrecords"
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
                  <b-td>
                    <b-button
                      v-show="PaidPaymentrecord.amt_paid > 0"
                      size="smd"
                      class="px-3 ml-2"
                      @click.prevent="generatePaidReport(index)"
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
                            style="
                              padding: 5rem;
                              margin: auto;
                              min-height: 100vh;
                            "
                          >
                            <!-- {{ PaidPaymentrecord }} -->

                            <div class="m-4">
                              <h1 align="center">{{ mainWorkspace.name }}</h1>
                              <h3 align="center">
                                {{ PaidPaymentrecord.term.name }} Payment
                                Receipt
                              </h3>
                              <h3 align="center">
                                {{ PaidPaymentrecord.session.name }} Session
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
                                style="
                                  margin-top: 1rem;
                                  text-transform: uppercase;
                                "
                              >
                                <h4>
                                  {{ PaidPaymentrecord.student.first_name }}
                                  {{ PaidPaymentrecord.student.last_name }}
                                  {{ PaidPaymentrecord.student.middle_name }}
                                </h4>
                                <h4>
                                  {{ PaidPaymentrecord.student.adm_no }}
                                </h4>
                                <h4>
                                  {{ PaidPaymentrecord.student.last_name }}
                                </h4>
                                <h4>{{ PaidPaymentrecord.klase.name }}</h4>
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
                                <h4>{{ PaidPaymentrecord.title }}</h4>
                                <h4>{{ PaidPaymentrecord.ref_no }}</h4>
                                <h4>
                                  <span>&#x20A6;</span
                                  >{{ PaidPaymentrecord.amount }}
                                </h4>
                                <h4>
                                  <span>&#x20A6;</span
                                  >{{ PaidPaymentrecord.amt_paid }}
                                </h4>
                                <h4>
                                  <span>&#x20A6;</span
                                  >{{ PaidPaymentrecord.balance }}
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
      type: Array,
      required: false,
    },
    DuePaymentrecords: {
      type: null,
      required: false,
    },
  },

  methods: {
    generateDueReport(index) {
      this.$refs.html2Pdf[index].generatePdf()
    },
    generatePaidReport(index) {
      this.$refs.html2Pdf1[index].generatePdf()
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

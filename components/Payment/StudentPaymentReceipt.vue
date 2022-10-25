<template>
  <div class="payment-receipt">
    <b-card no-body style="border-radius: 6px">
      <b-tabs card>
        <b-tab active>
          <template #title>
            <strong>Incomplate Payment</strong>
          </template>

          <h5 v-if="DuePaymentrecords == null" class="text-center mt-4">
            No record found
          </h5>

          <div class="table-down">
            <b-table-simple hover responsive>
              <b-thead>
                <tr>
                  <b-th>S/N</b-th>
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
                    {{ index + 1 }}
                  </b-td>
                  <b-td>
                    {{ DuePaymentrecord.student.last_name }}
                    {{ DuePaymentrecord.student.first_name }}
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
                      <b-icon
                        class="ml-2"
                        scale="1.5"
                        icon="printer"
                        v-show="DuePaymentrecord.amt_paid > 0"
                        @click.prevent="generateDueReport(index)"
                      />

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
                              padding: 50px;
                              margin: auto;
                              min-height: 100vh;
                            "
                          >
                            <!-- {{ PaidPaymentrecord }} -->

                            <div class="m-4">
                              <h3 align="center">{{ mainWorkspace.name }}</h3>
                              <h5 align="center">
                                {{ DuePaymentrecord.term.name }} Payment Receipt
                              </h5>
                              <h5 align="center">
                                {{ DuePaymentrecord.session.name }} Session
                              </h5>
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
                                <h6>FULL NAME:</h6>
                                <h6>ADM_NO:</h6>
                                <h6>CLASS:</h6>
                              </div>

                              <div
                                style="
                                  margin-top: 10px;
                                  text-transform: uppercase;
                                "
                              >
                                <h6>
                                  {{ DuePaymentrecord.student.first_name }}
                                  {{ DuePaymentrecord.student.last_name }}
                                  {{ DuePaymentrecord.student.middle_name }}
                                </h6>
                                <h6>
                                  {{ DuePaymentrecord.student.adm_no }}
                                </h6>
                                <h6>
                                  {{ DuePaymentrecord.student.last_name }}
                                </h6>
                                <h6>{{ DuePaymentrecord.klase.name }}</h6>
                              </div>
                            </div>

                            <h5
                              class="d-flex justify-content-align mt-2 p-3"
                              style="background-color: #007bff; color: #fff"
                            >
                              PAYMENT INFORMATION
                            </h5>
                            <div class="d-flex justify-content-between">
                              <div>
                                <h6>TITLE:</h6>

                                <h6>REFERENCE:</h6>

                                <h6>Amount</h6>

                                <h6>Amount Paid:</h6>

                                <h6>Balance</h6>
                              </div>

                              <div style="margin-left: 30px; margin-top: 10px">
                                <h6>{{ DuePaymentrecord.title }}</h6>
                                <h6>{{ DuePaymentrecord.ref_no }}</h6>
                                <h6>
                                  <span>&#x20A6;</span
                                  >{{ DuePaymentrecord.amount }}
                                </h6>
                                <h6>
                                  <span>&#x20A6;</span
                                  >{{ DuePaymentrecord.amt_paid }}
                                </h6>
                                <h6>
                                  <span>&#x20A6;</span
                                  >{{ DuePaymentrecord.balance }}
                                </h6>
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
          <h5 v-if="PaidPaymentrecords.length == 0" class="text-center mt-4">
            No record found
          </h5>
          <div class="table-down" v-else>
            <b-table-simple hover responsive>
              <b-thead>
                <tr>
                  <b-th>S/N</b-th>
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
                    {{ index + 1 }}
                  </b-td>
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
                    <b-icon
                      class="ml-2"
                      scale="1.5"
                      icon="printer"
                      style="cursor: pointer"
                      v-show="PaidPaymentrecord.amt_paid > 0"
                      @click.prevent="generatePaidReport(index)"
                    />

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
                              padding: 50px;
                              margin: auto;
                              min-height: 100vh;
                            "
                          >
                            <!-- {{ PaidPaymentrecord }} -->

                            <div class="m-4">
                              <h3 align="center">{{ mainWorkspace.name }}</h3>
                              <h5 align="center">
                                {{ PaidPaymentrecord.term.name }} Payment
                                Receipt
                              </h5>
                              <h5 align="center">
                                {{ PaidPaymentrecord.session.name }} Session
                              </h5>
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
                                <h6>FULL NAME:</h6>
                                <h6>ADM_NO:</h6>
                                <h6>CLASS:</h6>
                              </div>

                              <div
                                style="
                                  margin-top: 10px;
                                  text-transform: uppercase;
                                "
                              >
                                <h6>
                                  {{ PaidPaymentrecord.student.first_name }}
                                  {{ PaidPaymentrecord.student.last_name }}
                                  {{ PaidPaymentrecord.student.middle_name }}
                                </h6>
                                <h6>
                                  {{ PaidPaymentrecord.student.adm_no }}
                                </h6>
                                <h6>
                                  {{ PaidPaymentrecord.student.last_name }}
                                </h6>
                                <h6>{{ PaidPaymentrecord.klase.name }}</h6>
                              </div>
                            </div>

                            <h5
                              class="d-flex justify-content-align mt-2 p-3"
                              style="background-color: #007bff; color: #fff"
                            >
                              PAYMENT INFORMATION
                            </h5>
                            <div class="d-flex justify-content-between">
                              <div>
                                <h6>TITLE:</h6>

                                <h6>REFERENCE:</h6>

                                <h6>Amount</h6>

                                <h6>Amount Paid:</h6>

                                <h6>Balance</h6>
                              </div>

                              <div style="margin-left: 30px; margin-top: 10px">
                                <h6>{{ PaidPaymentrecord.title }}</h6>
                                <h6>{{ PaidPaymentrecord.ref_no }}</h6>
                                <h6>
                                  <span>&#x20A6;</span
                                  >{{ PaidPaymentrecord.amount }}
                                </h6>
                                <h6>
                                  <span>&#x20A6;</span
                                  >{{ PaidPaymentrecord.amt_paid }}
                                </h6>
                                <h6>
                                  <span>&#x20A6;</span
                                  >{{ PaidPaymentrecord.balance }}
                                </h6>
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
      type: Array,
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

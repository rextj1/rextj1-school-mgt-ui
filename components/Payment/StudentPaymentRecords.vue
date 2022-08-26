<template>
  <div class="fonts">
    <b-card no-body>
      <b-tabs card style="font-size: 1.4rem">
        <b-tab active>
          <template #title>
            <strong>Due Payment</strong>
          </template>
            <div class="table-down">
            <b-row no-gutters>
              <b-col md="12">
                <div class="card-body">
                  <div class="card-student" style="background-color: #fff">
                    <hr />
                    <b-container fluid>
                      <!-- User Interface controls -->
                      <span v-if="DuePaymentrecords == null"></span>
                      <span v-else>
                           <b-button
                        variant="secoundary"
                        @click.prevent="generateDueReport"
                      >
                        <b-icon class="ml-2" icon="printer" />

                        Print
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
                            style="
                              background-color: #f2f3fd;
                              padding: 5rem;
                              width: 80%;
                              margin: 5rem auto;
                              height: 100vh;
                            "
                          >
                            <h2 align="center">Ronazon International</h2>
                            <h3 align="center">Payment Receipt</h3>
                            <h3>
                              Receipt Reference Number:
                              {{ DuePaymentrecords.receipt }}
                            </h3>

                            <div
                              style="
                                background-color: blue;
                                width: 100%;
                                height: 5rem;
                              "
                            >
                              STUDENT INFORMATION
                            </div>
                            <div class="d-flex">
                              <div>
                                <b-img
                                  thumbnail
                                  src="@/assets/images/teacher.jpeg"
                                  width="100"
                                ></b-img>
                              </div>
                              <div style="margin-left: 2rem; margin-top: 1rem">
                                <h2>
                                  NAME:
                                  {{ DuePaymentrecords.student.first_name }}
                                  {{ DuePaymentrecords.student.last_name }}
                                </h2>
                                <h2>
                                  ADM_NO:
                                  {{ DuePaymentrecords.student.adm_no }}
                                </h2>
                                <h2>
                                  CLASS: {{ DuePaymentrecords.klase.name }}
                                </h2>
                              </div>
                            </div>
                            <h2
                              style="
                                background-color: blue;
                                width: 100%;
                                height: 5rem;
                              "
                            >
                              PAYMENT INFORMATION
                            </h2>
                            <h2>TITLE: {{ DuePaymentrecords.title }}</h2>
                            <h2>REFERENCE: {{ DuePaymentrecords.ref_no }}</h2>
                            <h2>
                              AMOUNT PAID: <span>&#x20A6;</span
                              >{{ DuePaymentrecords.amt_paid }}
                            </h2>
                            <h2>
                              BALANCE: <span>&#x20A6;</span
                              >{{ DuePaymentrecords.balance }}
                            </h2>
                            <h2>
                              TOTAL DUE: <span>&#x20A6;</span
                              >{{ DuePaymentrecords.balance }}
                            </h2>
                          </div>
                        </section>
                      </vue-html2pdf>
                      </span>
                   
                    </b-container>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        
        </b-tab>

        <b-tab>
          <template #title>
            <strong>Paid Payment</strong>
          </template>
          <div class="table-down">
            <b-row no-gutters>
              <b-col md="12">
                <div class="card-body">
                  <div class="card-student" style="background-color: #fff">
                    <hr />
                    <b-container fluid>
                      <!-- User Interface controls -->
                      <span v-if="PaidPaymentrecords == null"></span>
                      <span v-else>
                           <b-button
                        variant="secoundary"
                        @click.prevent="generatePaidReport"
                      >
                        <b-icon class="ml-2" icon="printer" />

                        Print
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
                            style="
                              background-color: #f2f3fd;
                              padding: 5rem;
                              width: 80%;
                              margin: 5rem auto;
                              height: 100vh;
                            "
                          >
                            <h2 align="center">Ronazon International</h2>
                            <h3 align="center">Payment Receipt</h3>
                            <h3>
                              Receipt Reference Number:
                              {{ PaidPaymentrecords.receipt }}
                            </h3>

                            <div
                              style="
                                background-color: blue;
                                width: 100%;
                                height: 5rem;
                              "
                            >
                              STUDENT INFORMATION
                            </div>
                            <div class="d-flex">
                              <div>
                                <b-img
                                  thumbnail
                                  src="@/assets/images/teacher.jpeg"
                                  width="100"
                                ></b-img>
                              </div>
                              <div style="margin-left: 2rem; margin-top: 1rem">
                                <h2>
                                  NAME:
                                  {{ Paymentrecords.student.first_name }}
                                  {{ PaidPaymentrecords.student.last_name }}
                                </h2>
                                <h2>
                                  ADM_NO:
                                  {{ PaidPaymentrecords.student.adm_no }}
                                </h2>
                                <h2>
                                  CLASS: {{ PaidPaymentrecords.klase.name }}
                                </h2>
                              </div>
                            </div>
                            <h2
                              style="
                                background-color: blue;
                                width: 100%;
                                height: 5rem;
                              "
                            >
                              PAYMENT INFORMATION
                            </h2>
                            <h2>TITLE: {{ PaidPaymentrecords.title }}</h2>
                            <h2>REFERENCE: {{ PaidPaymentrecords.ref_no }}</h2>
                            <h2>
                              AMOUNT PAID: <span>&#x20A6;</span
                              >{{ PaidPaymentrecords.amt_paid }}
                            </h2>
                            <h2>
                              BALANCE: <span>&#x20A6;</span
                              >{{ PaidPaymentrecords.balance }}
                            </h2>
                            <h2>
                              TOTAL DUE: <span>&#x20A6;</span
                              >{{ PaidPaymentrecords.balance }}
                            </h2>
                          </div>
                        </section>
                      </vue-html2pdf>
                      </span>
                   
                    </b-container>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
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
}
</script>

<style lang="scss">
.fonts {
  font-size: 1.6rem !important;
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

<template>
  <div class="student">
    <!-- header -->
    <vue-html2pdf
      :show-layout="true"
      :float-layout="false"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="Pdf"
      :pdf-quality="2"
      :manual-pagination="true"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="100%"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <div class="student__wrapper" style="padding: 3rem 4rem">
          <div
            class="d-flex justify-content-between align-items-center mb-4"
            style=""
          >
            <div class="school-logo" style="">
              <img src="@/assets/svg/ronazon-logo.svg" alt="logo" width="100" />
            </div>
            <div class="d-flex flex-column align-items-center">
              <h2>Ronazon Academy</h2>
              <h4>Result sheet(Junior Secondary)</h4>
            </div>
            <div class="student-picture">
              <img
                src="@/assets/images/teacher.jpeg"
                alt="student-photo"
                width="100"
              />
            </div>
          </div>
          <!-- end header -->
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-stretch" style="margin-top: 3rem">
              <h4>Name:</h4>
              <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">Rean Lend</h5>
            </div>
            <div class="d-flex align-items-stretch" style="margin-top: 3rem">
              <h4>ADM No:</h4>
              <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">102345</h5>
            </div>
            <div class="d-flex align-items-stretch" style="margin-top: 3rem">
              <h4>House:</h4>

              <p></p>
            </div>
            <div class="d-flex align-items-stretch" style="margin-top: 3rem">
              <h4>House:</h4>

              <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">JSS 1</h5>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-stretch" style="margin-top: 3rem">
              <h4>Report sheet for:</h4>
              <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">1st</h5>
            </div>
            <div class="d-flex align-items-stretch" style="margin-top: 3rem">
              <h4>Academic year:</h4>
              <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">2020-2023</h5>
            </div>
            <div class="d-flex align-items-stretch" style="margin-top: 3rem">
              <h4>Age:</h4>

              <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">-</h5>
            </div>
            <div class="d-flex align-items-stretch" style="margin-top: 3rem">
              <h4>House:</h4>

              <h5 style="margin-top: 0.3rem; margin-left: 0.5rem">JSS 1</h5>
            </div>
          </div>

          <!-- table -->
          <div style="margin-top: 2rem; padding: 3rem; overflow-x: auto">
            <div class="d-flex flex-column">
              <table border="2" style="text-align: center">
                <tr>
                  <th style="padding: 0.5rem" rowspan="2">Subjects</th>
                  <th style="padding: 0.5rem" colspan="3">
                    Contineous Assesment
                  </th>
                  <th style="padding: 0.5rem" rowspan="2">Exam <br />60</th>
                  <th style="padding: 0.5rem" rowspan="2">
                    Final remarks <br />(100%)
                  </th>
                  <th style="padding: 0.5rem" rowspan="2">Grade</th>
                  <th style="padding: 0.5rem" rowspan="2">
                    Subject <br />position
                  </th>
                  <th style="padding: 0.5rem" rowspan="2">Remarks</th>
                </tr>
                <tr>
                  <th style="padding: 0.5rem">ca1(20%)</th>
                  <th style="padding: 0.5rem">ca2(20%)</th>
                  <th style="padding: 0.5rem">Total(40%)</th>
                </tr>
                <tr>
                  <th style="padding: 0.5rem">Mathematics</th>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">40</td>
                  <td style="padding: 0.5rem">60</td>
                  <td style="padding: 0.5rem">100</td>
                  <td style="padding: 0.5rem">A</td>
                  <td style="padding: 0.5rem">1<sup>st</sup></td>
                  <td style="padding: 0.5rem">Excellent</td>
                </tr>
                <tr>
                  <th>English Language</th>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">40</td>
                  <td style="padding: 0.5rem">60</td>
                  <td style="padding: 0.5rem">100</td>
                  <td style="padding: 0.5rem">A</td>
                  <td style="padding: 0.5rem">1<sup>st</sup></td>
                  <td style="padding: 0.5rem">Excellent</td>
                </tr>
                <tr>
                  <th>Home Economics</th>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">40</td>
                  <td style="padding: 0.5rem">60</td>
                  <td style="padding: 0.5rem">100</td>
                  <td style="padding: 0.5rem">A</td>
                  <td style="padding: 0.5rem">1<sup>st</sup></td>
                  <td style="padding: 0.5rem">Excellent</td>
                </tr>
                <tr>
                  <th>Business Studies</th>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">40</td>
                  <td style="padding: 0.5rem">60</td>
                  <td style="padding: 0.5rem">100</td>
                  <td style="padding: 0.5rem">A</td>
                  <td style="padding: 0.5rem">1<sup>st</sup></td>
                  <td style="padding: 0.5rem">Excellent</td>
                </tr>
                <tr>
                  <th>Social Studies</th>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">40</td>
                  <td style="padding: 0.5rem">60</td>
                  <td style="padding: 0.5rem">100</td>
                  <td style="padding: 0.5rem">A</td>
                  <td style="padding: 0.5rem">1<sup>st</sup></td>
                  <td style="padding: 0.5rem">Excellent</td>
                </tr>
                <tr>
                  <th style="padding: 0.5rem">Computer Science</th>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">40</td>
                  <td style="padding: 0.5rem">60</td>
                  <td style="padding: 0.5rem">100</td>
                  <td style="padding: 0.5rem">A</td>
                  <td style="padding: 0.5rem">1<sup>st</sup></td>
                  <td style="padding: 0.5rem">Excellent</td>
                </tr>
                <tr>
                  <th>French</th>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">40</td>
                  <td style="padding: 0.5rem">60</td>
                  <td style="padding: 0.5rem">100</td>
                  <td style="padding: 0.5rem">A</td>
                  <td style="padding: 0.5rem">1<sup>st</sup></td>
                  <td style="padding: 0.5rem">Excellent</td>
                </tr>
                <tr>
                  <th>Basic Scince</th>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">20</td>
                  <td style="padding: 0.5rem">40</td>
                  <td style="padding: 0.5rem">60</td>
                  <td style="padding: 0.5rem">100</td>
                  <td style="padding: 0.5rem">A</td>
                  <td style="padding: 0.5rem">1<sup>st</sup></td>
                  <td style="padding: 0.5rem">Excellent</td>
                </tr>
                <tr>
                  <th style="padding: 0.5rem" colspan="3">
                    Total score obtained: 800
                  </th>
                  <th style="padding: 0.5rem" colspan="3">
                    Final Average: 100
                  </th>
                  <th style="padding: 0.5rem" colspan="3">
                    Class Average: 100
                  </th>
                </tr>
              </table>
            </div>
            <div style="margin-top: 2rem; font-weight: bold">
              <u>Key</u>
            </div>

            <div class="d-flex">
              <div style="list-style: inside">
                <ol>
                  <li>70% - 100% = Excellent</li>
                  <li>60% - 69% = Very Good</li>
                  <li>50% - 59% = Good</li>
                  <li>40% - 49% = Fair</li>
                  <li>0 - 39% = poor</li>
                </ol>
              </div>

              <table border="2" class="ml-auto">
                <tr>
                  <th>Affected trait</th>
                  <th>Rating</th>
                </tr>
                <tr>
                  <th>Fitness</th>
                  <th></th>
                </tr>
              </table>
            </div>

            <div class="mt-4 remarks">
              <div class="d-flex">
                Teacher's comment:
                <p
                  style="
                    width: 70%;
                    border-bottom: 1px solid #000;
                    margin-left: 2rem;
                  "
                >
                  A very bright
                </p>
              </div>
              <div class="d-flex">
                Principal's comment:
                <p
                  style="
                    width: 70%;
                    border-bottom: 1px solid #000;
                    margin-left: 2rem;
                  "
                >
                  An excellent performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </vue-html2pdf>

    <div class="d-flex justify-content-center mb-4">
      <b-button variant="danger" size="lg" @click.prevent="generateReport"
        >Download result</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
  },
}
</script>

<style lang="scss" scoped>
.student {
  font-size: 1.4rem;
  padding: 2rem;
  text-transform: uppercase;

  .student__wrapper {
    background-color: var(--color-white);
    border-radius: 0.5rem;
    border: none;
  }
}
</style>
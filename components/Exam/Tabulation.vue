<template>
  <div>
    <div class="card">
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
          <div class="card">
            <div class="card-body">
              <h2 style="text-align: center; font-weight: bold">
                <span style="color: green"  v-if="student[1] == 3"
                >{{ student[1] }}rd Term</span>
                 <span style="color: green"  v-else-if="student[1] == 2"
                >{{ student[1] }}nd Term</span>
                 <span style="color: green" v-else
                >{{ student[1] }}st Term</span>
                Tabulation sheet
              </h2>
              <table class="table table-responsive table-striped">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Full Name</th>

                    <th
                      v-if="student[1] == 1 || student[1] == 2"
                      style="color: darkred"
                    >
                      Total
                    </th>
                    <th
                      v-if="student[1] == 1 || student[1] == 2"
                      style="color: darkblue"
                    >
                      Average
                    </th>
                    <th v-if="student[1] == 3" style="color: darkblue">
                      Cum Total
                    </th>
                    <th v-if="student[1] == 3" style="color: darkblue">
                      Cum Avg
                    </th>
                    <th style="color: darkgreen">Position</th>

                    <th v-if="student[1] == 3" style="color: darkgreen">
                      Status
                    </th>
                    <th style="color: darkgreen">Published Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(record, value) in records" :key="record.id">
                    <td>{{ value + 1 }}</td>
                    <td style="">
                      {{ record.student.first_name }}
                      {{ record.student.last_name }}
                    </td>
                    <td
                      v-if="student[1] == 1 || student[1] == 2"
                      style="color: darkblue"
                    >
                      {{ record.total }}
                    </td>
                    <td
                      v-if="student[1] == 1 || student[1] == 2"
                      style="color: darkblue"
                    >
                      {{ record.avg }}
                    </td>
                    <td v-if="student[1] == 3" style="color: darkblue">
                      {{ record.cum_total }}
                    </td>
                    <td v-if="student[1] == 3" style="color: darkblue">
                      {{ record.cum_avg }}
                    </td>
                    <td
                      style="color: darkgreen"
                      v-html="postion(record.position)"
                    ></td>
                    <td v-if="student[1] == 3">
                      {{ record.ps }}
                    </td>
                    <td
                      v-if="record.status == 'published'"
                      style="color: green; font-weight: bold"
                    >
                      {{ record.status }}
                    </td>
                    <td v-else style="color: darkblue; font-weight: bold">
                      Unpublished
                    </td>
                    <!-- 
                    <td v-for="first in firstTerm" :key="first.id">
                      {{ first.cum_avg }}
                    </td>

                    <td v-for="secound in secoundTerm" :key="secound.id">
                      {{ secound.cum_avg }}
                    </td>

                    <td v-for="third in thirdTerm" :key="third.id">
                      {{ third.cum_avg }}
                    </td> -->

                    <!-- <td style="color: darkred">{{ record.total }}</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-center mb-4">
              <b-button
                variant="danger"
                size="lg"
                @click.prevent="generateReport"
                >Download</b-button
              >
            </div>
          </div>
        </section>
      </vue-html2pdf>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    records: Array,
    examRecords: Array,
    firstTerm: Array,
    secoundTerm: Array,
    thirdTerm: Array,
    // publishResult: Object,
    student: Array,
  },

  methods: {
    postion(i) {
      const j = i % 10
      const k = i % 100
      if (j == 1 && k != 11) {
        return i + '<sup>st</sup>'
      }
      if (j == 2 && k != 12) {
        return i + `<sup>nd</sup>`
      }
      if (j == 3 && k != 13) {
        return i + '<sup>rd</sup>'
      }
      if (i > 3) {
        return i + '<sup>th</sup>'
      }
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  font-size: 1.5rem;
}
</style>
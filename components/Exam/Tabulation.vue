<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h6 class="card-title font-weight-bold">Tabulation Sheet for</h6>
      </div>

      <vue-html2pdf
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
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <div class="card">
            <div class="card-body">
              <table class="table table-responsive table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAMES</th>
                    <!-- @foreach($subjects as $sub) -->
                    <th title="" rowspan="2"></th>
                    <!-- @endforeach
                        -->
                    <div v-if="term == 1">
                      <th>1st Term Total</th>
                      <th>2nd Term Total</th>
                      <th>3rd Term Total</th>
                      <th style="color: darkred">Cum Total</th>
                      <th style="color: darkblue">Cum Average</th>
                    </div>

                    <th style="color: darkred">Total</th>
                    <th style="color: darkblue">Average</th>
                    <th style="color: darkgreen">Position</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- @foreach($students as $s) -->
                  <tr v-for="(record, value) in records" :key="record.id">
                    <td>{{ value + 1 }}</td>
                    <td style="">
                      {{ record.student.first_name }}
                      {{ record.student.last_name }}
                    </td>
                    <!-- @foreach($subjects as $sub) -->
                    <td></td>
                    <!-- @endforeach -->

                    <div v-if="term == 1">
                      <td>{{ '-' }}</td>

                      <td>{{ '-' }}</td>

                      <td>{{ '-' }}</td>
                    </div>

                    <td style="color: darkred">{{ record.total }}</td>
                    <td style="color: darkblue">{{ record.avg }}</td>
                    <td
                      style="color: darkgreen"
                      v-html="postion(record.position)"
                    ></td>
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
    term: String,
  },
  data() {
    return {}
  },

  methods: {
    postion(i) {
      var j = i % 10
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
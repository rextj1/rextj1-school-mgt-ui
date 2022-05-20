<template>
  <div>
    <div class="card">
      <div v-if="publishResult == null"></div>
      <div
        v-else
        class="card-header"
        @click="
          resulStatus(
            publishResult.status === 'published' ? 'unpublished' : 'published'
          )
        "
      >
        <b-button
          variant="primary"
          size="lg"
          :disabled="publishResult.status === 'published'"
        >
          {{
            publishResult.status === 'published'
              ? 'Results Published'
              : 'publish Results'
          }}
        </b-button>
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
                    <th>S/N</th>
                    <th>Na</th>
                    <th>1st Term Total</th>
                    <th>2nd Term Total</th>
                    <th>3rd Term Total</th>
                    <th style="color: darkred">Cum Total</th>
                    <th style="color: darkblue">Cum Average</th>

                    <th style="color: darkred">Total</th>
                    <th style="color: darkblue">Average</th>
                    <th style="color: darkgreen">Position</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(record, value) in records" :key="record.id">
                    <td>{{ value + 1 }}</td>
                    <td style="">
                      {{ record.student.first_name }}
                      {{ record.student.last_name }}
                    </td>

                    <td v-for="first in firstTerm" :key="first.id">
                      {{ first.cum_avg }}
                    </td>

                    <td v-for="secound in secoundTerm" :key="secound.id">
                      {{ secound.cum_avg }}
                    </td>

                    <td v-for="third in thirdTerm" :key="third.id">
                      {{ third.cum_avg }}
                    </td>

                    <!-- <td style="color: darkred">{{ record.total }}</td> -->
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
import { UPDATE_PUBLISH_RESULT_MUTATION } from '@/graphql/examRecord/mutations'
import { PUBLISH_RESULT_QUERY } from '~/graphql/examRecord/queries'
import Swal from 'sweetalert2'
export default {
  props: {
    records: Array,
    examRecords: Array,
    firstTerm: Array,
    secoundTerm: Array,
    thirdTerm: Array,
    publishResult: Object,
    student: Array,
  },
  data() {
    return {}
  },

  methods: {
    resulStatus(item) {
      const klase = parseInt(this.student[0])
      const term = parseInt(this.student[1])
      const session = parseInt(this.student[2])
      this.busy = true
      this.$apollo
        .mutate({
          mutation: UPDATE_PUBLISH_RESULT_MUTATION,
          variables: {
            klase_id: parseInt(this.student[0]),
            term_id: parseInt(this.student[1]),
            session_id: parseInt(this.student[2]),
            status: item,
          },
          update: (store, { data: { updatePublishResult } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: PUBLISH_RESULT_QUERY,
              variables: {
                klase_id: parseInt(klase),
                term_id: parseInt(term),
                session_id: parseInt(session),
              },
            })

            data.publishResult.status != updatePublishResult

            store.writeQuery({
              query: PUBLISH_RESULT_QUERY,
              variables: {
                klase_id: parseInt(klase),
                term_id: parseInt(term),
                session_id: parseInt(session),
              },

              data,
            })
          },
        })
        .then(({ data }) => {
          this.busy = false
          Swal.fire({
            title: 'Good',
            icon: 'success',
            text: 'Done!',
            position: 'center',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
        })
    },

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
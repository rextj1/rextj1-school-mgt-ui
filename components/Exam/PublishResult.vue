<template>
  <div class="card">
    <h3 v-if="records.length == 0" class="text-center p-5">No recoord found</h3>
    <div v-else>
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
          <div class="card p-4">
            <div class="card-body">
              <div v-if="records[0].status == 'unpublished'">
                <div v-if="student[1] == 1 || student[1] == 2">
                  <b-button
                    variant="warning"
                    size="lg"
                    class="shadow-sm"
                    :disabled="isPublished"
                    @click="publishThisResult"
                  >
                    <b-spinner
                      v-if="isPublished"
                      variant="light"
                      small
                      class="mr-1 mb-1"
                    />

                    Publish Result</b-button
                  >
                </div>
              </div>
              <div v-else>
                <div v-if="student[1] == 1 || student[1] == 2">
                  <h6
                    class="d-flex justify-content-center align-items-center"
                    style="
                      height: 40px;
                      background-color: green;
                      color: #fff;
                      font-weight: bold;
                    "
                  >
                    Result Published
                  </h6>
                </div>
              </div>

              <h5 style="text-align: center; font-weight: bold">
                <span style="color: green" v-if="student[1] == 3"
                  >{{ student[1] }}rd Term</span
                >
                <span style="color: green" v-else-if="student[1] == 2"
                  >{{ student[1] }}nd Term</span
                >
                <span style="color: green" v-else>{{ student[1] }}st Term</span>
                Tabulation sheet
              </h5>
              <table class="table table-responsive table-striped">
                <tr>
                 
                </tr>
              </table>
            </div>
            <div class="d-flex justify-content-center mb-4">
              <b-button
                class="px-3"
                variant="secondary"
                pill
                size="md"
                @click.prevent="generateReport"
                ><b-icon icon="printer" /> Print</b-button
              >
            </div>
          </div>
        </section>
      </vue-html2pdf>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { UPDATE_PUBLISH_RESULT_MUTATION } from '~/graphql/examRecord/mutations'
import { EXAM_RECORD_QUERIES } from '~/graphql/examRecord/queries'
export default {
  props: {
    records: Array,
    examRecords: Array,
    firstTerm: Array,
    secoundTerm: Array,
    marks: Array,
    thirdTerm: Array,
    student: Array,
  },

  data: () => ({
    isPublished: false,
  }),

  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
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
    publishThisResult() {
      if (this.records[0].term_start == null) {
        Swal.fire({
          text: 'You are being redirected to the Resumption page to create school resumption date',
          position: 'center',
          color: '#fff',
          background: '#d9534f',
          toast: false,
          backdrop: false,
        })
        this.$router.push({
          name: 'workspace-admin-exam-resumption',
          params: { workspace: this.mainWorkspace.slug },
        })
        return
      }

      this.isPublished = true
      this.$apollo
        .mutate({
          mutation: UPDATE_PUBLISH_RESULT_MUTATION,
          variables: {
            klase_id: parseInt(this.student[0]),
            status: 'published',
            session_id: parseInt(this.student[2]),
            section_id: parseInt(this.student[3]),
            term_id: parseInt(this.student[1]),
            workspaceId: parseInt(this.mainWorkspace.id),
          },
          update: (store, { data: { updatePublishResult } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: EXAM_RECORD_QUERIES,
              variables: {
                klase_id: parseInt(this.student[0]),
                term_id: parseInt(this.student[1]),
                session_id: parseInt(this.student[2]),
                section_id: parseInt(this.student[3]),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
            })

            data.klaseResults[0] = updatePublishResult

            // console.log(dataCopy)

            // Write our data back to the cache.
            // Write back to the cache
            store.writeQuery({
              query: EXAM_RECORD_QUERIES,
              variables: {
                klase_id: parseInt(this.student[0]),
                term_id: parseInt(this.student[1]),
                session_id: parseInt(this.student[2]),
                section_id: parseInt(this.student[3]),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
              data,
            })
          },
        })
        .then(() => {
          this.isPublished = false
          Swal.fire({
            title: 'Good',
            icon: 'success',
            text: 'Students result published successfuly!',
            position: 'center',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
        })
        .catch(() => {})
    },
  },
}
</script>

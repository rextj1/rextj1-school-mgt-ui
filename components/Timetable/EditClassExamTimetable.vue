<template>
  <div class="wrapper py-3">
    <template v-if="$apollo.queries.examTimetables.loading"></template>

    <template v-else-if="examTimetables.length > 0">
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
          <b-row no-gutters>
            <b-col md="12">
              <h4 class="text-center mb-4">
                {{ editCurrentClass[1] }} (Exam Timetable)
              </h4>
              <div class="card-body">
                <div class="card-student">
                  <b-table
                    hover
                    bordered
                    head-variant="dark"
                    caption-top
                    no-border-collapse
                    :responsive="true"
                    :items="examTimetables"
                    :fields="fields"
                  >
                  </b-table>
                </div>
              </div>
            </b-col>
          </b-row>
        </section>
      </vue-html2pdf>

      <div class="text-center mb-4">
        <b-button variant="secondary" size="md" pill @click.prevent="generateReport"
          ><b-icon icon="printer"/> print</b-button
        >
      </div>
    </template>

    <template v-else>
      <h4 class="text-center p-4">No record found</h4>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { EXAM_TIMETABLE_QUERIES } from '~/graphql/examTimetables/queries'
export default {
  props: {
    editCurrentClass: Array,
  },
  data() {
    return {
      klaseId: '',
      examTimetables: [],

      fields: [
        { key: 'time', label: 'Time' },
        { key: 'monday', label: 'Monday' },

        { key: 'tuesday', label: 'Tuesday' },

        { key: 'wednesday', label: 'Wednesday' },

        { key: 'thursday', label: 'Thursday' },

        { key: 'friday', label: 'Friday' },
      ],
    }
  },
  apollo: {
    examTimetables: {
      query: EXAM_TIMETABLE_QUERIES,
      variables() {
        return {
          klase_id: parseInt(this.editCurrentClass[0]),
          section_id: parseInt(this.editCurrentClass[2]),
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
  },
  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {

  .card-body {
    padding: 0;
    .card-student {
      border: none;
      border-radius: 5px;
      height: auto;
    }
  }
}
</style>

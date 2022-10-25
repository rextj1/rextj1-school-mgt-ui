<template>
  <div class="edit-class-timetable py-3">
    <template v-if="$apollo.queries.timetables.loading"></template>

    <template v-else-if="timetables.length > 0">
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
            <b-col>
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
                    :items="timetables"
                    :fields="fields"
                  >
                  </b-table>
                </div>
              </div>
            </b-col>
          </b-row>
        </section>
      </vue-html2pdf>

      <div class="text-center mb-2">
        <b-button variant="secondary" size="md" pill @click.prevent="generateReport"
          ><b-icon icon="printer"/> print</b-button
        >
      </div>
    </template>

    <template v-else>
      <h2 style="text-align: center">No record found</h2>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { TIMETABLE_QUERIES } from '~/graphql/timetables/queries'
export default {
  props: {
    editCurrentClass: Array,
  },
  data() {
    return {
      timetables: [],
      klaseId: '',
      klaseName: '',

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
    timetables: {
      query: TIMETABLE_QUERIES,
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

<style lang="scss">
.edit-class-timetable {

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

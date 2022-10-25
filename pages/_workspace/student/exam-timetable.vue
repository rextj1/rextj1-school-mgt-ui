<template>
  <div class="p-3">
    <template v-if="$fetchState.pending"><Preload /></template>
    <template v-else>
      <b-card>
        <div v-if="examTimetables.length > 0">
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
                  <h4 class="text-center mt-5 mb-4">
                    <span style="color: green"
                      >({{ user.student.klase.name }})</span
                    >
                    Exam timetable
                  </h4>

                  <div>
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
                </b-col>
              </b-row>
            </section>
          </vue-html2pdf>

          <div class="text-center mb-4">
            <b-button variant="danger" size="md" @click.prevent="generateReport"
              >download</b-button
            >
          </div>
        </div>
        <div v-else>
          <h2 class="text-center">No record found</h2>
        </div>
      </b-card>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { EXAM_TIMETABLE_QUERIES } from '~/graphql/examTimetables/queries'
import { USER_STUDENT_QUERY } from '~/graphql/students/queries'
import Preload from '~/components/Preload.vue'

export default {
  components: { Preload },
  middleware: 'auth',
  data() {
    return {
      examTimetables: [],
      user: {},
      items: [],
      fields: [
        { key: 'date', label: 'Date' },
        { key: 'time', label: 'Time' },
        { key: 'monday', label: 'Monday' },

        { key: 'tuesday', label: 'Tuesday' },

        { key: 'wednesday', label: 'Wednesday' },

        { key: 'thursday', label: 'Thursday' },

        { key: 'friday', label: 'Friday' },
      ],
    }
  },

  async fetch() {
    const { app, route, redirect } = this.$nuxt.context

    const {
      apolloProvider: { defaultClient: apolloClient },
    } = app

    const {
      data: { user },
    } = await apolloClient.query({
      query: USER_STUDENT_QUERY,
      variables: { id: parseInt(this.$auth.user.id) },
    })
    this.user = user

    const {
      data: { examTimetables },
    } = await apolloClient.query({
      query: EXAM_TIMETABLE_QUERIES,
      variables: {
        klase_id: parseInt(user.student.klase.id),
        section_id: parseInt(user.student.section.id),
        workspaceId: parseInt(this.mainWorkspace.id),
      },
    })
    this.examTimetables = examTimetables
  },
  fetchDelay: 1000,

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

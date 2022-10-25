<template>
  <div class="p-3">
    <template v-if="$fetchState.pending"><Preload /></template>
    <template v-else>
      <b-card v-if="timetables.length > 0">
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
            <h4 class="text-center mt-5 mb-4">
              <span style="color: green">({{ user.student.klase.name }})</span>
              Exam Timetable
            </h4>

            <div>
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
          </section>
        </vue-html2pdf>

        <div class="text-center mb-3">
          <b-button variant="danger" size="md" @click.prevent="generateReport"
            >download</b-button
          >
        </div>
      </b-card>
      <b-card v-else-if="timetables.length == 0" class="p-3">
        <h2 class="text-center">No record found</h2>
      </b-card>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { TIMETABLE_QUERIES } from '~/graphql/timetables/queries'
import { USER_STUDENT_QUERY } from '~/graphql/students/queries'
import Preload from '~/components/Preload.vue'

export default {
  components: { Preload },
  middleware: 'auth',
  data() {
    return {
      timetables: [],
      user: {},
      klaseId: '',
      items: [],
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
      data: { timetables },
    } = await apolloClient.query({
      query: TIMETABLE_QUERIES,
      variables: {
        klase_id: parseInt(user.student.klase.id),
        section_id: parseInt(user.student.section.id),
        workspaceId: parseInt(this.mainWorkspace.id),
      },
    })
    this.timetables = timetables
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

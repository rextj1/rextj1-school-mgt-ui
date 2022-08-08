<template>
  <div class="font">
    <template>
      <div class="fonts">
        <template v-if="nowloading"><Preload /></template>
        <template v-else>
          <div v-if="examTimetables.length > 0">
            <div class="d-flex justify-content-end mb-4">
              <b-button
                variant="danger"
                size="lg"
                @click.prevent="generateReport"
                >PDF</b-button
              >
            </div>

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
                    <h3 class="d-flex justify-content-center mb-4">
                      Class timetable
                    </h3>
                    <div class="card-body">
                      <div class="card-student p-3">
                        <b-table
                          hover
                          bordered
                          head-variant="dark"
                          caption-top
                          no-border-collapse
                          fixed
                          stacked="md"
                          responsive="true"
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
          </div>
          <div v-else-if="examTimetables.length == 0">
            <h2 style="text-align: center">No record found</h2>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { USER_STUDENT_QUERY } from '~/graphql/users/queries'
import { EXAM_TIMETABLE_QUERIES } from '~/graphql/examTimetables/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      examTimetables: {},

      klaseId: '',
      klaseName: '',
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
  apollo: {
    user: {
      query: USER_STUDENT_QUERY,
      variables() {
        return {
          id: parseInt(this.$auth.user.id),
        }
      },
    },
  },

  computed: {
    nowloading() {
      return (
        this.$apollo.queries.user.loading
      )
    },
    StudentklaseId() {
      return this.user.students.map((a) => a.klase.id)
    },
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  beforeUpdate() {
    this.$apollo.addSmartQuery('examTimetables', {
      query: EXAM_TIMETABLE_QUERIES,
      variables() {
        return {
          klase_id: parseInt(this.StudentklaseId),
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },

      result({ loading, data }, key) {
        if (!loading) {
          this.examTimetables = data.examTimetables
        }
      },
    })
  },

  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
  },
}
</script>

<style lang="scss">
.fonts {
  font-size: 1.4rem !important;
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
    }
  }
}
</style>

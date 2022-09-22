<template>
  <div class="p-4">
    <template v-if="nowloading"><Preload /></template>
    <template v-else>
      <b-card class="mb-4">
        <b-row no-gutters>
          <b-col md="4">
            <b-form-group label="Current Class:">
              <b-form-select
                id="klase"
                v-model="studentClass"
                value-field="id"
                text-field="name"
                :options="klases"
                class="mb-3"
                size="lg"
                required
                @change="timetableDropdown"
              >
                <!-- This slot appears above the options from 'options' prop -->
                <template #first>
                  <b-form-select-option :value="null" disabled
                    >-- select class --</b-form-select-option
                  >
                </template>

                <!-- These options will appear after the ones from 'options' prop -->
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <div v-show="timetableDropdownClass">
        <div v-if="timetables.length > 0" class="exam-wrapper p-2">
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
              <h3 class="text-center mt-4 mb-2">Class Timetable</h3>

              <b-card>
                <b-table
                  hover
                  bordered
                  head-variant="dark"
                  caption-top
                  no-border-collapse
                  fixed
                  responsive="true"
                  :items="timetables"
                  :fields="fields"
                >
                </b-table>
              </b-card>
            </section>
          </vue-html2pdf>

          <div class="d-flex justify-content-center mb-4">
            <b-button variant="danger" size="lg" @click.prevent="generateReport"
              >download</b-button
            >
          </div>
        </div>
        <div v-else-if="timetables.length == 0" class="exam-wrapper p-4">
          <h3 class="text-center p-4">No record found</h3>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { USER_STUDENT_QUERY } from '~/graphql/students/queries'
import { KLASE_QUERIES } from '~/graphql/klases/queries'
import { TIMETABLE_QUERIES } from '~/graphql/timetables/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      timetables: {},
      timetableDropdownClass: false,
      studentClass: null,

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
    klases: {
      query: KLASE_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
  },

  computed: {
    nowloading() {
      return this.$apollo.queries.user.loading
    },

    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },

    timetableDropdown() {
      this.timetableDropdownClass = true
      this.$apollo.addSmartQuery('timetables', {
        query: TIMETABLE_QUERIES,
        variables() {
          return {
            klase_id: parseInt(this.studentClass),
            workspaceId: parseInt(this.mainWorkspace.id),
          }
        },

        result({ loading, data }, key) {
          if (!loading) {
            this.timetables = data.timetables
          }
        },
      })
    },
  },
}
</script>

<style lang="scss">
.exam-wrapper {
  font-size: 1.4rem !important;
  background-color: #fff;
  .card {
    border: 0;
  }
}
</style>

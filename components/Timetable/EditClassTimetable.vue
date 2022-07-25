<template>
  <div class="font">
    <template>
      <div class="fonts">
        <template v-if="!timetables">
          <div style="background-color: #f1f9ae; width: 100%; height: 100vh">
            <div class="grow">
              <b-spinner
                style="width: 30rem; height: 30rem"
                type="grow"
                variant="danger"
              ></b-spinner>
            </div></div
        ></template>
        <template v-else>
          <div v-if="timetables.length == 0">
            <h2 style="text-align: center">No record found</h2>
          </div>
          <div v-else>
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
                      <!-- <div v-for="klase in timetables[0]" :key="klase.id">
                        {{ klase.name }}
                      </div> -->
                      {{ editCurrentClass[1] }} (Timetable)
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
          </div>
        </template>
      </div>
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

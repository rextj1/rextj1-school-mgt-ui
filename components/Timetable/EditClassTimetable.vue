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
                     {{editCurrentClass[1]}} (Timetable)
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
import { TIMETABLE_QUERIES } from '~/graphql/timetables/queries'
export default {
  props: {
    editCurrentClass: Array,
  },
  data() {
    return {
      klaseId: '',
      klaseName: '',
      items: [
        {
          Time: '7:30 AM - 8:00 AM',
          _rowVariant: 'danger',
          Monday: 'Assembly',
          Tuesday: 'Assembly',
          Wednesday: 'Assembly',
          Thursday: 'Assembly',
          Friday: 'Assembly',
        },
        {
          Time: '8:10 AM - 8:45 AM',
          Monday: 'Maths',
          Tuesday: 'EngLish Language',
          Wednesday: 'Home Economics',
          Thursday: 'Basic Scince',
          Friday: 'Social Studies',
          // _rowVariant: 'success',
        },
        {
          Time: '9:00 AM - 9:45 AM',
          Monday: 'Maths',
          Tuesday: 'EngLish Language',
          Wednesday: 'Home Economics',
          Thursday: 'Basic Scince',
          Friday: 'Social Studies',
          // _rowVariant: 'success',
          _cellVariants: { Monday: 'info', Friday: 'success' },
        },
        {
          Time: '9:45 - 9:50 AM',
          Monday: 'Maths',
          Tuesday: 'EngLish Language',
          Wednesday: 'Home Economics',
          Thursday: 'Basic Scince',
          Friday: 'Social Studies',
          // _rowVariant: 'success',
          _cellVariants: { Monday: 'light', Friday: 'success' },
        },
        {
          Time: '10:00 AM - 11:30 AM',
          Monday: 'Maths / Maths',
          Tuesday: 'EngLish Language',
          Wednesday: 'Home Economics',
          Thursday: 'Basic Scince',
          Friday: 'Social Studies',
          // _rowVariant: 'success',
          _cellVariants: { Monday: 'light', Friday: 'success' },
        },
        {
          Time: '11:30 AM - 12:00 PM ',
          Monday: 'Maths',
          Tuesday: 'EngLish Language',
          Wednesday: 'Home Economics',
          Thursday: 'Basic Scince',
          Friday: 'Social Studies',
          // _rowVariant: 'success',
          _cellVariants: { Monday: 'light', Friday: 'danger' },
        },
        {
          Time: '12:05 PM - 12:45 PM',
          Monday: 'Maths',
          Tuesday: 'EngLish Language',
          Wednesday: 'Home Economics',
          Thursday: 'Basic Scince',
          Friday: 'Social Studies',
          // _rowVariant: 'success',
          _cellVariants: { Monday: 'info', Friday: 'danger' },
        },
        {
          Time: '12: 45 - 1:30 PM',
          Monday: 'Maths',
          Tuesday: 'EngLish Language',
          Wednesday: 'Home Economics',
          Thursday: 'Basic Scince',
          Friday: 'Social Studies',
          // _rowVariant: 'success',
          _cellVariants: { Monday: 'danger', Friday: 'success' },
        },
        {
          Time: '12: 45 - 1:30 PM',
          Monday: 'Maths',
          Tuesday: 'EngLish Language',
          Wednesday: 'Home Economics',
          Thursday: 'Basic Scince',
          Friday: 'Social Studies',
          // _rowVariant: 'success',
          _cellVariants: { Monday: 'light', Friday: 'primary' },
        },
      ],
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
        }
      },
    },
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
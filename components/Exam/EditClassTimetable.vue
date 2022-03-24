  <template>
  <div class="font p-4">
    <b-row no-gutters>
      <b-col md="12">
        <h3 class="d-flex justify-content-center mb-4">
          {{ editCurrentClass }} Timetable
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
              :items="items"
              :fields="fields"
            >
              <template #cell(Action)="">
                <b-button variant="primary" size="lg">Edit</b-button>
                <b-button variant="danger" size="lg" class="ml-2"
                  >Delete</b-button
                >
              </template>
            </b-table>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    editCurrentClass: String,
  },
  data() {
    return {
      items: [
        {
          date: '12.04-2022',
          Time: '7:30 AM - 8:00 AM',
          _rowVariant: 'danger',
          Monday: 'Assembly',
          Tuesday: 'Assembly',
          Wednesday: 'Assembly',
          Thursday: 'Assembly',
          Friday: 'Assembly',
        },
        {
          date: '12.04-2022',
          Time: '8:10 AM - 8:45 AM',
          Monday: 'Maths',
          Tuesday: 'EngLish Language',
          Wednesday: 'Home Economics',
          Thursday: 'Basic Scince',
          Friday: 'Social Studies',
          // _rowVariant: 'success',
        },
        {
          date: '12.04-2022',
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
          date: '12.04-2022',
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
          date: '12.04-2022',
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
          date: '12.04-2022',
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
          date: '12.04-2022',
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
          date: '12.04-2022',
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
        { key: 'date', label: 'Date' },
        { key: 'Time', label: 'Time' },
        { key: 'Monday', label: 'Monday' },

        { key: 'Tuesday', label: 'Tuesday' },

        { key: 'Wednesday', label: 'Wednesday' },

        { key: 'Thursday', label: 'Thursday' },

        { key: 'Friday', label: 'Friday' },
        { key: 'Action', label: 'Action' },
      ],
    }
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
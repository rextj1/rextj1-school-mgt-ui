  <template>
  <div class="p-4">
    <div class="libarian__wrapper">
      <vue-html2pdf
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
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <b-row no-gutters>
            <b-col md="12">
              <h3 class="d-flex justify-content-center mb-4">
                JSS 1 Exam Timetable
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
                    responsive="true"
                    :items="items"
                  ></b-table>
                </div>
              </div>
            </b-col>
          </b-row>
        </section>
      </vue-html2pdf>

      <div class="d-flex justify-content-center mb-4">
        <b-button variant="danger" size="lg" @click.prevent="generateReport"
          >Download</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
.libarian__wrapper {
  font-size: 1.4rem;
  padding: 2rem;
 background-color: #fff;

 @include media-breakpoint-down(sm) { 
 font-size: 1.2rem;
 padding: 0.5rem;
  }
}
</style>
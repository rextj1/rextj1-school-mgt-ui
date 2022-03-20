<template>
  <div class="liberian">
    <div class="d-flex justify-content-end mb-4">
      <b-button variant="danger" size="lg" @click.prevent="generateReport"
        >PDF</b-button
      >
    </div>
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
        <div class="p-4 liberian__wrapper mb-4">
          <h1 class="d-flex justify-content-center">
            Examination Timetable
          </h1>
          <h3 class="d-flex justify-content-center mb-4">
            <br />
            (2022 session {{ show }})
          </h3>

          <b-row no-gutters>
            <b-col md="12">
              <b-table striped responsive hover :items="items" :fields="fields">
                <template #cell(name)="row">
                  {{ row.value.first }} {{ row.value.last }}
                </template>

                <template #cell(actions)="row">
                  <div class="d-flex">
                    <b-button size="smd" variant="info" class="mr-1">
                      <b-icon icon="pencil-square"></b-icon>
                    </b-button>

                    <b-button
                      size="smd"
                      variant="danger"
                      @click="row.toggleDetails"
                    >
                      <b-icon icon="trash"></b-icon>
                    </b-button>
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </div>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>
export default {
  props: {
    show: String
  },
  data() {
    return {
      items: [
        {
          '#': 1,
          subject: 'Mathematics',
          name: { first: 'Dickerson', last: 'Macdonald' },
          class: 'jss1',
          section: 'A',
          term: '1st term',

          'start-time': '9:00 AM',
          'end-time': '11 AM',
          date: '02/06/2022',
          sessions: 2022,
          phone: 8012333377,
        },
        {
          '#': 2,
          subject: 'English Language',
          name: { first: 'Dickerson', last: 'Macdonald' },
          class: 'jss1',
          section: 'A',
          term: '1st term',

          'start-time': '9:00 AM',
          'end-time': '11 AM',
          date: '02/06/2022',
          sessions: 2022,
          phone: 8012333377,
        },
        {
          '#': 3,
          subject: 'Biology',
          name: { first: 'Dickerson', last: 'Macdonald' },
          class: 'jss1',
          section: 'A',
          term: '1st term',

          'start-time': '9:00 AM',
          'end-time': '11 AM',
          date: '02/06/2022',
          sessions: 2022,
          phone: 8012333377,
        },
      ],

      fields: [
        {
          key: '#',
          label: '#',
        },
        {
          key: 'subject',
          label: 'Subject Name',
        },
        {
          key: 'class',
          label: 'Class',
        },
        {
          key: 'term',
          label: 'Term',
        },
        {
          key: 'section',
          label: 'Section',
        },
        {
          key: 'date',
          label: 'Exam Date',
        },

        {
          key: 'start-time',
          label: 'Start Time',

          //   class: 'text-center',
        },
        {
          key: 'end-time',
          label: 'End Time',

          //   class: 'text-center',
        },
        {
          key: 'name',
          label: 'Teacher Name',
        },

        {
          key: 'section',
          label: 'Section',

          class: 'text-center',
        },
        {
          key: 'phone',
          label: 'Phone',
        },
        { key: 'actions', label: 'Actions' },
      ],
      form: {
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        password: null,
        confirmPassword: null,
        class: null,
        birthday: null,
        gender: null,
        session: '',
        address: '',
        image: null,
        busy: false,
      },
      preview_url: null,
      classes: ['jss1', 'jss2', 'jss3', 'ss1', 'ss2', 'ss3'],
      genders: ['Male', 'Female'],
    }
  },
  methods: {
    selectImage() {
      this.$refs.Avatar.click()
    },
    handleFileUpload() {
      const input = this.$refs.Avatar
      const file = input.files[0]
      if (file) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.preview_url = e.target.result
        }
        reader.readAsDataURL(file)
        this.form.image = file

        // this.$emit('input', file[0])
      }
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
  },
}
</script>

<style lang="scss" scoped>
.liberian {
  font-size: 1.4rem;
  padding: 2rem;
  .form-control,
  .mb-3 {
    background-color: var(--color-input);
  }

  .liberian__wrapper {
    background-color: var(--color-white);
    border-radius: 0.5rem;
    border: none;
  }
  .profile-avatar {
    position: relative;
    text-align: center;
    width: 10rem;
    height: 10rem;

    .photo-preview {
      width: 100px;
      height: 100px;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 50%;
    }

    .file-upload {
      position: absolute;
      display: block;
      cursor: pointer;
      bottom: 0;
      right: -5px;
      padding: 4px;
      background: white;
      border-radius: 50%;

      .btn {
        background-color: white;
        border: 1px solid $gray-200;
      }
    }

    .file-upload__input {
      display: none;
    }
    .img-round {
      border-radius: 50%;
    }
  }
}
</style>

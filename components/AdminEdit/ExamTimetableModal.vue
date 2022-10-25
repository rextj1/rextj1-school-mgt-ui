<template>
  <div class="examTimetable">
    <div class="examTimetable__wrapper">
      <div class="exam-timetble">
      
        <b-form
          method="POST"
          @submit.prevent="onSubmit"
          @keydown="form.onKeydown($event)"
        >
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Monday</th>
                <th scope="col">Tuesday</th>
                <th scope="col">Wednesday</th>
                <th scope="col">Thursday</th>
                <th scope="col">Friday</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope="row">
                  <b-input
                    v-model="form.date"
                    style="width: 110px"
                    type="text"
                  ></b-input>
                </th>
                <th scope="row">
                  <b-input
                    v-model="form.time"
                    style="width: 110px"
                    type="text"
                  ></b-input>
                </th>

                <th scope="row">
                  <b-form-input
                    v-model="form.monday"
                    type="text"
                  ></b-form-input>
                </th>
                <th scope="row">
                  <b-form-input
                    v-model="form.tuesday"
                    type="text"
                  ></b-form-input>
                </th>
                <th scope="row">
                  <b-form-input
                    v-model="form.wednesday"
                    type="text"
                  ></b-form-input>
                </th>
                <th scope="row">
                  <b-form-input
                    v-model="form.thursday"
                    type="text"
                  ></b-form-input>
                </th>
                <th scope="row">
                  <b-form-input
                    v-model="form.friday"
                    type="text"
                  ></b-form-input>
                </th>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-center">
            <b-button type="submit"  variant="primary" class="mr-4" size="md">
              <b-spinner
                v-if="form.busy"
                variant="light"
                small
                class="mr-1 mb-1"
              />Register</b-button
            >
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { UPDATE_EXAM_TIMETABLE_MUTATION } from '~/graphql/examTimetables/mutations'
import { EXAM_TIMETABLE_QUERY } from '~/graphql/examTimetables/queries'
import Swal from 'sweetalert2'
export default {
  props: {
    slug: Array,
  },
  data() {
    return {
      form: new this.$form({
        id: null,
        date: null,
        time: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        busy: false,
      }),
    }
  },
  computed: {
    klaseId() {
      return this.slug[1]
    },
    id() {
      return this.slug[0]
    },
    closeModal() {
      return this.slug[2]
    },

    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  apollo: {
    examTimetable: {
      query: EXAM_TIMETABLE_QUERY,
      variables() {
        return {
          id: parseInt(this.id),
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
      result({ data, loading }) {
        if (!loading) {
          const examTimetable = data.examTimetable
          this.form.keys().forEach((key) => {
            if (examTimetable[key]) {
              //  if (key === 'image') {
              //   return true
              // }
              this.form[key] = examTimetable[key]
            }
          })
        }
      },
    },
  },
  methods: {
    onSubmit() {
      // const klaseId = this.klaseId
      this.form.busy = true
      const updateId = parseInt(this.form.id)
      this.$apollo
        .mutate({
          mutation: UPDATE_EXAM_TIMETABLE_MUTATION,
          variables: {
            id: parseInt(this.form.id),
            date: this.form.date,
            time: this.form.time,
            monday: this.form.monday,
            tuesday: this.form.tuesday,
            wednesday: this.form.wednesday,
            thursday: this.form.thursday,
            friday: this.form.friday,
            klase_id: parseInt(this.klaseId),
            workspaceId: parseInt(this.mainWorkspace.id),
          },
          update: (store, { data: { updateExamTimetable } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: EXAM_TIMETABLE_QUERY,
              variables: {
                id: parseInt(updateId),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
            })

            // console.log(this.form.class);
            const index = data.examTimetable.id

            if (index !== -1) {
              // Mutate cache result
              data.examTimetable = updateExamTimetable

              store.writeQuery({
                query: EXAM_TIMETABLE_QUERY,
                variables: {
                  id: parseInt(updateId),
                  workspaceId: parseInt(this.mainWorkspace.id),
                },
                data,
              })
            }
          },
        })
        .then(() => {
          this.form.busy = false
          Swal.fire({
            timer: 1500,
            text: 'exam timetable updated successfully',
            position: 'top-right',
            color: '#fff',
            background: '#5cb85c',
            toast: false,
            backdrop: false,
            showConfirmButton: false,
          })

          this.$bvModal.hide(this.closeModal)
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.examTimetable {

  .custom-select:focus {
    box-shadow: none;
  }

  .custom-select,
  .form-control,
  .mb-3 {
    height: 40px;
    color: #000;
     font-size: 16px;
  }
  .grow {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
}
</style>

<template>
  <div class="student">
    <b-modal
      :value="value"
      :visible="value"
      :hide-backdrop="false"
      title="Edit Data"
      centered
      size="lg"
      :hide-footer="true"
      @change="$emit('input', $event)"
    >
      <div class="p-4 student__wrapper">
        <div class="exam-timetble">
          <b-form
            method="POST"
            @submit.prevent="onSubmit"
            @keydown="form.onKeydown($event)"
          >
            <table class="table table-sm table-bordered">
              <thead>
                <tr style="font-size: 1.4rem">
                  <th scope="col">Time</th>
                  <th scope="col">Monday</th>
                  <th scope="col">Tuesday</th>
                  <th scope="col">Wednesday</th>
                  <th scope="col">Thursday</th>
                  <th scope="col">Friday</th>
                </tr>
              </thead>

              <tbody>
                <tr style="font-size: 1.4rem">
                  <th scope="row">
                    <input
                      class="form-control form-control-sm"
                      v-model="form.time"
                      type="text"
                      style="font-size: 1.4rem"
                    />
                  </th>

                  <th scope="row">
                    <input
                      class="form-control form-control-sm"
                      v-model="form.monday"
                      type="text"
                      style="font-size: 1.4rem"
                    />
                  </th>
                  <th scope="row">
                    <input
                      class="form-control form-control-sm"
                      v-model="form.tuesday"
                      type="text"
                      style="font-size: 1.4rem"
                    />
                  </th>
                  <th scope="row">
                    <input
                      class="form-control form-control-sm"
                      v-model="form.wednesday"
                      type="text"
                      style="font-size: 1.4rem"
                    />
                  </th>
                  <th scope="row">
                    <input
                      class="form-control form-control-sm"
                      v-model="form.thursday"
                      type="text"
                      style="font-size: 1.4rem"
                    />
                  </th>
                  <th scope="row">
                    <input
                      class="form-control form-control-sm"
                      v-model="form.friday"
                      type="text"
                      style="font-size: 1.4rem"
                    />
                  </th>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-center">
              <b-button type="submit" variant="primary" class="mr-4" size="lg">
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
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { UPDATE_TIMETABLE_MUTATION } from '~/graphql/timetables/mutations'
import { TIMETABLE_QUERY } from '~/graphql/timetables/queries'
import Swal from 'sweetalert2'
export default {
  props: {
    slug: {
      type: Array,
    },
    value: {
      type: Boolean,
      default: true,
    },
    timetable: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      klaseId: '',
      id: '',
      closeModal: '',
      form: new this.$form({
        id: null,
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
  created() {
    this.klaseId = this.slug[1]
    this.id = this.slug[0]
    this.closeModal = this.slug[2]

    this.form.keys().forEach((key) => {
      if (this.timetable[key]) {
        //  if (key === 'image') {
        //   return true
        // }
        this.form[key] = this.timetable[key]
      }
    })
  },

  watch: {
    timetable(value) {
      this.setTimetable(value)
    },
  },

  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  methods: {
    setTimetable(timetable) {
      this.form.id = timetable.id
      this.form.monday = timetable.monday
      this.form.tuesday = timetable.tuesday
      this.form.wednesday = timetable.wednesday
      this.form.thursday = timetable.thursday
      this.form.friday = timetable.friday
      this.form.time = timetable.time
    },
    onSubmit() {
      const klaseId = this.klaseId
      this.form.busy = true
      const updateId = parseInt(this.form.id)
      this.$apollo
        .mutate({
          mutation: UPDATE_TIMETABLE_MUTATION,
          variables: {
            id: parseInt(this.form.id),
            time: this.form.time,
            monday: this.form.monday,
            tuesday: this.form.tuesday,
            wednesday: this.form.wednesday,
            thursday: this.form.thursday,
            friday: this.form.friday,
            klase_id: parseInt(this.klaseId),
            workspaceId: parseInt(this.mainWorkspace.id),
          },
          update: (store, { data: { updateTimetable } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: TIMETABLE_QUERY,
              variables: {
                id: parseInt(updateId),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
            })

            // Mutate cache result
            data.timetable = updateTimetable

            store.writeQuery({
              query: TIMETABLE_QUERY,
              variables: {
                id: parseInt(updateId),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
              data,
            })
          },
        })
        .then(() => {
          this.form.busy = false
          Swal.fire({
            timer: 1000,
            text: 'timetable updated successfully',
            position: 'top-right',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            showConfirmButton: false,
          })
          // this.$bvModal.hide(this.closeModal)
          this.$emit('input', false)
        })
        .catch(() => {
          Swal.fire({
            icon: 'warning',
            text: `There's error proccessing this page!`,
            position: 'top-right',
            color: '#fff',
            background: '#cc3300',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.student {
  font-size: 1.4rem;
  padding: 2rem;

  .student__wrapper {
    background-color: var(--color-white);
    border-radius: 0.5rem;
    border: none;
  }
}
</style>

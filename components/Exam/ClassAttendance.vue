<template>
  <div class="attendance">
    <template v-if="classAttendances[0] == null">
      <h3 class="text-center">No record found</h3>
    </template>

    <template v-else>
      <h2 class="text-center p-4">
        <span style="color: green; font-weight: bold"
          >{{ classAttendances[0].klase.name }} Class Attendance</span
        >
      </h2>

      <b-form
        method="POST"
        @submit.prevent="onLogin"
        @keydown="form.onKeydown($event)"
      >
        <h3 class="text-center">
          Total number of days
          <span style="color: red">{{ classAttendances[0].num_total }} </span>
        </h3>

        <b-row>
          <b-col md="1">
            <b-form-group label="Total Days">
              <b-form-input
                v-model="form.num_total"
                type="number"
                class="mb-3"
                size="lg"
                required
              >
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <div style="width: 80%; margin: auto">
          <table class="table table-striped table-sm align-table">
            <thead class="">
              <tr>
                <th scope="col">S/N</th>
                <th scope="col">Name</th>
                <th scope="col">ADM No.</th>
                <th scope="col">Days Present</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(classAttendance, value) in classAttendances"
                :key="classAttendance.id"
              >
                <td>{{ value + 1 }}</td>

                <td>
                  {{ classAttendance.student.first_name }}
                  {{ classAttendance.student.last_name }}
                </td>

                <td>{{ classAttendance.student.adm_no }}</td>

                <td scope="row">
                  <input
                    v-model="classAttendance.num_present"
                    type="number"
                    min="0"
                    @input="
                      sendAttendance(
                        classAttendance,
                        $event.target.value,
                        'num_present'
                      )
                    "
                    style="width: 6rem; padding-left: 0.5rem"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-center mt-4">
            <b-button size="lg" type="submit" variant="danger" :disabled="busy"
              ><b-spinner
                v-if="busy"
                variant="light"
                small
                class="mr-1 mb-1"
              />Submit</b-button
            >
          </div>
        </div>
      </b-form>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { UPDATE_ATTENDANCE_MUTATION } from '~/graphql/examRecord/mutations'

export default {
  props: {
    classAttendances: Array,
    student: Array,
  },
  data() {
    return {
      mainAttendances: [],
      busy: false,
      form: new this.$form({
        num_total: null,
      }),
    }
  },
  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  methods: {
    sendAttendance(classAttendance, value, keyName) {
      const index = this.mainAttendances.findIndex(
        (mainAttendance) =>
          mainAttendance.classAttendanceId === classAttendance.id
      )
      console.log(index)
      if (index === -1) {
        this.mainAttendances = [
          ...this.mainAttendances,
          {
            classAttendanceId: classAttendance.id,
            [keyName]: value,
          },
        ]
      } else {
        this.mainAttendances = [
          ...this.mainAttendances.slice(0, index),
          {
            ...this.mainAttendances[index],
            [keyName]: value,
          },
          // to account for the remainder
          ...this.mainAttendances.slice(index + 1),
        ]
      }
    },
    onLogin() {
      this.busy = true
      this.$apollo
        .mutate({
          mutation: UPDATE_ATTENDANCE_MUTATION,
          variables: {
            attendances: this.mainAttendances,
            num_total: parseInt(this.form.num_total),
            klase_id: parseInt(this.student[0]),
            term_id: parseInt(this.student[1]),
            session_id: parseInt(this.student[2]),
            section_id: parseInt(this.student[3]),
            workspaceId: parseInt(this.mainWorkspace.id),
          },
        })
        .then(() => {
          Swal.fire({
            title: 'Good',
            icon: 'success',
            text: 'Class attendances added successfully',
            position: 'center',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
          this.busy = false
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.attendance {
  font-size: 1.4rem;
}
</style>

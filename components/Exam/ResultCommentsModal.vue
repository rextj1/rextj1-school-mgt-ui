<template>
  <div>
    <b-modal
      :value="value"
      :visible="value"
      :hide-backdrop="false"
      title="Edit Grade"
      centered
      size="lg"
      :hide-footer="true"
      @change="$emit('input', $event)"
    >
      <div class="margin-down">
        <b-form
          method="POST"
          @submit.prevent="onSubmit"
          @keydown="form.onKeydown($event)"
          @reset.prevent="onReset"
        >
          <b-row>
            <b-col md="2">
              <label for="input-small" class="label-padding"
                >Principal Comment:</label
              >
            </b-col>

            <b-col md="8">
              <b-form-input
                id="p_comment"
                v-model="form.p_comment"
                debounce="500"
                name="p_comment"
                size="md"
                placeholder="Enter principal comment"
              ></b-form-input>
              <b-form-invalid-feedback :state="!form.errors.has('p_comment')">
                {{ form.errors.get('p_comment') }}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="2">
              <label for="input-small" class="label-padding"
                >Teacher Comment:</label
              >
            </b-col>

            <b-col md="8">
              <b-form-input
                id="t_comment"
                v-model="form.t_comment"
                debounce="500"
                name="t_comment"
                size="md"
                placeholder="Enter teacher's comment"
              ></b-form-input>
              <b-form-invalid-feedback :state="!form.errors.has('t_comment')">
                {{ form.errors.get('t_comment') }}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="10" class="p-4 mt-2 mb-4"
              ><b-button
                type="submit"
                variant="primary"
                class="mr-4"
                size="md"
                :disabled="form.busy"
              >
                <b-spinner
                  v-if="form.busy"
                  variant="light"
                  small
                  class="mr-1 mb-1"
                />Submit</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { STUDENT_EXAM_RESULT_QUERIES } from '~/graphql/examRecord/queries'
import { UPDATE_P_TC_OMMENTS_MUTATION } from '~/graphql/examRecord/mutations'
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    studentExamResult: {
      type: Array,
      required: true,
    },
    student: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.form.id = this.studentExamResult[0].id
    this.form.p_comment = this.studentExamResult[0].p_comment
    this.form.t_comment = this.studentExamResult[0].t_comment
  },
  data() {
    return {
      form: new this.$form({
        p_comment: null,
        t_comment: null,
        busy: false,
      }),
    }
  },

  watch: {
    studentExamResult(value) {
      this.setExamRecords(value)
    },
  },

  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  methods: {
    setExamRecords(studentExamResult) {
      this.form.id = studentExamResult[0].id
      this.form.p_comment = studentExamResult[0].p_comment
      this.form.t_comment = studentExamResult[0].t_comment
    },
    onSubmit() {
      this.form.busy = true

      this.$apollo
        .mutate({
          mutation: UPDATE_P_TC_OMMENTS_MUTATION,
          variables: {
            id: parseInt(this.studentExamResult[0].id),
            workspace_id: parseInt(this.mainWorkspace.id),

            p_comment: this.form.p_comment,
            t_comment: this.form.t_comment,
          },
          update: (store, { data: { updatePTComment } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: STUDENT_EXAM_RESULT_QUERIES,
              variables: {
                klase_id: parseInt(this.student[0]),
                student_id: parseInt(this.student[1]),
                term_id: parseInt(this.student[2]),
                session_id: parseInt(this.student[3]),
                section_id: parseInt(this.student[4]),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
            })

            data.studentExamResult[0] = updatePTComment

            // console.log(dataCopy)

            // Write our data back to the cache.
            // Write back to the cache
            store.writeQuery({
              query: STUDENT_EXAM_RESULT_QUERIES,
              variables: {
                klase_id: parseInt(this.student[0]),
                student_id: parseInt(this.student[1]),
                term_id: parseInt(this.student[2]),
                session_id: parseInt(this.student[3]),
                section_id: parseInt(this.student[4]),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
              data,
            })
          },
        })
        .then(() => {
          Swal.fire({
            timer: 1500,
            text: 'comment(s) updated successfully',
            position: 'top-right',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            showConfirmButton: false,
          })
          this.form.busy = false
          this.$emit('input', false)
        })
    },
  },
}
</script>


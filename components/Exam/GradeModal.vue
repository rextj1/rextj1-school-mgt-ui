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
            <b-col md="1">
              <label for="input-small" class="label-padding">Name:</label>
            </b-col>

            <b-col md="8">
              <b-form-input
                id="name"
                v-model="form.name"
                debounce="500"
                name="name"
                size="lg"
                placeholder="Enter name"
                trim
              ></b-form-input>
              <b-form-invalid-feedback :state="!form.errors.has('name')">
                {{ form.errors.get('name') }}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="1">
              <label for="input-small" class="label-padding">Mark From:</label>
            </b-col>

            <b-col md="8">
              <b-form-input
                id="mark_from"
                v-model="form.mark_from"
                debounce="500"
                name="mark_from"
                size="lg"
                placeholder="Enter mark from"
                trim
              ></b-form-input>
              <b-form-invalid-feedback :state="!form.errors.has('mark_from')">
                {{ form.errors.get('mark_from') }}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="1">
              <label for="input-small" class="label-padding">Mark To:</label>
            </b-col>

            <b-col md="8">
              <b-form-input
                id="name"
                v-model="form.mark_to"
                debounce="500"
                name="mark_to"
                size="lg"
                placeholder="Enter mark to"
                trim
              ></b-form-input>
              <b-form-invalid-feedback :state="!form.errors.has('mark_to')">
                {{ form.errors.get('mark_to') }}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="1">
              <label for="input-small" class="label-padding">Remarks:</label>
            </b-col>

            <b-col md="8">
              <b-form-input
                id="name"
                v-model="form.remark"
                debounce="500"
                name="remark"
                size="lg"
                placeholder="Enter remark"
                trim
              ></b-form-input>
              <b-form-invalid-feedback :state="!form.errors.has('remark')">
                {{ form.errors.get('remark') }}
              </b-form-invalid-feedback>
            </b-col>
          </b-row>

          <b-row>
            <b-col md="10" class="p-4 mt-2 mb-4"
              ><b-button
                type="submit"
                variant="primary"
                class="mr-4"
                size="lg"
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
import { UPDATE_GRADE_MUTATION } from '~/graphql/grades/mutations'
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    grade: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.form.id = this.grade.id
    this.form.name = this.grade.name
    this.form.mark_from = this.grade.mark_from
    this.form.mark_to = this.grade.mark_to
    this.form.remark = this.grade.remark
  },
  data() {
    return {
      form: new this.$form({
        name: null,
        mark_from: null,
        mark_to: null,
        remark: null,
        busy: false,
      }),
    }
  },

  watch: {
    grade(value) {
      this.setGrade(value)
    },
  },

  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  methods: {
    setGrade(grade) {
      this.form.id = grade.id
      this.form.name = grade.name
      this.form.mark_from = grade.mark_from
      this.form.mark_to = grade.mark_to
      this.form.remark = grade.remark
    },
    onSubmit() {
      this.form.busy = true
      // submit exam

      this.$apollo
        .mutate({
          mutation: UPDATE_GRADE_MUTATION,
          variables: {
            id: parseInt(this.grade.id),
            workspace_id: parseInt(this.mainWorkspace.id),
            name: this.form.name,
            mark_from: parseInt(this.form.mark_from),
            mark_to: parseInt(this.form.mark_to),
            remark: this.form.remark,
          },
          update: (store, { data: { updateGrade } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: GRADE_QUERIES,
              variables: {
                workspaceId: parseInt(this.mainWorkspace.id),
              },
            })
            // console.log(this.form.class);

            let grade = data.grades.filter((t) => t.id == this.grade.id)

            grade = updateGrade
            // console.log(dataCopy)

            // Write our data back to the cache.
            // Write back to the cache
            store.writeQuery({
              query: GRADE_QUERIES,
              variables: {
                workspaceId: parseInt(this.mainWorkspace.id),
              },
              data,
            })
          },
        })
        .then(() => {
          Swal.fire({
            timer: 1500,
            text: 'grade added successfully',
            position: 'top-right',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            showConfirmButton: false,
          })
          this.form.name = null
          this.form.mark_from = null
          this.form.mark_to = null
          this.form.remark = null
          this.form.busy = false

          this.$emit('input', false)
        })
    },
  },
}
</script>

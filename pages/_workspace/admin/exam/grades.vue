<template>
  <div class="p-3">
    <template v-if="nowLoading"><Preload /></template>
    <template v-else>
      <!-- expense type -->
      <b-card no-body>
        <b-tabs card>
          <b-tab active>
            <template #title>
              <b-icon icon="plus" /><strong>All Grades</strong>
            </template>

            <div class="p-3">
              <h3 class="mb-3">All Grades</h3>
              <b-table :items="grades" :fields="fields">
                <template #cell(#)="data">
                  {{ data.index + 1 }}
                </template>

                <template #cell(action)="data">
                  <b-button
                    variant="primary"
                    size="sm"
                    class="px-3"
                    @click="handleEditGrade(data.item)"
                  >
                    <b-icon icon="pencil" class="mr-1"> </b-icon>
                    Edit
                  </b-button>
                </template>
              </b-table>
            </div>
          </b-tab>

          <b-tab lazy class="p-5 mt-5">
            <template #title>
              <b-icon icon="plus" /><strong>Create Grade</strong>
            </template>
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

                <b-col md="4">
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

              <b-row class="mt-3">
                <b-col md="1">
                  <label for="input-small" class="label-padding"
                    >Mark From:</label
                  >
                </b-col>

                <b-col md="4">
                  <b-form-input
                    id="mark_from"
                    v-model="form.mark_from"
                    debounce="500"
                    name="mark_from"
                    size="lg"
                    placeholder="Enter mark from"
                    trim
                  ></b-form-input>
                  <b-form-invalid-feedback
                    :state="!form.errors.has('mark_from')"
                  >
                    {{ form.errors.get('mark_from') }}
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col md="1">
                  <label for="input-small" class="label-padding"
                    >Mark To:</label
                  >
                </b-col>

                <b-col md="4">
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

              <b-row class="mt-3">
                <b-col md="1">
                  <label for="input-small" class="label-padding"
                    >Remarks:</label
                  >
                </b-col>

                <b-col md="4">
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
          </b-tab>
        </b-tabs>
      </b-card>

      <ExamGradeModal
        v-if="invokeGradeForEdit"
        v-model="showGradeModal"
        :grade="invokeGradeForEdit"
      />
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { KLASE_QUERIES } from '~/graphql/klases/queries'
import { CREATE_GRADE_MUTATION } from '@/graphql/grades/mutations'
import { GRADE_QUERIES } from '@/graphql/grades/queries'
import ExamGradeModal from '~/components/Exam/GradeModal.vue'
import Preload from '~/components/Preload.vue'

export default {
  components: { ExamGradeModal, Preload },
  middleware: 'auth',
  data() {
    return {
      invokeGradeForEdit: null,
      showGradeModal: false,
      form: new this.$form({
        name: null,
        mark_from: null,
        mark_to: null,
        remark: null,
        busy: false,
      }),
      fields: [
        { key: '#', label: 'S/N' },
        { key: 'name' },
        { key: 'mark_from' },
        { key: 'mark_to' },
        { key: 'remark' },
        { key: 'action' },
      ],
    }
  },

  apollo: {
    klases: {
      query: KLASE_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
    grades: {
      query: GRADE_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
  },
  computed: {
    nowLoading() {
      return (
        this.$apollo.queries.klases.loading &&
        this.$apollo.queries.grades.loading
      )
    },
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  methods: {
    handleEditGrade(grade) {
      ;(this.invokeGradeForEdit = grade), (this.showGradeModal = true)
    },
    async onSubmit() {
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: CREATE_GRADE_MUTATION,
            variables: {
              workspace_id: parseInt(this.mainWorkspace.id),
              name: this.form.name,
              mark_from: parseInt(this.form.mark_from),
              mark_to: parseInt(this.form.mark_to),
              remark: this.form.remark,
            },
            update: (store, { data: { createGrade } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: GRADE_QUERIES,
                variables: {
                  workspaceId: parseInt(this.mainWorkspace.id),
                },
              })

              data.grades.push(createGrade)

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
          })
      } catch ({ graphQLErrors: errors }) {
        this.form.busy = false
        if (errors && errors.length > 0) {
          const validationErrors = errors.filter(
            (err) => err.extensions.category === 'validation'
          )
          validationErrors.forEach((err) => {
            this.form.errors.set(err.extensions.validation)
          })
        }
      }
    },

    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form = ''
      // this.form.photo = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>

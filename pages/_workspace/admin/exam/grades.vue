<template>
  <div class="p-4">
    <div v-if="nowLoading"><Preload /></div>
    <div class="libarian__wrapper" v-else>
      <div class="margin-down">
        <!-- expense type -->
        <b-card no-body>
          <b-tabs card>
            <b-tab active>
              <template #title>
                <b-icon icon="plus" /><strong>All Grades</strong>
              </template>
              <div class="p-4">
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
              </div>
            </b-tab>

            <b-tab lazy class="p-5">
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
                    <label for="input-small" class="label-padding"
                      >Mark From:</label
                    >
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
                    <b-form-invalid-feedback
                      :state="!form.errors.has('mark_from')"
                    >
                      {{ form.errors.get('mark_from') }}
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="1">
                    <label for="input-small" class="label-padding"
                      >Mark To:</label
                    >
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
                    <b-form-invalid-feedback
                      :state="!form.errors.has('mark_to')"
                    >
                      {{ form.errors.get('mark_to') }}
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="1">
                    <label for="input-small" class="label-padding"
                      >Remarks:</label
                    >
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
                    <b-form-invalid-feedback
                      :state="!form.errors.has('remark')"
                    >
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
            </b-tab>
          </b-tabs>
        </b-card>
      </div>

      <ExamGradeModal
        v-if="invokeGradeForEdit"
        v-model="showGradeModal"
        :grade="invokeGradeForEdit"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { KLASE_QUERIES } from '~/graphql/klases/queries'
import { CREATE_GRADE_MUTATION } from '@/graphql/grades/mutations'
import { GRADE_QUERIES } from '@/graphql/grades/queries'

export default {
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
        { key: '#' },
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
    handleEditGrade(grade){
      this.invokeGradeForEdit = grade,
      this.showGradeModal = true
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
              // console.log(this.form.class);

              data.grades.push(createGrade)
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

<style lang="scss">
.libarian__wrapper {
  padding: 2rem;
  font-size: 1.4rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: none;

  .margin-down {
    .label-padding {
      padding-right: 15rem;
      margin-bottom: 5rem;
    }

    .custom-select:focus,
    .form-control.focus,
    .form-control:focus {
      box-shadow: none;
    }

    .custom-select,
    .form-control,
    .mb-3 {
      height: 4rem;
      font-size: 1.4rem;
      color: #000;
      width: 40.6%;
    }
  }
  .table-down {
    padding: 4rem;

    .table {
      margin-bottom: 4rem;
    }
  }

  .custom-select-lg .nav-link.active {
    border-top: 5px solid limegreen;
  }

  .card-body {
    padding: 0;
    .card-student {
      border: none;
      border-radius: 0.5rem;
      height: auto;

      .input-group > .input-group-append > .btn,
      .input-group > .input-group-append > .input-group-text {
        background: var(--color-primary);
        color: #fff;
        font-size: 1rem !important;
      }
      .input-group:not(.has-validation) > .custom-select:not(:last-child),
      .input-group > .form-control:not(:first-child),
      .input-group > .custom-select:not(:first-child),
      .custom-select {
        height: 3rem;
        font-size: 1.2rem;
      }
      .form-control,
      .mb-3 {
        height: 3rem;
        font-size: 1.2rem;
      }
    }
  }
}
</style>

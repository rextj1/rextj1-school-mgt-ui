<template>
  <div class="p-4">
    <template v-if="nowLoading"><Preload /></template>
    <template v-else>
      <div class="libarian__wrapper">
        <b-card no-body>
          <b-tabs card style="font-size: 1.4rem">
            <b-tab active>
              <template #title>
                <b-icon icon="plus" /><strong>Create Subjects</strong>
              </template>

              <div class="p-4">
                <div class="p-3">
                  <h3 class="mb-3">All Classes</h3>
                  <b-table :items="subjects" :fields="fields">
                    <template #cell(#)="data">
                      {{ data.index + 1 }}
                    </template>
                    <template #cell(subject)="data">
                      <div v-if="subjectEditingId == data.item.id">
                        <b-row no-gutters>
                          <b-col md="4">
                            <input
                              v-model="form.subjects"
                              style="width: 10rem"
                              type="text"
                              required
                              size="lg"
                              @blur="updatingSubject(data.value)"
                              @keydown.enter="editFiled(data.item.id)"
                            />
                          </b-col>
                        </b-row>
                      </div>

                      <div v-else @click="setToEditing(data.item.id)">
                        {{ data.item.subject }}
                      </div>
                    </template>

                    <!-- teachers -->
                    <template #cell(teachers)="data">
                      <b-badge
                        :id="`teachers-${data.index}`"
                        variant="info"
                        class="px-2"
                      >
                        {{ data.value.length }} Teacheers
                      </b-badge>
                      <b-popover
                        v-if="data.value.length > 0"
                        :target="`teachers-${data.index}`"
                        triggers="hover click"
                      >
                        <b-nav vertical>
                          <b-nav-item
                            v-for="teacher in data.value"
                            :key="teacher.id"
                          >
                            <h5 style="font-size: 1.3rem">
                              <nuxt-link :to="`/admin/teacher/${teacher.slug}`">
                                {{ teacher.first_name }}
                                {{ teacher.last_name }}</nuxt-link
                              >
                            </h5>
                          </b-nav-item>
                        </b-nav>
                      </b-popover>
                    </template>

                    <template #cell(actions)="data">
                      <b-button
                        variant="primary"
                        size="sm"
                        class="px-3"
                        @click="setToEditing(data.item.id)"
                      >
                        <b-icon icon="pencil" class="mr-1"> </b-icon>
                        Edit
                      </b-button>
                      <b-button
                        variant="danger"
                        size="sm"
                        class="px-3"
                        @click="deleteSubject(data.item.id)"
                      >
                        Revoke teacher
                      </b-button>
                    </template>
                  </b-table>
                </div>
              </div>

              <!-- Add Classes -->
              <div class="margin-down">
                <!-- description -->
                <b-form
                  v-if="show"
                  method="POST"
                  @submit.prevent="onSubmitCreate"
                  @keydown="form.onKeydown($event)"
                  @reset.prevent="onReset"
                >
                  <!-- description -->
                  <b-row no-gutters>
                    <b-col md="2">
                      <label
                        for="input-small"
                        class="label-padding"
                        style="font-size: 2rem"
                        >Name:</label
                      >
                    </b-col>

                    <b-col md="8">
                      <div class="d-flex">
                        <b-form-input
                          v-model="form.subject"
                          placeholder="Enter class"
                          type="text"
                          required
                          size="lg"
                        ></b-form-input>

                        <b-button
                          type="submit"
                          variant="primary"
                          class="mr-4"
                          size="lg"
                        >
                          <b-spinner
                            v-if="form.busy"
                            variant="light"
                            class="mr-1 mb-1"
                            small
                          />Add Subject</b-button
                        >
                      </div>
                    </b-col>
                  </b-row>
                </b-form>
              </div>
            </b-tab>

            <b-tab>
              <template #title>
                <strong>Assign Teachers</strong>
              </template>
              <h2 class="p-4">Assign Subjects to Teacher</h2>
              <hr />

              <div class="margin-down">
                <!-- description -->

                <b-form
                  v-if="show"
                  method="POST"
                  @submit.prevent="assignSubjectToTeacher"
                  @keydown="form.onKeydown($event)"
                  @reset.prevent="onReset"
                >
                  <b-row class="mb-4">
                    <b-col md="2">
                      <label for="input-small" class="label-padding"
                        >Subjects:</label
                      >
                    </b-col>

                    <b-col md="8">
                      <b-form-group>
                        <b-form-select
                          id="subjects"
                          v-model="subjectx"
                          style="height: 20rem"
                          value-field="id"
                          text-field="subject"
                          :options="subjects"
                          multiple
                          required
                          class="mb-3"
                          size="lg"
                        >
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <b-row class="py-4">
                    <b-col md="2">
                      <label for="input-small" class="label-padding"
                        >Assign Teacher:</label
                      >
                    </b-col>
                    <b-col md="8">
                      <b-form-group label="">
                        <b-form-select
                          id="teachers"
                          v-model="form.teacher"
                          value-field="id"
                          text-field="first_name"
                          :options="teachers"
                          class="mb-3"
                          size="lg"
                        >
                          <!-- This slot appears above the options from 'options' prop -->
                          <template #first>
                            <b-form-select-option :value="null" disabled
                              >-- select teacher--</b-form-select-option
                            >
                          </template>

                          <!-- These options will appear after the ones from 'options' prop -->
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col
                      md="10"
                      class="d-flex justify-content-center p-4 mt-2 mb-4"
                      ><b-button
                        type="submit"
                        variant="primary"
                        class="mr-4"
                        size="lg"
                      >
                        <b-spinner
                          v-if="busy"
                          variant="light"
                          class="mr-1 mb-1"
                          small
                        />Submit</b-button
                      >
                    </b-col>
                  </b-row>
                </b-form>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </template>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { SUBJECT_QUERIES, SUBJECT_QUERY } from '@/graphql/subjects/queries'
import {
  UPDATE_SUBJECT_MUTATION,
  CREATE_SUBJECT_MUTATION,
  DELETE_SUBJECT_MUTATION,
  ASSIGN_SUBJECT_TO_TEACHER_MUTATION,
} from '@/graphql/subjects/mutations'
import { TEACHER_QUERIES } from '~/graphql/teachers/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      id: 0,
      subjects: [],
      teachers: [],
      subjectEditingId: '',
      editSlug: '',
      subject: {},
      subjectx: [],
      busy: false,
      form: new this.$form({
        id: 0,
        klase: null,
        subject: null,
        subjects: [],
        teacher: null,
        busy: false,
      }),
      fields: [
        {
          key: '#',
          sortable: false,
        },
        {
          key: 'subject',
          sortable: false,
        },
        { key: 'teachers' },
        {
          key: 'actions',
          sortable: false,
        },
      ],
      show: true,
    }
  },
  apollo: {
    subjects: {
      query: SUBJECT_QUERIES,
    },

    teachers: {
      query: TEACHER_QUERIES,
    },
  },
  computed: {
    nowLoading() {
      return (
        this.$apollo.queries.subjects.loading &&
        this.$apollo.queries.teachers.loading
      )
    },
  },

  methods: {
    // inline editing
    setToEditing(item) {
      this.subjectEditingId = item
      this.id = item

      if (this.id > 0) {
        this.$apollo.addSmartQuery('subject', {
          query: SUBJECT_QUERY,
          variables() {
            return {
              id: parseInt(this.id),
            }
          },
          result({ data, loading }) {
            if (!loading) {
              this.form.id = parseInt(data.subject.id)
              this.form.subjects = data.subject.subject
            }
          },
        })
      }
    },
    updatingSubject() {
      this.subjectEditingId = ''
    },
    // ------- edit ----//
    editFiled(item) {
      this.$apollo
        .mutate({
          mutation: UPDATE_SUBJECT_MUTATION,
          variables: {
            id: parseInt(item),
            subject: this.form.subjects,
          },
        })
        .then(() => {
          this.subjectEditingId = ''
        })
        .catch((e) => {
          console.log(e)
        })
    },

    // ------create --------//
    async onSubmitCreate() {
      this.form.busy = true
      // const subjectVariable = this.form.subject
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: CREATE_SUBJECT_MUTATION,
            variables: {
              subject: this.form.subject,
            },
            update: (store, { data: { createSubject } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: SUBJECT_QUERIES,
              })
              // console.log(this.form.class);

              data.subjects.push(createSubject)
              // console.log(dataCopy)

              // Write our data back to the cache.
              // Write back to the cache
              store.writeQuery({
                query: SUBJECT_QUERIES,
                data,
              })
            },
          })
          .then(() => {
            this.form.subject = ''
          })

        this.form.busy = false
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

    // ------delete ----------/
    deleteSubject(item) {
      const deleteId = item
      this.$apollo
        .mutate({
          mutation: DELETE_SUBJECT_MUTATION,
          variables: {
            id: parseInt(deleteId),
          },
          update: (store, { data: { deleteSubject } }) => {
            const data = store.readQuery({
              query: SUBJECT_QUERIES,
            })

            const index = data.subjects.findIndex((m) => m.id == deleteId)
            if (index !== -1) {
              // Mutate cache result
              data.subjects.splice(index, 1)

              store.readQuery({
                query: SUBJECT_QUERIES,
                data,
              })
            }
          },
        })
        .then(() => {
          Swal.fire({
            timer: 1000,
            text: 'subject removed successfully',
            position: 'top-right',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
          })
        })
        .catch((e) => {
          console.log(e)
          // this.klase_id =
        })
    },

    async assignSubjectToTeacher() {
      if (this.subjectx === [] || this.form.teacher === null) {
        return false
      } else {
        this.subjectx.forEach((element) => {
          const intValue = parseInt(element)
          this.form.subjects.push(intValue)
        })
      }

      this.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: ASSIGN_SUBJECT_TO_TEACHER_MUTATION,
            variables: {
              subjects: this.form.subjects,
              teacher: parseInt(this.form.teacher),
            },
          })
          .then(() => {
            this.busy = false
            this.form.subjects = []
            this.form.teacher = ''
            Swal.fire({
              title: 'Done...',
              icon: 'success',
              timer: 1500,
              text: 'Teacher(s) assigned successfully',
              position: 'center',
              color: '#fff',
              background: '#4bb543',
              toast: false,
              backdrop: false,
              showConfirmButton: false,
            })
          })

        this.form.busy = false
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

  option {
    padding: 0.3rem;
  }

  .margin-down {
    margin-top: 5rem;

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
}
</style>

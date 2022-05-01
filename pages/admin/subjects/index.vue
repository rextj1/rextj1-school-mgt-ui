<template>
  <div class="p-4">
    <template v-if="!subjects">
      <div style="background-color: #f1f9ae; width: 100%; height: 100vh">
        <div class="grow">
          <b-spinner
            style="width: 30rem; height: 30rem"
            type="grow"
            variant="danger"
          ></b-spinner>
        </div></div
    ></template>
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
                            <b-form-input
                              v-model="form.subjects"
                              type="text"
                              required
                              size="lg"
                              @blur="updatingSubject(data.value)"
                              @keydown.enter="editFiled(data.item.id)"
                            ></b-form-input>
                          </b-col>
                        </b-row>
                      </div>

                      <div v-else @click="setToEditing(data.item.id)">
                        {{ data.item.subject }}
                      </div>
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
                        <b-icon icon="trash" class="mr-1"></b-icon>
                        Delete
                      </b-button>
                    </template>
                  </b-table>
                </div>
              </div>

              <!-- Info modal -->
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
                          trim
                          type="text"
                          required
                          size="lg"
                        ></b-form-input>
                        <!-- <b-form-invalid-feedback :state="!form.errors.has('lastName')">
                      {{ form.errors.get('lastName') }}
                      </b-form-invalid-feedback> -->
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
              <h2 class="p-4">Create Subjects And Assign Teacher</h2>
              <hr />

              <div class="margin-down">
                <!-- description -->
                <b-row class="mb-4">
                  <b-col md="2">
                    <label for="input-small" class="label-padding"
                      >Subjects:</label
                    >
                  </b-col>
                  <b-col md="8">
                    <b-form-select
                      size="lg"
                      v-model="form.subject"
                      :options="subjects"
                    ></b-form-select>
                  </b-col>
                </b-row>

                <b-row class="mb-4">
                  <b-col md="2">
                    <label for="input-small" class="label-padding"
                      >Class:</label
                    >
                  </b-col>
                  <b-col md="8">
                    <b-form-select
                      size="lg"
                      v-model="form.klase"
                      :options="klases"
                      multiple
                      style="height: 12rem"
                    ></b-form-select>
                  </b-col>
                </b-row>

                <b-row class="py-4">
                  <b-col md="2">
                    <label for="input-small" class="label-padding"
                      >Assign Teacher:</label
                    >
                  </b-col>
                  <b-col md="8">
                    <b-form-select
                      size="md"
                      v-model="form.teacher"
                      :options="teachers"
                    ></b-form-select>
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
                        v-if="form.busy"
                        variant="light"
                        class="mr-1 mb-1"
                      />Submit</b-button
                    >
                  </b-col>
                </b-row>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </template>
  </div>
</template>

<script>
import { SUBJECT_QUERIES, SUBJECT_QUERY } from '@/graphql/subjects/queries'
import {
  UPDATE_SUBJECT_MUTATION,
  CREATE_SUBJECT_MUTATION,
  DELETE_SUBJECT_MUTATION,
} from '@/graphql/subjects/mutations'
export default {
   middleware: 'auth',
  data() {
    return {
      id: 0,
      subjectEditingId: '',
      editSlug: '',
      subject: {},

      form: new this.$form({
        id: 0,
        klase: [],
        subject: '',
        subjects: '',
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
        {
          key: 'actions',
          sortable: false,
        },
      ],
      show: true,
      teachers: ['Mark Cool', 'Jame Ruth', 'Evans Rain', 'Crah Loveth'],
      klases: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'],
    }
  },
  apollo: {
    subjects: {
      query: SUBJECT_QUERIES,
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
        .then(({ data }) => {
            this.subjectEditingId = ''
          })
        .catch((error) => {
          error
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
          .then(({ data }) => {
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

    //------delete ----------/
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
        .then(({ data }) => {
          // this.$router.push('/admin/teacher')
        })
        .catch((err) => {
          // this.klase_id =
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
<template>
  <div class="p-3">
    <template v-if="nowLoading"><Preload /></template>
    <template v-else>
      <b-card class="mb-2 d-flex">
        <b-form @submit.prevent="timetableDropdown">
          <b-row no-gutters>
            <b-col md="3">
              <b-form-group label="Current Class:">
                <b-form-select
                  id="klase"
                  v-model="form.class"
                  value-field="id"
                  text-field="name"
                  :options="klases"
                  size="lg"
                  required
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- select class --</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="3" class="ml-2">
              <b-form-group label="Current Section:">
                <b-form-select
                  id="klase"
                  v-model="form.section"
                  value-field="id"
                  text-field="name"
                  :options="sections"
                  size="lg"
                  required
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- select section --</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-button
              type="submit"
              variant="primary"
              size="md"
              style="height: 45px; margin-top: 32px"
              :disabled="isBusy"
              ><b-spinner
                class="mr-1 mb-1"
                small
                variant="light"
                v-if="isBusy"
              />Submit</b-button
            >
          </b-row>
        </b-form>
      </b-card>

      <!--  -->
      <div
        v-show="timetableDropdownClass"
        class="p-4"
        style="background-color: #fff"
        @click="hideMenu"
      >
        <b-card no-body @click="hideMenu">
          <b-tabs card>
            <b-tab active @click="hideMenu">
              <template #title>
                <b-icon icon="plus" /><strong>Create Subjects</strong>
              </template>

              <div class="p-4">
                <div class="p-3">
                  <h4 class="mb-3">All Classes</h4>
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
                            <h5>
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
                        v-if="data.item.id == loadingId"
                        variant="danger"
                        size="sm"
                        class="px-3"
                        @click="deleteSubject(data.item.id)"
                      >
                        <b-spinner
                          class="mb-1 mr-1"
                          small
                          variant="light"
                          v-if="loading"
                        />
                        Revoke teacher
                      </b-button>

                      <b-button
                        v-else
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
                        style="font-size: 18px"
                        >Name:</label
                      >
                    </b-col>

                    <b-col md="4">
                      <b-form-group>
                        <b-form-input
                          v-model="form.subject"
                          placeholder="Enter subject"
                          type="text"
                          required
                          size="lg"
                        ></b-form-input>
                        <b-form-invalid-feedback
                          :state="!form.errors.has('subject')"
                        >
                          {{ form.errors.get('subject') }}
                        </b-form-invalid-feedback>
                      </b-form-group>

                      <b-button
                        type="submit"
                        variant="primary"
                        class="mr-4"
                        size="md"
                        :disabled="form.busy"
                      >
                        <b-spinner
                          v-if="form.busy"
                          variant="light"
                          class="mr-1 mb-1"
                          small
                        />Add Subject</b-button
                      >
                    </b-col>
                  </b-row>
                </b-form>
              </div>
            </b-tab>

            <b-tab>
              <template #title>
                <strong>Assign Teachers</strong>
              </template>

              <div class="margin-down">
                <!-- description -->

                <b-form
                  method="POST"
                  @submit.prevent="assignSubjectToTeacher"
                  @keydown="form.onKeydown($event)"
                  @reset.prevent="onReset"
                >
                  <b-row class="mb-4">
                    <b-col md="2">
                      <h5 for="input-small" class="label-padding"
                        >Subjects:</h5
                      >
                    </b-col>

                    <b-col md="4">
                      <b-form-group>
                        <b-form-select
                          id="subjects"
                          v-model="subjectx"
                          style="height: 18rem"
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
                      <h5 for="input-small" class="label-padding"
                        >Assign Teacher:</h5
                      >
                    </b-col>
                    <b-col md="4">
                      <b-form-group label="">
                        <b-form-select
                          id="teachers"
                          v-model="form.teacher"
                          value-field="id"
                          text-field="first_name"
                          :options="teachers"
                          required
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
                        :disabled="busy"
                        size="md"
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
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { SUBJECT_QUERIES, SUBJECT_QUERY } from '@/graphql/subjects/queries'
import {
  UPDATE_SUBJECT_MUTATION,
  CREATE_SUBJECT_MUTATION,
  DELETE_SUBJECT_MUTATION,
  ASSIGN_SUBJECT_TO_TEACHER_MUTATION,
} from '@/graphql/subjects/mutations'
import { TEACHERS_QUERIES } from '~/graphql/teachers/queries'
import { KLASE_QUERIES } from '~/graphql/klases/queries'
import { SECTION_QUERIES } from '~/graphql/sections/queries'
import Preload from '~/components/Preload.vue'

export default {
  components: { Preload },
  middleware: 'auth',
  data() {
    return {
      isBusy: false,
      loading: false,
      loadingId: null,
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
        class: null,
        section: null,
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
      timetableDropdownClass: false,
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

    sections: {
      query: SECTION_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
          klase_id: parseInt(this.form.class),
        }
      },
    },

    teachers: {
      query: TEACHERS_QUERIES,
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
        this.$apollo.queries.teachers.loading
      )
    },
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  methods: {
    hideMenu() {
      if (this.registerMenu === true) {
        this.registerMenu = false
        this.registrationMenuClass = ''
      }
    },
    timetableDropdown() {
      this.isBusy = true
      this.timetableDropdownClass = false

      if (this.form.class === null && this.form.section === null) {
        return false
      } else {
        this.$apollo.addSmartQuery('subjects', {
          query: SUBJECT_QUERIES,
          variables() {
            return {
              workspaceId: parseInt(this.mainWorkspace.id),
              klase_id: parseInt(this.form.class),
              section_id: parseInt(this.form.section),
            }
          },
          result({ data, loading }) {
            if (!loading) {
              this.subjects = data.subjects
              this.isBusy = false
              this.timetableDropdownClass = true
            }
          },
        })
      }
    },

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
              workspaceId: parseInt(this.mainWorkspace.id),
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
            workspaceId: parseInt(this.mainWorkspace.id),
          },
        })
        .then(() => {
          this.subjectEditingId = ''
          Swal.fire({
            text: `subject updated successfully!`,
            position: 'top-right',
            color: '#fff',
            background: '#5cb85c',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
        })
        .catch(({ graphQLErrors }) => {
          this.form.busy = false

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
              workspaceId: parseInt(this.mainWorkspace.id),
              klase_id: parseInt(this.form.class),
              section_id: parseInt(this.form.section),
            },
            update: (store, { data: { createSubject } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: SUBJECT_QUERIES,
                variables: {
                  workspaceId: parseInt(this.mainWorkspace.id),
                  klase_id: parseInt(this.form.class),
                  section_id: parseInt(this.form.section),
                },
              })
              // console.log(this.form.class);

              data.subjects.push(createSubject)

              // Write our data back to the cache.
              // Write back to the cache
              store.writeQuery({
                query: SUBJECT_QUERIES,
                variables: {
                  workspaceId: parseInt(this.mainWorkspace.id),
                  klase_id: parseInt(this.form.class),
                  section_id: parseInt(this.form.section),
                },
                data,
              })
            },
          })
          .then(() => {
            this.form.subject = ''
            Swal.fire({
              text: `subject added successfully!`,
              position: 'top-right',
              color: '#fff',
              background: '#5cb85c',
              toast: false,
              backdrop: false,
              timer: 1500,
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

    // ------delete ----------/
    deleteSubject(item) {
      this.loading = true
      const deleteId = item
      this.loadingId = deleteId
      this.$apollo
        .mutate({
          mutation: DELETE_SUBJECT_MUTATION,
          variables: {
            id: parseInt(deleteId),
          },
          update: (store, { data: { deleteSubject } }) => {
            const data = store.readQuery({
              query: SUBJECT_QUERIES,
              variables: {
                workspaceId: parseInt(this.mainWorkspace.id),
              },
            })

            data.subjects.filter((m) => m.id !== deleteId)
            data.subjects = deleteSubject

            // const index = data.subjects.findIndex((m) => m.id == deleteId)

            store.readQuery({
              query: SUBJECT_QUERIES,
              variables: {
                workspaceId: parseInt(this.mainWorkspace.id),
              },
              data,
            })
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
          this.loading = false
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

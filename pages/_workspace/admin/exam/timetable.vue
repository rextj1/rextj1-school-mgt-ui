<template>
  <div class="p-3 exam-timetable">
    <template v-if="$apollo.queries.klases.loading"><Preload /></template>
    <template v-else>
      <b-card class="mb-4 d-flex">
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
              style="height: 48px; margin-top: 33px"
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

      <div
        v-show="timetableDropdownClass"
        class="timetable__wrapper"
        @click="hideMenu"
      >
        <div v-if="examTimetables.length > 0">
          <b-card no-body @click="hideMenu">
            <b-tabs card>
              <b-tab active @click="hideMenu">
                <template #title>
                  <strong>Create Timetable</strong>
                  <b-icon scale="0.8" icon="plus" />
                </template>

                <h3 class="text-center mb-4">
                  <!-- <div v-for="time in timetable[0]" :key="time.id">
                    {{ time['name'] }}
                  </div> -->
                  Exam Timetable
                </h3>

                <b-card>
                  <b-table
                    hover
                    bordered
                    head-variant="dark"
                    caption-top
                    no-border-collapse
                    :responsive="true"
                    :items="examTimetables"
                    :fields="fields"
                  >
                    <template #cell(Action)="data">
                      <div class="d-flex">
                        <b-button
                          variant="primary"
                          size="smd"
                          @click="timetableEdit(data.item.id)"
                          >Edit</b-button
                        >

                        <b-button
                          variant="danger"
                          size="smd"
                          class="ml-2"
                          @click="handleDeleteExamTimetable(data.item)"
                          >Delete</b-button
                        >
                      </div>
                    </template>
                  </b-table>
                </b-card>

                <!-- Info modal -->
                <b-modal
                  :id="infoModal"
                  class="modal"
                  :hide-backdrop="false"
                  title="Edit  Data"
                  centered
                  size="xl"
                  :hide-footer="true"
                >
                  <AdminEditExamTimetableModal
                    :slug="[slug, form.class, infoModal]"
                  />
                </b-modal>
                <!-- end modal -->

                <div class="exam-timetble">
                  <b-form
                    v-show="show"
                    method="POST"
                    @submit.prevent="onSubmit"
                    @keydown="form.onKeydown($event)"
                  >
                    <table class="w-100 table table-bordered table-responsive">
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
                      <b-button
                        type="submit"
                        variant="primary"
                        class="mr-4"
                        size="md"
                      >
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
              </b-tab>

              <b-tab lazy @click="registrationMenu">
                <template #title>
                  <strong>Exam Timetable</strong>
                  <b-icon scale="0.8" icon="caret-down-fill" />
                </template>

                <div class="menu" style="background-color: #fff">
                  <ul
                    v-show="registerMenu"
                    class="shadow"
                    :class="registrationMenuClass"
                  >
                    <span v-for="klase in klases" :key="klase.id">
                      <li
                        @click.prevent="
                          dynamicStudentClass(klase.id, klase.name)
                          activeTab = 'TimetableEditClassExamTimetable'
                        "
                      >
                        <span class="d-flex">{{ klase.name }}</span>
                      </li>
                    </span>
                  </ul>
                </div>

                <component
                  :is="activeTab"
                  :edit-current-class="[dynamicClass, klaseName, form.section]"
                />
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
        <div v-else>
          <h3 class="p-5 text-center">No record found</h3>
        </div>

        <!-- delete modal -->
        <b-modal id="DeleteModal" centered hide-header hide-footer>
          <div class="p-5 text-center">
            <Spinner v-if="isDeleting" size="4" />
            <template v-else>
              <h5>Confirm delete Exam timetable?</h5>

              <p>This action cannot be undone.</p>

              <div>
                <b-button
                  variant="light"
                  class="px-4 mr-2 border"
                  @click="handleCancelDelete"
                >
                  Cancel
                </b-button>

                <b-button
                  variant="danger"
                  class="px-4"
                  @click="deleteInvokedExamTimetable"
                >
                  Delete
                </b-button>
              </div>
            </template>
          </div>
        </b-modal>
        <!-- end -->
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { KLASE_QUERIES } from '~/graphql/klases/queries'
import { EXAM_TIMETABLE_QUERIES } from '~/graphql/examTimetables/queries'

import {
  CREATE_EXAM_TIMETABLE_MUTATION,
  DELETE_EXAM_TIMETABLE_MUTATION,
} from '~/graphql/examTimetables/mutations'
import { SECTION_QUERIES } from '~/graphql/sections/queries'
import Preload from '~/components/Preload.vue'
import Spinner from '~/components/Global/Spinner.vue'
import TimetableEditClassExamTimetable from '~/components/Timetable/EditClassExamTimetable.vue'
import AdminEditExamTimetableModal from '~/components/AdminEdit/ExamTimetableModal.vue'

export default {
  components: {
    AdminEditExamTimetableModal,
    TimetableEditClassExamTimetable,
    Preload,
    Spinner,
  },
  middleware: 'auth',
  data() {
    return {
      isBusy: false,
      examTimetables: [],
      infoModal: 'modelInfo',
      slug: '',
      timetableDropdownClass: false,
      id: 0,
      klaseName: '',
      show: true,
      form: new this.$form({
        class: null,
        section: null,
        date: null,
        time: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        busy: false,
      }),
      fields: [
        { key: 'date', label: 'Date' },
        { key: 'time', label: 'Time' },
        { key: 'monday', label: 'Monday' },

        { key: 'tuesday', label: 'Tuesday' },

        { key: 'wednesday', label: 'Wednesday' },

        { key: 'thursday', label: 'Thursday' },

        { key: 'friday', label: 'Friday' },
        { key: 'Action', label: 'Action' },
      ],
      invokedForDelete: null,
      isDeleting: false,
      dynamicClass: '',

      activeTab: '',
      registerMenu: false,
      registrationMenuClass: '',
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
  },
  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  methods: {
    // modal
    timetableEdit(item) {
      this.$bvModal.show(this.infoModal)
      this.slug = item
    },
    // end modal
    dynamicStudentClass(item, itemName) {
      this.dynamicClass = item
      this.klaseName = itemName
    },
    registrationMenu(e) {
      if (this.registrationMenuClass === '') {
        this.registerMenu = true
        this.registrationMenuClass = 'off'
        e.stopPropagation()
      } else {
        this.registerMenu = false
        this.registrationMenuClass = ''
      }
    },
    hideMenu() {
      if (this.registerMenu === true) {
        this.registerMenu = false
        this.registrationMenuClass = ''
      }
    },
    timetableDropdown() {
      this.isBusy = true
      this.timetableDropdownClass = false
      this.$apollo.addSmartQuery('examTimetables', {
        query: EXAM_TIMETABLE_QUERIES,
        variables() {
          return {
            klase_id: parseInt(this.form.class),
            section_id: parseInt(this.form.section),
            workspaceId: parseInt(this.mainWorkspace.id),
          }
        },
        result({ data, loading }) {
          if (!loading) {
            this.examTimetables = data.examTimetables
            this.isBusy = false
            this.timetableDropdownClass = true
          }
        },
      })
    },

    // -------- create mutation -------------- //
    onSubmit() {
      if (
        this.form.date === null &&
        this.form.time === null &&
        this.form.monday === null &&
        this.form.tuesday === null &&
        this.form.wednesday === null &&
        this.form.thursday === null &&
        this.form.friday === null
      ) {
      } else {
        const klaseId = this.form.class
        this.form.busy = true
        this.$apollo
          .mutate({
            mutation: CREATE_EXAM_TIMETABLE_MUTATION,
            variables: {
              date: this.form.date,
              time: this.form.time,
              monday: this.form.monday,
              tuesday: this.form.tuesday,
              wednesday: this.form.wednesday,
              thursday: this.form.thursday,
              friday: this.form.friday,
              klase_id: parseInt(this.form.class),
              section_id: parseInt(this.form.section),
              workspaceId: parseInt(this.mainWorkspace.id),
            },
            update: (store, { data: { createExamTimetable } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: EXAM_TIMETABLE_QUERIES,
                variables: {
                  klase_id: parseInt(klaseId),
                  section_id: parseInt(this.form.section),
                  workspaceId: parseInt(this.mainWorkspace.id),
                },
              })

              data.examTimetables.push(createExamTimetable)

              // Write our data back to the cache.
              // Write back to the cache
              store.writeQuery({
                query: EXAM_TIMETABLE_QUERIES,
                variables: {
                  klase_id: parseInt(klaseId),
                  section_id: parseInt(this.form.section),
                  workspaceId: parseInt(this.mainWorkspace.id),
                },
                data,
              })
            },
          })
          .then(() => {
            this.form.busy = false
            this.form.date = ''
            this.form.time = ''
            this.form.monday = ''
            this.form.tuesday = ''
            this.form.wednesday = ''
            this.form.thursday = ''
            this.form.friday = ''

            // this.$router.push('/admin/exam/timetable')
          })
          .catch(() => {})
      }
    },
    // -------- end mutation -------------- //

    // delete

    handleCancelDelete() {
      this.invokedForDelete = null

      this.$bvModal.hide('DeleteModal')
    },

    handleDeleteExamTimetable(item) {
      this.invokedForDelete = item

      this.$bvModal.show('DeleteModal')
    },

    // -------- delete mutation -------------- //

    deleteInvokedExamTimetable() {
      this.isDeleting = true
      const klaseId = this.form.class
      const deleteId = this.invokedForDelete.id

      this.$apollo
        .mutate({
          mutation: DELETE_EXAM_TIMETABLE_MUTATION,
          variables: {
            id: parseInt(deleteId),
            workspaceId: parseInt(this.mainWorkspace.id),
          },
          update: (store, { data: { deleteExamTimetable } }) => {
            const data = store.readQuery({
              query: EXAM_TIMETABLE_QUERIES,
              variables: {
                klase_id: parseInt(klaseId),
                section_id: parseInt(this.form.section),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
            })

            const index = data.examTimetables.findIndex((m) => m.id == deleteId)
            if (index !== -1) {
              // Mutate cache result
              data.examTimetables.splice(index, 1)

              store.readQuery({
                query: EXAM_TIMETABLE_QUERIES,
                variables: {
                  klase_id: parseInt(klaseId),
                  section_id: parseInt(this.form.section),
                  workspaceId: parseInt(this.mainWorkspace.id),
                },
                data,
              })
            }
          },
        })
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          this.$bvModal.hide('DeleteModal')

          this.isDeleting = false
        })
    },
    // -------- end mutation -------------- //
  },
}
</script>

<style lang="scss" scoped>
.exam-timetable {
  .custom-select:focus {
    box-shadow: none;
  }

  .custom-select,
  .form-control,
  .mb-3 {
    height: 53px;
    font-size: 16px;
    color: #000;
  }
  .timetable__wrapper {
    background-color: var(--color-white);
    border-radius: 5px;
    border: none;

    .nav-link.active {
      border-top: 5px solid limegreen;
    }

    .menu {
      ul {
        z-index: 999;
        position: absolute;
        border: none;
        top: -95px;
        left: 195px;
        background-color: #fff;
      }

      li {
        background-color: #fff;
        padding: 16px 70px;
        border-bottom: 1px solid gray;
        cursor: pointer;

        &:hover {
          background-color: var(--color-input);
        }
      }
    }
  }
}
</style>

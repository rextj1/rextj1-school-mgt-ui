<template>
  <div class="p-3">
    <div v-if="nowLoading">
      <Preload />
    </div>
    <div v-else>
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab active>
              <template #title>
                <b-icon icon="plus" /><strong>Create Classes</strong>
              </template>
              <div class="p-4">
                <div class="d-flex justify-content-between">
                  <h4 class="mb-3">All Classes</h4>
                  <b-button
                    class="shadow mb-4"
                    pill
                    variant="warning"
                    size="md"
                    @click="refreshClass"
                  >
                    <b-spinner
                      v-if="isBusy"
                      small
                      variant="light"
                      class="mr-1 mb-1"
                    />
                    Refresh Class</b-button
                  >
                </div>

                <b-table :items="klases" :fields="fields">
                  <template #cell(#)="data">
                    {{ data.index + 1 }}
                  </template>

                  <template #cell(name)="data">
                    <div v-if="klaseEditingId == data.item.id">
                      <b-row no-gutters>
                        <b-col md="4">
                          <input
                            v-model="form.names"
                            type="text"
                            required
                            size="lg"
                            @blur="updatingKlase(data.value)"
                            @keydown.enter="editFiled(data.item.id)"
                          />
                        </b-col>
                      </b-row>
                    </div>

                    <div v-else @click="setToEditing(data.item.id)">
                      {{ data.value }}
                    </div>
                  </template>

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
                    >
                      <b-spinner
                        class="mr-1 mb-1"
                        small
                        variant="light"
                        v-if="loading"
                      />
                      <b-icon icon="circle" class="mr-1"> </b-icon>
                      Revoke teacher
                    </b-button>

                    <b-button
                      v-else
                      variant="danger"
                      size="sm"
                      class="px-3"
                      @click="deleteClass(data.item.id)"
                    >
                      <b-icon icon="circle" class="mr-1"> </b-icon>
                      Revoke teacher
                    </b-button>
                  </template>
                </b-table>
              </div>

              <!-- Info modal -->
              <!-- Add Classes -->
              <div class="margin-down">
                <!-- description -->
                <b-form
                  method="POST"
                  @submit.prevent="onSubmitCreate"
                  @keydown="form.onKeydown($event)"
                >
                  <!-- description -->

                  <b-row no-gutters class="px-4 mb-5">
                    <b-col md="2">
                      <label
                        for="input-small"
                        class="label-padding"
                        style="font-size: 18px"
                        >Name:</label
                      >
                    </b-col>

                    <b-col md="3">
                      <b-form-group>
                        <b-form-input
                          id="name"
                          v-model="form.name"
                          name="name"
                          placeholder="Enter class"
                          trim
                          type="text"
                          required
                          size="lg"
                        >
                        </b-form-input>
                        <b-form-invalid-feedback
                          :state="!form.errors.has('name')"
                        >
                          {{ form.errors.get('name') }}
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
                        />Add Class</b-button
                      >
                    </b-col>
                  </b-row>
                </b-form>
              </div>
              <!-- end -->
            </b-tab>

            <b-tab>
              <template #title>
                <strong>Assign Teacher To Class</strong>
              </template>

              <div class="margin-down p-4">
                <b-form
                  method="POST"
                  @submit.prevent="onSubmitAssign"
                  @keydown="form.onKeydown($event)"
                >
                  <b-row class="mb-4">
                    <b-col md="2">
                      <label for="input-small" class="label-padding"
                        >Class:</label
                      >
                    </b-col>

                    <b-col md="4">
                      <b-form-group label="">
                        <b-form-select
                          id="klases"
                          v-model="form.klase"
                          value-field="id"
                          text-field="name"
                          :options="klases"
                          class="mb-3"
                          size="md"
                          required
                        >
                          <template #first>
                            <b-form-select-option :value="null" disabled
                              >-- select Class--</b-form-select-option
                            >
                          </template>
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

                    <b-col md="4">
                      <b-form-group label="">
                        <b-form-select
                          v-model="teacherx"
                          value-field="id"
                          text-field="first_name"
                          :options="teachers"
                          multiple
                          required
                          style="height: 15rem"
                          class="mb-3"
                          size="smd"
                        >
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
                          small
                          variant="light"
                          class="mr-1 mb-1"
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { KLASE_QUERIES, KLASE_QUERY } from '~/graphql/klases/queries'
import {
  ASSIGN_KLASE_TO_TEACHER_MUTATION,
  CREATE_KLASE_MUTATION,
  DELETE_KLASE_MUTATION,
  UPDATE_KLASE_MUTATION,
} from '@/graphql/klases/mutations'
import { TEACHERS_QUERIES } from '~/graphql/teachers/queries'
import Preload from '~/components/Preload.vue'

export default {
  components: { Preload },
  middleware: 'auth',
  data() {
    return {
      id: 0,
      isBusy: false,
      loadingId: null,
      loading: false,
      klaseEditingId: '',
      klase: {},
      klases: [],
      teachers: [],
      teacherx: [],
      busy: false,
      form: new this.$form({
        id: 0,
        name: null,
        names: null,
        klase: null,
        teacher: [],
        busy: false,
      }),
      fields: [
        {
          key: '#',
          sortable: false,
        },
        {
          key: 'name',
          sortable: false,
        },
        {
          key: 'teachers',
          sortable: false,
        },
        {
          key: 'actions',
          sortable: false,
        },
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
    refreshClass() {
      this.isBusy = true
      setTimeout(() => {
        if (this.isBusy == true) {
          this.$apollo.queries.klases.refresh()

          this.isBusy = false
        }
      }, 1500)
    },
    // inline editing
    setToEditing(item) {
      this.klaseEditingId = item
      this.id = item
      if (this.id > 0) {
        this.$apollo.addSmartQuery('klase', {
          query: KLASE_QUERY,
          variables() {
            return {
              id: parseInt(this.id),
              workspaceId: parseInt(this.mainWorkspace.id),
            }
          },
          result({ data, loading }) {
            if (!loading) {
              this.form.id = parseInt(data.klase.id)
              this.form.names = data.klase.name
            }
          },
        })
      }
    },
    updatingKlase() {
      this.klaseEditingId = ''
    },
    // ------- edit -------- //
    editFiled() {
      this.$apollo
        .mutate({
          mutation: UPDATE_KLASE_MUTATION,
          variables: {
            id: parseInt(this.id),
            name: this.form.names,
            workspaceId: parseInt(this.mainWorkspace.id),
          },
        })
        .then(() => {
          this.klaseEditingId = ''
          Swal.fire({
            text: `class updated successfully!`,
            position: 'top-right',
            color: '#fff',
            background: '#5cb85c',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
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
    // -------create -------- //
    async onSubmitCreate() {
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: CREATE_KLASE_MUTATION,
            variables: {
              name: this.form.name,
              workspaceId: parseInt(this.mainWorkspace.id),
            },
            update: (store, { data: { createKlase } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: KLASE_QUERIES,
                variables: {
                  workspaceId: parseInt(this.mainWorkspace.id),
                },
              })

              data.klases.push(createKlase)

              store.writeQuery({
                query: KLASE_QUERIES,
                variables: {
                  workspaceId: parseInt(this.mainWorkspace.id),
                },
                data,
              })
            },
          })
          .then(() => {
            this.form.busy = false
            this.form.name = ''
            Swal.fire({
              text: `class added successfully!`,
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
    // assign class to teacher
    async onSubmitAssign() {
      if (this.form.klase === null && this.teacherx === []) {
        return false
      } else {
        this.teacherx.forEach((element) => {
          const intValue = parseInt(element)
          this.form.teacher.push(intValue)
        })
      }
      this.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: ASSIGN_KLASE_TO_TEACHER_MUTATION,
            variables: {
              klase: parseInt(this.form.klase),
              teacher: this.form.teacher,
            },
          })
          .then(() => {
            this.busy = false
            this.form.klase = ''
            this.form.teacher = []
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
    // ------delete ----------/
    deleteClass(item) {
      this.loading = true
      const deleteId = item
      this.loadingId = deleteId
      this.$apollo
        .mutate({
          mutation: DELETE_KLASE_MUTATION,
          variables: {
            id: parseInt(deleteId),
          },
        })
        .then(() => {
          Swal.fire({
            timer: 1000,
            text: 'teacher revoked successfully',
            position: 'top-right',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            showConfirmButton: false,
          })
          this.loading = false
        })
        .catch(() => {
          // this.klase_id =
        })
    },
  },
}
</script>

<template>
  <div class="p-4">
    <template v-if="!klases">
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
                <b-icon icon="plus" /><strong>Create Classes</strong>
              </template>
              <div class="p-4">
                <div class="p-3">
                  <h3 class="mb-3">All Classes</h3>
                  <b-table :items="klases" :fields="fields">
                    <template #cell(#)="data">
                      {{ data.index + 1 }}
                    </template>

                    <template #cell(name)="data">
                      <div v-if="klaseEditingId == data.item.id">
                        <b-row no-gutters>
                          <b-col md="4">
                            <input
                              style="width: 10rem"
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
                        @click="deleteKlase(data.item.id)"
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
                          id="name"
                          v-model="form.name"
                          name="name"
                          placeholder="Enter class"
                          trim
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
                          />Add Class</b-button
                        >
                      </div>
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

              <hr />

              <div class="margin-down">
                <b-form
                  v-if="show"
                  method="POST"
                  @submit.prevent="onSubmitAssign"
                  @keydown="form.onKeydown($event)"
                  @reset.prevent="onReset"
                >
                  <b-row class="mb-4">
                    <b-col md="2">
                      <label for="input-small" class="label-padding"
                        >Class:</label
                      >
                    </b-col>

                    <b-col md="8">
                      <b-form-group label="">
                        <b-form-select
                          id="klases"
                          value-field="id"
                          text-field="name"
                          v-model="form.klase"
                          :options="klases"
                          class="mb-3"
                          size="lg"
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

                    <b-col md="8">
                      <b-form-group label="">
                        <b-form-select
                          value-field="id"
                          text-field="first_name"
                          v-model="teacherx"
                          :options="teachers"
                          multiple
                          required
                          style="height: 15rem"
                          class="mb-3"
                          size="lg"
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
                        size="lg"
                      >
                        <b-spinner
                          v-if="busy"
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
    </template>
  </div>
</template>

<script>
import { KLASE_QUERIES, KLASE_QUERY } from '~/graphql/klases/queries'
import {
  ASSIGN_KLASE_TO_TEACHER_MUTATION,
  CREATE_KLASE_MUTATION,
  DELETE_KLASE_MUTATION,
  UPDATE_KLASE_MUTATION,
} from '@/graphql/klases/mutations'
import { TEACHER_QUERIES } from '~/graphql/teachers/queries'
import Swal from 'sweetalert2'
export default {
  middleware: 'auth',
  data() {
    return {
      id: 0,
      klaseEditingId: '',
      klase: {},
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
      show: true,
    }
  },
  apollo: {
    klases: {
      query: KLASE_QUERIES,
    },
    teachers: {
      query: TEACHER_QUERIES,
    },
  },

  methods: {
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
          },
        })
        .then(({ data }) => {
          this.klaseEditingId = ''
        })
        .catch((error) => {
          error
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
            },
            update: (store, { data: { createKlase } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: KLASE_QUERIES,
              })
              // console.log(this.form.class);

              data.klases.push(createKlase)
              // console.log(dataCopy)

              // Write our data back to the cache.
              // Write back to the cache
              store.writeQuery({
                query: KLASE_QUERIES,
                data,
              })
            },
          })
          .then(({ data }) => {
            this.form.busy = false
            this.form.name = ''
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

    // ----- delete ------- //
    deleteKlase(item) {
      const deleteId = item
      alert(deleteId)
      this.$apollo
        .mutate({
          mutation: DELETE_KLASE_MUTATION,
          variables: {
            id: parseInt(deleteId),
          },
          update: (store, { data: { deleteKlase } }) => {
            const data = store.readQuery({
              query: KLASE_QUERIES,
            })

            const index = data.klases.findIndex((m) => m.id == deleteId)
            if (index !== -1) {
              // Mutate cache result
              data.klases.splice(index, 1)

              store.readQuery({
                query: KLASE_QUERIES,
                data,
              })
            }
          },
        })
        .then(({ data }) => {
          Swal.fire({
            timer: 1000,
            text: 'class removed successfully',
            position: 'top-right',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
          })
        
        })
        .catch((erre) => {
          error
        })
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
            update: (store, { data: { assignKlaseToTeacher } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: KLASE_QUERIES,
              })

              data.klases.push(assignKlaseToTeacher)

              store.writeQuery({
                query: KLASE_QUERIES,
                data,
              })
            },
          })
          .then(({ data }) => {
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
              showConfirmButton: false
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
.grow {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.libarian__wrapper {
  padding: 2rem;
  font-size: 1.4rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: none;

  .margin-down {
    margin-top: 3rem;

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
      height: 4.5rem;
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
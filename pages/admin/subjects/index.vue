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
                              @blur="updatingKlase(data.vale)"
                              @keydown.enter="editFiled(data.item.id)"
                            ></b-form-input>
                          </b-col>
                        </b-row>
                      </div>

                      <div v-else @click="setToEditing(data.item.id)">
                        {{ data.item.subject }}
                      </div>
                    </template>

                    <!-- <template #cell(subjects)="data">
                      <b-badge
                        :id="`subjects-${data.index}`"
                        variant="info"
                        class="px-2"
                      >
                        {{ data.value.length }} subjects
                      </b-badge>
                      <b-popover
                        v-if="data.value.length > 0"
                        :target="`subjects-${data.index}`"
                        triggers="hover click"
                      >
                        <b-nav vertical>
                          <b-nav-item
                            v-for="subject in data.value"
                            :key="subject.id"
                          >
                            <h5 style="font-size: 1.3rem">
                              {{ subject.subject }}
                            </h5>
                          </b-nav-item>
                        </b-nav>
                      </b-popover>
                    </template> -->
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
                      <b-button variant="danger" size="sm" class="px-3">
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
                      v-model="form.class"
                      :options="classes"
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
} from '@/graphql/subjects/mutations'
export default {
  data() {
    return {
      id: 0,
      subjectEditingId: '',
      editSlug: '',

      form: new this.$form({
        id: 0,
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
          key: 'slug',
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
      classes: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'],
      subjects: ['Mathematics', 'English Language', 'Biology', 'basic Science'],
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

      setTimeout(() => {
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
        } else {
          return false
        }
      }, 1)
    },
    updatingKlase() {
      this.subjectEditingId = ''
    },
    editFiled() {
      alert(this.form.subjects)
      // submit exam
      this.$apollo
        .mutate({
          mutation: UPDATE_SUBJECT_MUTATION,
          variables: {
            id: parseInt(this.id),

            subject: this.form.subjects,
          },
        })
        .then(({ data }) => {
          this.$bvModal.hide(this.infoModal)
        })
        .catch((error) => {
          error
        })
    },

    async onSubmitCreate() {
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: CREATE_SUBJECT_MUTATION,
            variables: {
              subject: this.form.subject,
            },
          })
          .then(({ data }) => {
            this.$bvModal.hide(this.infoModal)
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
<template>
  <div class="p-4">
    <template v-if="!sessions">
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
          <div class="p-4">
            <div class="p-3">
              <h3 class="mb-3">All Sessions</h3>
              <b-table :items="sessions" :fields="fields">
                <template #cell(#)="data">
                  {{ data.index + 1 }}
                </template>
                <template #cell(name)="data">
                  <div v-if="sessionEditingId == data.item.id">
                    <b-row no-gutters>
                      <b-col md="4">
                        <input
                          style="width: 10rem"
                          v-model="form.names"
                          type="text"
                          required
                          size="lg"
                          @blur="updatingSession(data.value)"
                          @keydown.enter="editFiled(data.item.id)"
                        />
                      </b-col>
                    </b-row>
                  </div>

                  <div v-else @click="setToEditing(data.item.id)">
                    {{ data.item.name }}
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
                    class="label-padding ml-4"
                    style="font-size: 2rem"
                    >Name:</label
                  >
                </b-col>

                <b-col md="8">
                  <div class="d-flex">
                    <b-form-input
                      v-model="form.name"
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
                      />Add Session</b-button
                    >
                  </div>
                </b-col>
              </b-row>
            </b-form>
          </div>
        </b-card>
      </div>
    </template>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { SESSION_QUERIES, SESSION_QUERY } from '~/graphql/marks/queries'
import { CREATE_SESSION_MUTATION, UPDATE_SESSION_MUTATION } from '~/graphql/marks/mutations'
export default {
  middleware: 'auth',
  data() {
    return {
      id: 0,
      sessionEditingId: '',
      session: {},
      busy: false,
      form: new this.$form({
        id: 0,
        name: null,
        names: null,
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
          key: 'actions',
          sortable: false,
        },
      ],
      show: true,
    }
  },
  apollo: {
    sessions: {
      query: SESSION_QUERIES,
    },
  },

  methods: {
    // inline editing
    setToEditing(item) {
      this.sessionEditingId = item
      this.id = item

      if (this.id > 0) {
        this.$apollo.addSmartQuery('session', {
          query: SESSION_QUERY,
          variables() {
            return {
              id: parseInt(this.id),
            }
          },
          result({ data, loading }) {
            if (!loading) {
              this.form.id = parseInt(data.session.id)
              this.form.names = data.session.name
            }
          },
        })
      }
    },
    updatingSession() {
      this.sessionEditingId = ''
    },
    // ------- edit ----//
    editFiled(item) {
      this.$apollo
        .mutate({
          mutation: UPDATE_SESSION_MUTATION,
          variables: {
            id: parseInt(item),
            name: this.form.names,
          },
        })
        .then(({ data }) => {
          this.sessionEditingId = ''
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
            mutation: CREATE_SESSION_MUTATION,
            variables: {
              name: this.form.name,
            },
            update: (store, { data: { createSession } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: SESSION_QUERIES,
              })
              // console.log(this.form.class);

              data.sessions.push(createSession)
              // console.log(dataCopy)

              // Write our data back to the cache.
              // Write back to the cache
              store.writeQuery({
                query: SESSION_QUERIES,
                data,
              })
            },
          })
          .then(({ data }) => {
            this.form.session = ''
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
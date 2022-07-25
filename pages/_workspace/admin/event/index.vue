<template>
  <div class="p-4">
    <template v-if="$apollo.queries.events.loading"><Preload /></template>
    <template v-else>
      <div class="libarian__wrapper">
        <b-card no-body>
          <b-tabs card style="font-size: 1.4rem">
            <b-tab active>
              <template #title>
                <b-icon icon="plus" /><strong>Add Event</strong>
              </template>
              <b-form
                v-if="show"
                method="POST"
                @submit.prevent="onSubmit"
                @keydown="form.onKeydown($event)"
                @reset.prevent="onReset"
              >
                <b-row class="p-4">
                  <b-col md="6" class="p-4">
                    <b-form-group label="School Event">
                      <b-form-textarea
                        id="textarea"
                        v-model="form.description"
                        placeholder="Enter something..."
                        rows="20"
                        size="lg"
                        required
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                  <b-col md="6" class="p-4"></b-col>

                  <b-col md="3" class="p-4">
                    <b-form-group label="Date">
                      <b-form-datepicker
                        id="datepicker-buttons"
                        v-model="form.date"
                        today-button
                        reset-button
                        close-button
                        locale="en"
                        size="lg"
                        required
                      ></b-form-datepicker>
                    </b-form-group>
                  </b-col>

                  <b-col md="12" class="p-4">
                    <b-button
                      type="submit"
                      pill
                      variant="primary"
                      class="mr-4"
                      size="lg"
                    >
                      <b-spinner
                        v-if="form.busy"
                        variant="light"
                        small
                        class="mr-1 mb-1"
                      />Register</b-button
                    >
                    <b-button
                      pill
                      class="ml-4"
                      style="font-size: 1.4rem"
                      size="lg"
                      type="reset"
                      variant="danger"
                      >Reset</b-button
                    >
                  </b-col>
                </b-row>
              </b-form>
            </b-tab>

            <b-tab lazy>
              <template #title>
                <strong>School Event</strong>
                <b-icon scale="0.8" icon="caret-down-fill" />
              </template>
              <b-col md="12">
                <b-table
                  striped
                  responsive
                  hover
                  fixed
                  :items="events"
                  :fields="fields"
                >
                  <template #cell(date)="date">
                    <b-badge
                      style="font-size: 1.4rem"
                      class="d-inline-block"
                      variant="warning"
                      >{{ date.value }}</b-badge
                    >
                  </template>
                  <template #cell(actions)="row" class="d-flex">
                    <div class="d-flex">
                      <b-button
                        v-if="row.item.published == 0"
                        size="smd"
                        variant="warning"
                        class="mr-3 d-flex"
                        @click="
                          handlePublishEvent(row.item.id, row.item.published)
                        "
                      >
                        <b-spinner
                          v-if="isPublished === row.item.id"
                          variant="light"
                          small
                          class="mr-1 mb-1"
                        />

                        <h5>Publish</h5>
                      </b-button>

                      <b-button
                        v-if="row.item.published == 1"
                        size="smd"
                        variant="primary"
                        class="mr-3 d-flex"
                        @click="
                          handlePublishEvent(row.item.id, row.item.published)
                        "
                      >
                        <b-spinner
                          v-if="isPublished === row.item.id"
                          variant="light"
                          small
                          class="mr-1 mb-1"
                        />

                        <h5>Unpublish</h5>
                      </b-button>

                      <b-button
                        size="smd"
                        variant="info"
                        class="mr-2 d-flex"
                        @click="handleEditEvent(row.item)"
                      >
                        <b-icon icon="pencil-square" />
                      </b-button>

                      <b-button
                        size="smd"
                        variant="danger"
                        @click="handleDeleteEvent(row.item)"
                      >
                        <b-icon icon="trash" />
                      </b-button>
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </template>
    <!-- delete modal -->
    <b-modal id="DeleteModal" centered hide-header hide-footer>
      <div class="p-5 text-center">
        <Spinner v-if="isDeleting" size="4" />
        <template v-else>
          <h5>Confirm delete Event?</h5>

          <p>This action cannot be undone.</p>

          <div>
            <b-button
              variant="light"
              class="px-4 mr-2 border"
              @click="handleCancelDelete"
            >
              Cancel
            </b-button>

            <b-button variant="danger" class="px-4" @click="deleteInvokedEvent">
              Delete
            </b-button>
          </div>
        </template>
      </div>
    </b-modal>
    <!-- end -->

    <!-- edit modal -->
    <AdminEditEventModal
      v-if="isEditEventModal"
      v-model="isEditEventModal"
      :event="invokedForEdit"
    />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import {
  CREATE_EVENT_MUTATION,
  DELETE_EVENT_MUTATION,
  PUBLISH_EVENT_MUTATION,
} from '~/graphql/events/mutations'
import { EVENT_QUERIES } from '~/graphql/events/queries'
import Swal from 'sweetalert2'
export default {
  middleware: 'auth',
  data() {
    return {
      isPublished: null,
      events: [],
      isEditEventModal: false,
      // isEditEventModal: false,
      invokedForEdit: null,
      form: new this.$form({
        description: null,
        title: null,
        photo: null,
        date: null,
        busy: false,
      }),
      show: true,

      fields: [
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'description',
          label: 'Description',
        },
        // {
        //   key: 'title',
        //   label: 'Title',
        // },
        // {
        //   key: 'pubished',
        //   label: 'Published',
        // },
        // {
        //   key: 'photo',
        //   label: 'Photo',
        // },

        { key: 'actions', label: 'Actions' },
      ],
      invokedForDelete: null,
      isDeleting: false,
    }
  },
  apollo: {
    events: {
      query: EVENT_QUERIES,
      variables() {
        return {
          slug: this.mainWorkspace.slug,
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
    // update
    async onSubmit() {
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: CREATE_EVENT_MUTATION,
            variables: {
              workspace: this.mainWorkspace.slug,
              ...this.form.data(),
            },
            update: (store, { data: { createEvent } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: EVENT_QUERIES,
                variables: {
                  slug: this.mainWorkspace.slug,
                },
              })

              data.events.push(createEvent)
              // console.log(dataCopy)

              // Write our data back to the cache.
              // Write back to the cache
              store.writeQuery({
                query: EVENT_QUERIES,
                variables: {
                  slug: 'defaultworkspace',
                },
                data,
              })
            },
          })

          .then(() => {
            this.form.description = null
            this.form.date = null
            Swal.fire({
              text: `event added successfully!`,
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
    // edit

    handleEditEvent(event) {
      this.invokedForEdit = event
      this.isEditEventModal = true
    },

    // delete
    handleCancelDelete() {
      this.invokedForDelete = null

      this.$bvModal.hide('DeleteModal')
    },

    handleDeleteEvent(event) {
      this.invokedForDelete = event

      this.$bvModal.show('DeleteModal')
    },

    deleteInvokedEvent() {
      this.isDeleting = true

      this.$apollo
        .mutate({
          mutation: DELETE_EVENT_MUTATION,
          variables: {
            workspace: this.mainWorkspace.slug,
            id: parseInt(this.invokedForDelete.id),
          },
          update: (store, { data: { deleteEvent } }) => {
            try {
              const data = store.readQuery({
                query: EVENT_QUERIES,
                variables: {
                  slug: this.mainWorkspace.slug,
                },
              })

              const EventIndex = data.events.findIndex(
                (m) => m.id === this.invokedForDelete.id
              )

              if (EventIndex !== -1) {
                data.events.splice(EventIndex, 1)
              }

              // Write our data back to the cache.
              store.writeQuery({
                query: EVENT_QUERIES,
                variables: {
                  slug: this.mainWorkspace.slug,
                },
                data,
              })
            } catch (e) {
              // Do something with this error
            }
          },
        })
        .then(() => {
          Swal.fire({
            text: `event added successfully!`,
            position: 'top-right',
            color: '#fff',
            background: '#5cb85c',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.$bvModal.hide('DeleteModal')

          this.isDeleting = false
        })
    },
    async handlePublishEvent(eventId, published) {
      try {
        this.isPublished = eventId
        await this.$apollo
          .mutate({
            mutation: PUBLISH_EVENT_MUTATION,
            variables: {
              workspace: this.mainWorkspace.slug,
              id: parseInt(eventId),
            },
            update: (store, { data: { publishEvent } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: EVENT_QUERIES,
                variables: {
                  slug: this.mainWorkspace.slug,
                },
              })

              var publishedEvent = data.events.filter((m) => {
                return m.id === eventId
              })

              publishedEvent = publishEvent

              // Write our data back to the cache.
              // Write back to the cache
              store.writeQuery({
                query: EVENT_QUERIES,
                variables: {
                  slug: 'defaultworkspace',
                },
                data,
              })
            },
          })

          .then(() => {
            this.isPublished = null
            this.form.description = null
            this.form.date = null
            Swal.fire({
              text: `${
                published === 'published' ? 'Published' : 'Unpublished'
              } successfully!`,
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
  font-size: 1.6rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: none;

  .nav-link.active {
    border-top: 5px solid limegreen;
  }

  .menu {
    ul {
      position: absolute;
      border: none;
      top: -8.5rem;
      left: 14.3rem;
      background-color: #fff;
    }

    li:not(:last-child) {
      background-color: #fff;
      padding: 1.2rem 5.8rem;
      border-bottom: 1px solid gray;
      cursor: pointer;

      &:hover {
        background-color: var(--color-input);
      }
    }
  }
}
</style>

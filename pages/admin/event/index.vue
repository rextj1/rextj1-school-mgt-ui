<template>
  <div class="p-4">
    <div v-if="$apollo.queries.events.loading" class="preload">
      <Preload />
    </div>
    <div v-else>
      <div class="libarian__wrapper">
        <b-card no-body>
          <b-tabs card style="font-size: 1.4rem">
            <b-tab active>
              <template #title>
                <strong>School Notice</strong>
                <b-icon scale="0.8" icon="caret-down-fill" />
              </template>
              <b-col md="12">
                <b-table
                  striped
                  responsive
                  hover
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
                        v-show="showPublished"
                        size="smd"
                        variant="primary"
                        class="mr-1"
                        @click="published(row.item.id)"
                      >
                        <b-spinner
                          v-if="busyPublished"
                          variant="light"
                          small
                          class="mr-1 mb-1"
                        />published</b-button
                      >

                      <!-- unpublished -->
                      <b-button
                        v-show="showUnPblished"
                        size="smd"
                        variant="primary"
                        class="mr-1"
                        @click="unPublished(row.item.id)"
                      >
                        <b-spinner
                          v-if="busyUnPublished"
                          variant="light"
                          small
                          class="mr-1 mb-1"
                        />Unpublished</b-button
                      >

                      <b-button
                        size="smd"
                        variant="info"
                        class="mr-1"
                        @click="editInfo(row.item.id)"
                      >
                        <b-icon icon="pencil-square" />Edit
                      </b-button>

                      <b-button
                        size="smd"
                        variant="danger"
                        @click="row.toggleDetails"
                      >
                        <b-icon icon="trash"></b-icon>
                      </b-button>
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-tab>
            <b-tab lazy>
              <template #title>
                <b-icon icon="plus" /><strong>Add Events</strong>
              </template>
              <b-form
                v-if="show"
                method="POST"
                @submit.prevent="onSubmit"
                @keydown="form.onKeydown($event)"
                @reset.prevent="onReset"
              >
                <b-row class="p-4">
                  <b-col md="10" class="p-4">
                    <b-form-group label="School Event">
                      <b-form-textarea
                        id="textarea"
                        v-model="form.description"
                        placeholder="Enter something..."
                        rows="10"
                        cols="10"
                        size="lg"
                        required
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>

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
          </b-tabs>
        </b-card>
        <!-- Info modal -->
        <b-modal
          :id="infoModal"
          class="modal"
          :hide-backdrop="true"
          body-bg-variant="info"
          scrollable
          title="Edit Student Data"
          size="lg"
          :hide-footer="true"
        >
          <AdminEditEventModal :slug="id" />
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CREATE_EVENT_MUTATION,
  CREATE_PUBLISHED_MUTATION,
} from '~/graphql/events/mutations'
import { EVENT_QUERIES } from '~/graphql/events/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      events: [],
      form: new this.$form({
        description: null,
        title: null,
        photo: null,
        date: null,
        busy: false,
      }),
      showPublished: true,
      showUnPblished: false,
      busyPublished: false,
      busyUnPublished: false,
      infoModal: 'info-modal',
      id: '',
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
        {
          key: 'title',
          label: 'Title',
        },
        {
          key: 'pubished',
          label: 'Published',
        },
        {
          key: 'photo',
          label: 'Photo',
        },

        { key: 'actions', label: 'Actions' },
      ],
    }
  },
  apollo: {
    events: {
      query: EVENT_QUERIES,
    },
  },
  methods: {
    // published mutation
    editInfo(item) {
      this.$root.$emit('bv::show::modal', this.infoModal)
      // this.$bvModal.show(this.infoModal)
      this.id = item
    },

    published(item) {
      this.form.busy = true
      // submit exam
      this.$apollo
        .mutate({
          mutation: CREATE_PUBLISHED_MUTATION,
          variables: {
            id: parseInt(item),
            published: true,
          },
        })
        .then(() => {
          
          this.showPublished = false
          this.showUnPblished = true
          // this.$router.push('/admin/teacher')
        })
        .catch((e) => {
          console.log(e);
          this.form.busy = false
        })
    },

    unPublished(item) {
      this.form.busy = true
      // submit exam
      this.$apollo
        .mutate({
          mutation: CREATE_PUBLISHED_MUTATION,
          variables: {
            id: parseInt(item),
            published: false,
          },
        })
        .then(() => {
        
          this.showPublished = true
          this.showUnPblished = false
          // this.$router.push('/admin/teacher')
        })
        .catch((e) => {
          console.log(e);
          this.form.busy = false
        })
    },
    // main mutation
    async onSubmit() {
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: CREATE_EVENT_MUTATION,
            variables: this.form.data(),
          })
          .then(() => {
          this.form.description = null
          this.form.date = null
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
.preload {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
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

<template>
  <div class="fonts">
    <div v-if="$apollo.queries.drivers.loading"><Preload /></div>
    <div v-else>
      <b-button
        to="/admin/driver/add-driver"
        variant="primary"
        pill
        size="md"
        class="add-student mb-4"
      >
        <b-icon icon="plus" />Register Driver
      </b-button>

      <b-row no-gutters>
        <b-col md="12">
          <div class="card-body">
            <div class="card-student shadow p-3" style="background-color: #fff">
              <h2 class="d-flex justify-content-center mb-4 mt-4">
                All Drivers
              </h2>
              <hr />
              <b-container fluid>
                <!-- Main table element -->
                <b-table
                  :items="drivers"
                  :fields="fields"
                  stacked="md"
                  show-empty
                  small
                  striped
                  hover
                  style="font-size: 1.3rem"
                  :responsive="true"
                >
                  <template #cell(index)="data">
                    {{ data.index + 1 }}
                  </template>

                  <template #cell(photo)="data">
                    <b-avatar
                      variant="primary"
                      :src="`http://sms.test/storage/driver/${data.item.photo}`"
                    />
                  </template>

                  <!-- <template #cell(paid)="row">
                    <div v-if="row.item.paid">
                      <b-badge variant="warning">{{ row.value }}</b-badge>
                    </div>
                    <div v-else>
                      <b-badge variant="danger">{{ row.value }}</b-badge>
                    </div>
                  </template> -->

                  <!-- view modal -->
                  <template #cell(actions)="data">
                    <b-button
                      :to="{
                        name: 'admin-driver-slug',
                        params: { slug: data.item.slug },
                      }"
                      variant="primary"
                      size="md"
                      class="px-3"
                    >
                      <b-icon icon="eye" class="mr-1"></b-icon>
                      View
                    </b-button>

                    <b-button
                      variant="info"
                      size="md"
                      class="px-3"
                      @click="info(data.item.slug)"
                    >
                      Edit
                    </b-button>

                    <b-button
                      variant="danger"
                      size="md"
                      class="px-3"
                      @click="callDeleteModal(data.item.id)"
                    >
                      <b-icon icon="trash" class="mr-1"></b-icon>
                      Delete
                    </b-button>
                  </template>

                  <template #row-details="row">
                    <b-card>
                      <ul>
                        <li v-for="(value, key) in row.item" :key="key">
                          {{ key }}: {{ value }}
                        </li>
                      </ul>
                    </b-card>
                  </template>
                </b-table>

                <!-- Info modal -->
                <b-modal
                  :id="infoModal"
                  class="modal"
                  :hide-backdrop="true"
                  body-bg-variant="info"
                  title="Edit Driver Data"
                  scrollable
                  size="lg"
                  :hide-footer="true"
                >
                  <AdminEditDriverModal :slug="[slug, infoModal]" />
                </b-modal>

                <b-modal
                  id="deleteInfo"
                  :hide-backdrop="true"
                  body-bg-variant="info"
                  size="sm"
                  centered
                  :hide-footer="true"
                >
                  <template #default="{ hide }">
                    <div class="p-4 text-center">
                      <h4 class="mb-3">This will permanently be removed.</h4>
                      <p>Are you sure you want to continue?</p>

                      <div class="mt-4">
                        <b-button
                          variant="link"
                          class="px-4 mr-2"
                          pill
                          @click="hide"
                        >
                          Cancel
                        </b-button>
                        <b-button
                          type="submit"
                          variant="danger"
                          class="px-4"
                          pill
                          :disabled="isDeleting"
                          @click="deleteDriver"
                        >
                          <b-spinner v-if="isDeleting" class="mr-1" small />
                          Delete
                        </b-button>
                      </div>
                    </div>
                  </template>
                </b-modal>
              </b-container>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { DELETE_DRIVER_MUTATION } from '~/graphql/drivers/mutations'
import { DRIVER_QUERIES } from '~/graphql/drivers/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      isDeleting: false,
      isDeletingId: null,
      fields: [
        {
          key: 'index',
          label: '#',
        },
        {
          key: 'first_name',
          label: 'First Name',
        },
        {
          key: 'last_name',
          label: 'Last Name',
        },
        {
          key: 'photo',
          label: 'Photo',
        },
        {
          key: 'birthday',
          label: 'Birthday',
        },
        {
          key: 'route',
          label: 'Route',
        },
        {
          key: 'driver_license',
          label: 'License',
        },
        {
          key: 'driver_license',
          label: 'License',
        },
        {
          key: 'phone',
          label: 'Phone no.',
        },

        {
          key: 'gender',
          label: 'Gender',
          // formatter: (value, key, item) => {
          //   return value ? 'Male' : 'Female'
          // },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        {
          key: 'phone',
          label: 'Phone',
          sortable: true,
          // sortDirection: 'desc',
        },
        { key: 'actions', label: 'Actions' },
      ],
      slug: '',
      infoModal: 'info-modal',
    }
  },
  apollo: {
    drivers: {
      query: DRIVER_QUERIES,
    },
  },

  methods: {
    info(item, button) {
      this.slug = item
      this.$root.$emit('bv::show::modal', this.infoModal, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    callDeleteModal(item) {
      this.isDeletingId = item
      this.$bvModal.show('deleteInfo')
    },
    deleteDriver() {
      const deleteId = this.isDeletingId
      this.isDeleting = true
      this.$apollo
        .mutate({
          mutation: DELETE_DRIVER_MUTATION,
          variables: { id: parseInt(this.isDeletingId) },
          update: (store, { data: { deleteDriver } }) => {
            const data = store.readQuery({
              query: DRIVER_QUERIES,
            })

            const index = data.drivers.findIndex((m) => m.id == deleteId)
            if (index !== -1) {
              // Mutate cache result
              data.drivers.splice(index, 1)

              store.readQuery({
                query: DRIVER_QUERIES,
                data,
              })
            }
          },
        })
        .then(({ data }) => {
          this.isDeleting = false
        })
        .finally(() => {
          this.isDeleting = false
          this.$bvModal.hide('deleteInfo')
        })
    },
  },
}
</script>

<style lang="scss">
.modal {
  background-color: rgba(0, 0, 0, 0.295) !important;
}

.fonts {
  font-size: 1.4rem !important;
  padding: 2rem;

  .add-student {
    font-size: 1.6rem;
    box-shadow: 0 5px 5px 0 #1f64b367;
  }
  .card-body {
    padding: 0;
    .card-student {
      border: none;
      border-radius: 0.5rem;
      height: auto;

      .input-group > .input-group-append > .btn,
      .input-group > .input-group-append > .input-group-text {
        background: var(--color-primary);
        color: #fff;
        font-size: 1rem;
      }
      .input-group:not(.has-validation) > .custom-select:not(:last-child),
      .input-group > .form-control:not(:first-child),
      .input-group > .custom-select:not(:first-child),
      .custom-select {
        height: 3.2rem;
        font-size: 1.2rem;
      }
      .form-control,
      .mb-3 {
        height: 3.2rem;
        font-size: 1.2rem;
      }
    }
  }
}
</style>

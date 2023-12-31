<template>
  <div class="accountant p-3">
    <div v-if="$apollo.queries.accountants.loading">
      <Preload />
    </div>
    <div v-else>
      <b-button
        v-if="accountants.length < 3"
        :to="{
          name: 'workspace-admin-accountant-add-accountant',
          params: { workspace: mainWorkspace.slug },
        }"
        variant="primary"
        pill
        size="md"
        class="add-student mb-4"
      >
        <b-icon icon="plus" />Register Accountant
      </b-button>

      <b-row no-gutters>
        <b-col md="12">
          <div class="card-body">
            <div class="card-student shadow p-3" style="background-color: #fff">
              <h4 class="d-flex justify-content-center mb-4 mt-4">
                All Accountants
              </h4>
              <hr />
              <b-container fluid>
                <!-- User Interface controls -->
                <b-row>
                  <b-col lg="6" class="my-1">
                    <b-form-group
                      v-slot="{ ariaDescribedby }"
                      label="Sort"
                      label-for="sort-by-select"
                      label-cols-sm="3"
                      label-align-sm="right"
                      label-size="md"
                      class="mb-0"
                    >
                      <b-input-group size="md">
                        <b-form-select
                          id="sort-by-select"
                          v-model="sortBy"
                          :options="sortOptions"
                          :aria-describedby="ariaDescribedby"
                          class="w-75"
                          style="background-color: #f9f9f9"
                        >
                          <template #first>
                            <option value="">-- none --</option>
                          </template>
                        </b-form-select>

                        <b-form-select
                          v-model="sortDesc"
                          :disabled="!sortBy"
                          :aria-describedby="ariaDescribedby"
                          size="md"
                          class="w-10"
                        >
                          <option :value="false">Asc</option>
                          <option :value="true">Desc</option>
                        </b-form-select>
                      </b-input-group>
                    </b-form-group>
                  </b-col>

                  <b-col lg="6" class="my-1">
                    <b-form-group
                      label="Initial sort"
                      label-for="initial-sort-select"
                      label-cols-sm="3"
                      label-align-sm="right"
                      label-size="md"
                      class="mb-0"
                    >
                      <b-form-select
                        id="initial-sort-select"
                        v-model="sortDirection"
                        :options="['asc', 'desc', 'last']"
                        size="sm"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>

                  <b-col lg="6" class="my-1">
                    <b-form-group
                      label="Filter"
                      label-for="filter-input"
                      label-cols-sm="3"
                      label-align-sm="right"
                      label-size="md"
                      class="mb-0"
                    >
                      <b-input-group size="md">
                        <b-form-input
                          id="filter-input"
                          v-model="filter"
                          type="search"
                          placeholder="Type to Search"
                          style="background-color: #f9f9f9"
                        ></b-form-input>

                        <b-input-group-append>
                          <b-button :disabled="!filter" @click="filter = ''"
                            >Clear</b-button
                          >
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-col>

                  <b-col lg="6" class="my-1">
                    <b-form-group
                      v-slot="{ ariaDescribedby }"
                      v-model="sortDirection"
                      label="Filter On"
                      description="Leave all unchecked to filter on all data"
                      label-cols-sm="3"
                      label-align-sm="right"
                      label-size="sm"
                      class="mb-0"
                    >
                      <b-form-checkbox-group
                        v-model="filterOn"
                        :aria-describedby="ariaDescribedby"
                        class="mt-1"
                      >
                        <b-form-checkbox value="name">Name</b-form-checkbox>
                        <b-form-checkbox value="photo">Photo</b-form-checkbox>
                        <b-form-checkbox value="paid">Paid Fee</b-form-checkbox>
                        <b-form-checkbox value="gender">Gender</b-form-checkbox>
                      </b-form-checkbox-group>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="1"></b-col>
                  <b-col sm="6" md="2" class="my-1">
                    <b-form-group
                      label="Show"
                      label-for="per-page-select"
                      label-cols-sm="6"
                      label-cols-md="4"
                      label-cols-lg="3"
                      label-align-sm="right"
                      label-size="md"
                      class="mb-0"
                    >
                      <b-form-select
                        id="per-page-select"
                        v-model="perPage"
                        :options="pageOptions"
                        size="lg"
                        style="background-color: #f9f9f9"
                      ></b-form-select>
                    </b-form-group> </b-col
                ></b-row>

                <br /><br />
                <!-- Main table element -->
                <b-table
                  :items="accountants"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  :filter-included-fields="filterOn"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  show-empty
                  small
                  striped
                  hover
                  :responsive="true"
                  @filtered="onFiltered"
                >
                  <template #cell(index)="data">
                    {{ data.index + 1 }}
                  </template>

                  <template #cell(photo)="data">
                    <b-avatar
                      variant="primary"
                      :src="`${$config.APIRoot}/storage/${mainWorkspace.id}/accountants/${data.value}`"
                    >
                    </b-avatar>
                  </template>

                  <template #cell(paid)="row">
                    <div v-if="row.item.paid">
                      <b-badge variant="warning">{{ row.value }}</b-badge>
                    </div>
                    <div v-else>
                      <b-badge variant="danger">{{ row.value }}</b-badge>
                    </div>
                  </template>

                  <!-- view modal -->
                  <template #cell(actions)="data">
                    <div class="d-flex">
                      <b-button
                        :to="{
                          name: 'workspace-admin-accountant-id',
                          params: {
                            workspace: mainWorkspace.slug,
                            id: data.item.id,
                          },
                        }"
                        variant="primary"
                        size="sm"
                        class="px-3"
                      >
                        <b-icon icon="eye" class="mr-1"></b-icon>
                        
                      </b-button>

                      <b-button
                        variant="info"
                        size="sm"
                         class="px-3 ml-1"
                        @click="handleEditModal(data.item.id)"
                      >
                        <b-icon icon="pen" class="mr-1"></b-icon>
                      </b-button>

                      <b-button
                        variant="danger"
                        size="sm"
                        class="px-3 ml-1"
                        @click="handleDeleteModal(data.item)"
                      >
                        <b-icon icon="trash" class="mr-1" />
                        
                      </b-button>
                    </div>
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

                <b-modal
                  :id="infoModal"
                  class="modal"
                  :hide-backdrop="false"
                  scrollable
                  title="Edit Accountant Data"
                  size="xl"
                  :hide-footer="true"
                >
                  <AdminEditAccountantModal
                    :accountantInfo="[accountantId, infoModal]"
                  />
                </b-modal>
              </b-container>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>

    <!-- delete modal -->
    <b-modal id="DeleteModal" size="md" centered hide-header hide-footer>
      <div class="p-5 text-center">
        <Spinner v-if="isDeleting" size="4" />
        <template v-else>
          <h5>Confirm delete accountant?</h5>
          <p>This action cannot be undone.</p>
          <b-form-group label="Delete Key">
            <b-form-input
              v-model="deleteKey"
              size="lg"
              placeholder="Enter delete key..."
              type="password"
              trim
              required
            ></b-form-input>
          </b-form-group>

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
              :disabled="deleteKey != 'school'"
              @click="deleteInvokedAccountant"
            >
              Delete
            </b-button>
          </div>
        </template>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { DELETE_ACCOUNTANT_MUTATION } from '~/graphql/accountants/mutations'
import { ACCOUNTANT_QUERIES } from '~/graphql/accountants/queries'
import Preload from '~/components/Preload.vue'
import AdminEditAccountantModal from '~/components/AdminEdit/AccountantModal.vue'
import Spinner from '~/components/Global/Spinner.vue'
import Swal from 'sweetalert2'

export default {
  components: { Preload,AdminEditAccountantModal,Spinner },
  middleware: 'auth',
  data() {
    return {
      deleteKey: null,
      accountantId: null,
      isDeleting: false,
      invokedForDelete: null,
      items: [],

      fields: [
        {
          key: 'index',
          label: 'S/N',
        },
        {
          key: 'last_name',
          label: 'Surname Name',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'first_name',
          label: 'First Name',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'photo',
          label: 'Photo',
          //   class: 'text-center',
        },
       
        {
          key: 'qualification',
          label: 'Qualification',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'code',
          label: 'Reg. Code',
          sortable: true,
          // sortDirection: 'desc',
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
        {
          key: 'employment',
          label: 'Date of Employment',
          sortable: true,
          // sortDirection: 'desc',
        },
         {
          key: 'birthday',
          label: 'Birthday',
          sortable: true,
        },
        { key: 'actions', label: 'Actions' },
      ],
      slug: '',
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [10, 25, 50, { value: 100, text: 'Show a lot' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: 'info-modal',
    }
  },
  apollo: {
    accountants: {
      query: ACCOUNTANT_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },

  methods: {
    handleEditModal(item) {
      this.accountantId = item
      this.$root.$emit('bv::show::modal', this.infoModal)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    handleCancelDelete() {
      this.$bvModal.hide('DeleteModal')
    },
    handleDeleteModal(item) {
      this.invokedForDelete = item
      this.$bvModal.show('DeleteModal')
    },
    deleteInvokedAccountant() {
      this.isDeleting = true
      this.$apollo
        .mutate({
          mutation: DELETE_ACCOUNTANT_MUTATION,
          variables: {
            id: parseInt(this.invokedForDelete.id),
            workspaceId: parseInt(this.mainWorkspace.id),
          },
          update: (store, { data: { deleteAccountant } }) => {
            try {
              const data = store.readQuery({
                query: ACCOUNTANT_QUERIES,
                variables: {
                  workspaceId: parseInt(this.mainWorkspace.id),
                },
              })

              const accountantIndex = data.accountants.findIndex(
                (m) => m.id === this.invokedForDelete.id
              )

              if (accountantIndex !== -1) {
                data.accountants.splice(accountantIndex, 1)
              }

              // Write our data back to the cache.
              store.writeQuery({
                query: ACCOUNTANT_QUERIES,
                variables: {
                  workspaceId: parseInt(this.mainWorkspace.id),
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
            timer: 1500,
            text: 'accountant deleted successfully',
            position: 'top-right',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            showConfirmButton: false,
          })
        })
        .catch(({ graphQLErrors: errors, ...rest }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: `An error occurred while processing your request.`,
            color: '#716add',
            backdrop: '#7a7d7f',
          })
        })
        .finally(() => {
          this.$bvModal.hide('DeleteModal')

          this.isDeleting = false
        })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style lang="scss" scoped>
.accountant {

  .add-student {
    box-shadow: 0 5px 5px 0 #1f64b367;
  }
  .card-body {
    padding: 0;
    .card-student {
      border: none;
      border-radius: 5px;
      height: auto;

      .input-group > .input-group-append > .btn,
      .input-group > .input-group-append > .input-group-text {
        background: var(--color-primary);
        color: #fff;
      }
      .input-group:not(.has-validation) > .custom-select:not(:last-child),
      .input-group > .form-control:not(:first-child),
      .input-group > .custom-select:not(:first-child),
      .custom-select {
        height: 38px;
      }
      .form-control,
      .mb-3 {
        height: 38px;
      }
    }
  }
}
</style>

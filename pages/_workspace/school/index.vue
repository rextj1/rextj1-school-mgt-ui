<template>
    <div v-if="$apollo.queries.schools.loading">
      <Preload />
    </div>
    <div v-else>
      <b-row no-gutters>
        <b-col md="12">
          <div class="card-body">
            <div class="card-student shadow p-3" style="background-color: #fff">
              <h2 class="d-flex justify-content-center mb-4 mt-4">
                All Schools
              </h2>
              <hr />
              <b-container fluid>
              
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
                  :items="schools"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  :filter-included-fields="filterOn"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  stacked="md"
                  show-empty
                  small
                  striped
                  hover
                  style="font-size: 1.3rem"
                  :responsive="true"
                  @filtered="onFiltered"
                >
                  <template #cell(index)="data">
                    {{ data.index + 1 }}
                  </template>

                  <!-- view modal -->
                  <template #cell(actions)="data">
                     <b-button
                      variant="primary"
                      size="md"
                      class="px-3"
                       @click="handleEditModal(data.item.id)"
                    >
                      <b-icon icon="pen" class="mr-1"></b-icon>
                      Edit
                    </b-button>

                    <b-button
                      :to="{
                        name: 'workspace-school-id',
                        params: {
                          workspace: mainWorkspace.name,
                          id: data.item.id,
                        },
                      }"
                      variant="primary"
                      size="md"
                      class="px-3"
                    >
                      <b-icon icon="eye" class="mr-1"></b-icon>
                      View
                    </b-button>

                    <b-button
                      variant="danger"
                      size="md"
                      class="px-3"
                      @click="handleDeleteModal(data.item)"
                    >
                      <b-icon icon="trash" class="mr-1" />
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

              </b-container>

                              <!-- Info modal -->
                <b-modal
                  :id="infoModal"
                  class="modal"
                  :hide-backdrop="false"
                  scrollable
                  title="Edit Student Data"
                  size="lg"
                  :hide-footer="true"
                >
                  <SchoolEditModal :slug="[schoolId, infoModal]" />
                </b-modal>
            </div>
          </div>
        </b-col>
      </b-row>
        <!-- delete modal -->
    <b-modal id="DeleteModal" size="sm" centered hide-header hide-footer>
      <div class="p-5 text-center">
        <Spinner v-if="isDeleting" size="4" />
        <template v-else>
          <h5>Confirm delete school?</h5>
          <p>This action cannot be undone.</p>

           <b-form-group label="Delete Key">
              <b-form-input
                v-model="deleteKey"
                size="lg"
                placeholder="Enter delete key..."
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
              :disabled="deleteKey != 24"
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
import Swal from 'sweetalert2'
import { SCHOOL_QUERIES } from '~/graphql/workspace/queries'
import { DELETE_SCHOOL_MUTATION } from '~/graphql/workspace/mutations'
export default {
  middleware: 'auth',
  data() {
    return {
      schoolId: null,
      deleteKey: null,
     
      isDeleting: false,
      invokedForDelete: null,
      items: [],

      fields: [
        {
          key: 'index',
          label: '#',
        },
        {
          key: 'name',
          label: 'School Name',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'slug',
          label: 'School Slug',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true,
          // sortDirection: 'desc',
        },
        
        { key: 'actions', label: 'Actions' },
      ],
      slug: '',
      infoModal: 'info-Modal',
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [25, 50, 75, { value: 100, text: 'Show a lot' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
    }
  },
  apollo: {
    schools: {
      query: SCHOOL_QUERIES,
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
    handleEditModal(school){
      this.schoolId = school
      this.$bvModal.show(this.infoModal)
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
          mutation: DELETE_SCHOOL_MUTATION,
          variables: {
            workspaceId: parseInt(this.invokedForDelete.id),
          },
          update: (store, { data: { deleteSchool } }) => {
            try {
              const data = store.readQuery({
                query: SCHOOL_QUERIES,
               
              })

              const schoolIndex = data.schools.findIndex(
                (m) => m.id === this.invokedForDelete.id
              )

              if (schoolIndex !== -1) {
                data.schools.splice(schoolIndex, 1)
              }

              // Write our data back to the cache.
              store.writeQuery({
                query: SCHOOL_QUERIES,
                
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
            text: 'school deleted successfully',
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

<style lang="scss">
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

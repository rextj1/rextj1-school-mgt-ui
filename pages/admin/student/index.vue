  <template>
  <div class="fonts">
    <b-button
      to="/admin/student/add-student"
      variant="primary"
      pill
      size="md"
      class="add-student mb-4"
    >
      <b-icon icon="plus" />Register Student
    </b-button>

    <b-row no-gutters>
      <b-col md="12">
        <div class="card-body">
          <div class="card-student shadow p-3" style="background-color: #fff">
            <h2 class="d-flex justify-content-center mb-4 mt-4">All Student</h2>
            <hr />

            <b-container fluid>
              <!-- User Interface controls -->
              <b-row>
                <b-col lg="6" class="my-1">
                  <b-form-group
                    label="Sort"
                    label-for="sort-by-select"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="md"
                    class="mb-0"
                    v-slot="{ ariaDescribedby }"
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
                    v-model="sortDirection"
                    label="Filter On"
                    description="Leave all unchecked to filter on all data"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    class="mb-0"
                    v-slot="{ ariaDescribedby }"
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
                :items="students"
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
                @filtered="onFiltered"
                striped
                hover
                style="font-size: 1.3rem"
                :responsive="true"
              >
                <template #cell(index)="data">
                  {{ data.index + 1 }}
                </template>

                <template #cell(adm_no)="data">
                  <div>{{ data.value }}</div>
                </template>

                <template #cell(klase)="data">
                  <b-badge
                    style="line-height: 1.6"
                    variant="success"
                    class="px-2"
                    :id="`klase-${data.index}`"
                  >
                    <div>{{ data.value.name }}</div>
                  </b-badge>
                </template>

                <template #cell(photo)="data">
                  
                  <b-avatar
                    variant="primary"
                    :src="`http://sms.test/storage/student/${data.value}`"
                  >
                  </b-avatar
                  >
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
                  <b-button
                    variant="primary"
                    :to="{
                      name: 'admin-student-slug',
                      params: { slug: data.item.slug },
                    }"
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

                  <b-button variant="danger" size="md" class="px-3">
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
                class="modal"
                :id="infoModal"
                :hide-backdrop="true"
                body-bg-variant="info"
                scrollable
                title="Edit Student Data"
                size="xl"
                :hide-footer="true"
              >
                <AdminEditStudentModal :slug="[slug, infoModal]" />
              </b-modal>
            </b-container>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { STUDENT_QUERIES } from '~/graphql/students/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      items: [],

      fields: [
        {
          key: 'index',
          label: '#',
        },
        {
          key: 'first_name',
          label: 'First Name',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'last_name',
          label: 'Last Name',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'adm_no',
          label: 'Adm no.',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'code',
          label: 'Code',
          sortable: true,
          // sortDirection: 'desc',
        },

        {
          key: 'photo',
          label: 'Photo',
          sortable: true,
          //   class: 'text-center',
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
          key: 'klase',
          label: 'Class',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'phone',
          label: 'Phone',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'admitted_year',
          label: 'Admitted Year.',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'guardian_name',
          label: 'Guardian',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'guardian_no',
          label: 'Guardian no.',
          sortable: true,
          sortDirection: 'desc',
        },
        // {
        //   key: 'guardian_email',
        //   label: 'Guardian Email',
        //   sortable: true,
        //   sortDirection: 'desc',
        // },
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
    students: {
      query: STUDENT_QUERIES,
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
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
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
    deleteItem() {
      console.log('yes')
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
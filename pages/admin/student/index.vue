  <template>
  <div class="fonts">
    <b-button
      to="/admin/teacher/add-teacher"
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
            <h2 class="d-flex justify-content-center mb-4 mt-4">All Teacher</h2>
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

                <b-col sm="5" md="6" class="my-1">
                  <b-form-group
                    label="Per page"
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
                      size="md"
                      style="background-color: #f9f9f9"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <br /><br />
              <!-- Main table element -->
              <b-table
                :items="items"
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
                <template #cell(name)="row">
                  {{ row.value.first }} {{ row.value.last }}
                </template>

                <template #cell(photo)="row">
                  <b-avatar
                    variant="primary"
                    src="@/assets/svg/student-svg.svg"
                  >
                  </b-avatar
                  >{{ row.i }}
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
                <template #cell(actions)="row">
                  <b-button
                    size="smd"
                    variant="info"
                    @click="info(row.item, row.index, $event.target)"
                    class="mr-1"
                  >
                    <b-icon icon="eye-fill"></b-icon>
                  </b-button>

                  <b-button
                    size="smd"
                    variant="primary"
                    @click="row.toggleDetails"
                  >
                    <b-icon icon="pencil-square"></b-icon>
                    <!-- {{ row.detailsShowing ? 'Hide' : 'Show' }} Details -->
                  </b-button>
                  <b-button size="smd" variant="danger" @click="deleteItem">
                    <b-icon icon="trash"></b-icon>
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
                :id="infoModal.id"
                :title="infoModal.title"
                ok-only
                @hide="resetInfoModal"
              >
                <pre>{{ infoModal.content }}</pre>
              </b-modal>
            </b-container>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          paid: true,
          '#': 1,
          code: 12345,
          photo: 40,
          name: { first: 'Dickerson', last: 'Macdonald' },
          gender: true,
          subject_assigned: 5,
          phone: 810000112,
          // _cellVariants: { paid: 'success' },
        },

        {
          paid: false,
          '#': 2,
          code: 12346,
          photo: 21,
          name: { first: 'Larsen', last: 'Shaw' },
          gender: false,
          subject_assigned: 5,
          phone: 810000112,
          // _cellVariants: { paid: 'success' },
        },
      ],

      fields: [
        {
          key: '#',
          label: '#',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'name',
          label: 'Teacher Name',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'code',
          label: 'Code',
          sortable: true,
          sortDirection: 'desc',
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
          formatter: (value, key, item) => {
            return value ? 'male' : 'female'
          },
          sortable: true,
          sortByFormatted: false,
          filterByFormatted: true,
        },

        {
          key: 'paid',
          label: 'Salary',
          formatter: (value, key, item) => {
            return value ? 'paid' : 'Due'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        {
          key: 'subject_assigned',
          label: 'Subjects Assigned',
          sortable: true,
          sortDirection: 'desc',
        },
        {
          key: 'phone',
          label: 'Phone',
          sortable: true,
          sortDirection: 'desc',
        },
        { key: 'actions', label: 'Actions' },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show a lot' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
    }
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
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
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
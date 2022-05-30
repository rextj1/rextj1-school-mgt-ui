  <template>
  <div class="fonts">
    <b-card no-body>
      <b-tabs card style="font-size: 1.4rem">
        <b-tab active>
          <template #title>
            <strong>Incomplete Payment</strong>
          </template>
          <div class="table-down">
            <b-row no-gutters>
              <b-col md="12">
                <div class="card-body">
                  <div class="card-student" style="background-color: #fff">
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
                                <b-button
                                  :disabled="!filter"
                                  @click="filter = ''"
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
                              <b-form-checkbox value="name"
                                >Name</b-form-checkbox
                              >
                              <b-form-checkbox value="photo"
                                >Photo</b-form-checkbox
                              >
                              <b-form-checkbox value="paid"
                                >Paid Fee</b-form-checkbox
                              >
                              <b-form-checkbox value="gender"
                                >Gender</b-form-checkbox
                              >
                            </b-form-checkbox-group>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col md="1"></b-col>
                        <b-col sm="5" md="3" class="my-1">
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
                        :items="paymentRecords"
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

                        <template #cell(student)="data">
                          {{ data.item.student.first_name }}
                          {{ data.item.student.last_name }}
                        </template>

                        <template #cell(klase)="data">
                          {{ data.item.klase.name }}
                        </template>
                        <template #cell(term)="data">
                          {{ data.item.term.name }}
                        </template>
                        <template #cell(session)="data">
                          {{ data.item.session.name }}
                        </template>

                        <template #cell(paidNow)="data">
                          <div>
                            <b-row no-gutters>
                              <b-col md="4">
                                <input
                                  style="
                                    width: 10rem;
                                    padding: 0.3rem 0 0.3rem 0.9rem;
                                    font-size: 1.55rem;
                                  "
                                  @keydown.enter="
                                    payFee(data.item.id, $event.target.value)
                                  "
                                  :ref="`t-${data.item.id}`"
                                  type="number"
                                  placeholder="Pay now"
                                  min="0"
                                  required
                                  size="lg"
                                />
                              </b-col>
                            </b-row>
                          </div>
                        </template>

                        <!-- view modal -->
                        <template #cell(actions)="data">
                          <b-button
                            variant="danger"
                            size="md"
                            class="px-3"
                            type="submit"
                            @click="getModal(data.item.id)"
                          >
                            Reset
                          </b-button>

                          <b-button
                            v-show="data.item.amt_paid > 0"
                            variant="success"
                            size="md"
                            class="px-3 ml-2"
                            @click.prevent="generateReport"
                          >
                            <b-icon class="ml-2" icon="printer" />

                            Print
                          </b-button>

                          <vue-html2pdf
                            ref="html2Pdf"
                            :show-layout="true"
                            :float-layout="false"
                            :enable-download="false"
                            :preview-modal="true"
                            :paginate-elements-by-height="1400"
                            filename="Pdf"
                            :pdf-quality="2"
                            :manual-pagination="false"
                            pdf-format="a4"
                            pdf-orientation="landscape"
                            pdf-content-width=""
                          >
                            <section slot="pdf-content">
                              <div
                                class="display"
                                style="
                                  background-color: #f2f3fd;
                                  padding: 5rem;
                                  width: 80%;
                                  margin: 5rem auto;
                                  height: 100vh;
                                "
                              >
                                <h2 align="center">Ronazon International</h2>
                                <h3 align="center">{{data.item.term.name}} Payment Receipt</h3>
                                <h3 align="center">{{data.item.session.name}} Session</h3>
                                <h3>
                                  Receipt Reference Number:
                                  {{ data.item.receipt }}
                                </h3>

                                <div
                                  style="
                                    background-color: blue;
                                    width: 100%;
                                    height: 5rem;
                                  "
                                >
                                  STUDENT INFORMATION
                                </div>
                                <div class="d-flex">
                                  <div>
                                    <b-img
                                      thumbnail
                                      src="@/assets/images/teacher.jpeg"
                                      width="100"
                                    ></b-img>
                                  </div>
                                  <div
                                    style="margin-left: 2rem; margin-top: 1rem"
                                  >
                                    <h2>
                                      NAME:
                                      {{ data.item.student.first_name }}
                                      {{ data.item.student.last_name }}
                                    </h2>
                                    <h2>
                                      ADM_NO: {{ data.item.student.adm_no }}
                                    </h2>
                                    <h2>CLASS: {{ data.item.klase.name }}</h2>
                                  </div>
                                </div>
                                <h2
                                  style="
                                    background-color: blue;
                                    width: 100%;
                                    height: 5rem;
                                  "
                                >
                                  PAYMENT INFORMATION
                                </h2>
                                <h2>TITLE: {{ data.item.title }}</h2>
                                <h2>REFERENCE: {{ data.item.ref_no }}</h2>
                                <h2>
                                  AMOUNT PAID: <span>&#x20A6;</span
                                  >{{ data.item.amt_paid }}
                                </h2>
                                <h2>
                                  BALANCE: <span>&#x20A6;</span
                                  >{{ data.item.balance }}
                                </h2>
                                <h2>
                                  TOTAL DUE: <span>&#x20A6;</span
                                  >{{ data.item.balance }}
                                </h2>
                              </div>
                            </section>
                          </vue-html2pdf>
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
                  </div>

                  <!-- modal -->
                  <b-modal
                    :id="infoModal"
                    class="modal"
                    :hide-backdrop="false"
                    body-bg-variant=""
                    size="sm"
                    centered
                    :hide-footer="true"
                  >
                    <template #default="{ hide }">
                      <div class="p-4 text-center">
                        <h4 class="mb-3">
                          This payment will be reset to default.
                        </h4>
                        <h5>Are you sure you want to continue?</h5>

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
                            :disabled="resetBusy"
                            @click="resetPayment"
                          >
                            <b-spinner v-if="resetBusy" class="mr-1" small />
                            Reset
                          </b-button>
                        </div>
                      </div>
                    </template>
                  </b-modal>
                  <!-- end modal -->
                </div>
              </b-col>
            </b-row>
          </div>
        </b-tab>

        <b-tab>
          <template #title>
            <strong>Complete Payment</strong>
          </template>
          <div class="table-down">
            <b-row no-gutters>
              <b-col md="12">
                <div class="card-body">
                  <div class="card-student" style="background-color: #fff">
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
                                <b-button
                                  :disabled="!filter"
                                  @click="filter = ''"
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
                              <b-form-checkbox value="name"
                                >Name</b-form-checkbox
                              >
                              <b-form-checkbox value="photo"
                                >Photo</b-form-checkbox
                              >
                              <b-form-checkbox value="paid"
                                >Paid Fee</b-form-checkbox
                              >
                              <b-form-checkbox value="gender"
                                >Gender</b-form-checkbox
                              >
                            </b-form-checkbox-group>
                          </b-form-group>
                        </b-col>
                      </b-row>

                      <b-row>
                        <b-col md="1"></b-col>
                        <b-col sm="5" md="3" class="my-1">
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
                        :items="paidPaymentRecords"
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

                        <template #cell(student)="data">
                          {{ data.item.student.first_name }}
                          {{ data.item.student.last_name }}
                        </template>

                        <template #cell(klase)="data">
                          {{ data.item.klase.name }}
                        </template>
                        <template #cell(term)="data">
                          {{ data.item.term.name }}
                        </template>
                        <template #cell(session)="data">
                          {{ data.item.session.name }}
                        </template>
                        <template #cell(paidNow)="data">
                          {{ data.item.status }}
                        </template>

                        <!-- view modal -->
                        <template #cell(actions)="data">
                          <b-button
                            variant="secondary"
                            size="md"
                            class="px-3 ml-2"
                            @click.prevent="generateReports"
                          >
                            <b-icon class="ml-2" icon="printer" />

                            Print
                          </b-button>

                          <vue-html2pdf
                            ref="html2Pdf1"
                            :show-layout="true"
                            :float-layout="false"
                            :enable-download="false"
                            :preview-modal="true"
                            :paginate-elements-by-height="1400"
                            filename="Pdf"
                            :pdf-quality="2"
                            :manual-pagination="false"
                            pdf-format="a4"
                            pdf-orientation="landscape"
                            pdf-content-width=""
                          >
                            <section slot="pdf-content">
                              <div
                                class="display"
                                style="
                                  background-color: #f2f3fd;
                                  padding: 5rem;
                                  width: 80%;
                                  margin: 5rem auto;
                                  height: 100vh;
                                "
                              >
                                <h2 align="center">Ronazon International</h2>
                                <h3 align="center">Payment Receipt</h3>
                                <h3>
                                  Receipt Reference Number:
                                  {{ data.item.receipt }}
                                </h3>

                                <div
                                  style="
                                    background-color: blue;
                                    width: 100%;
                                    height: 5rem;
                                  "
                                >
                                  STUDENT INFORMATION
                                </div>
                                <div class="d-flex">
                                  <div>
                                    <b-img
                                      thumbnail
                                      src="@/assets/images/teacher.jpeg"
                                      width="100"
                                    ></b-img>
                                  </div>
                                  <div
                                    style="margin-left: 2rem; margin-top: 1rem"
                                  >
                                    <h2>
                                      NAME:
                                      {{ data.item.student.first_name }}
                                      {{ data.item.student.last_name }}
                                    </h2>
                                    <h2>
                                      ADM_NO: {{ data.item.student.adm_no }}
                                    </h2>
                                    <h2>CLASS: {{ data.item.klase.name }}</h2>
                                  </div>
                                </div>
                                <h2
                                  style="
                                    background-color: blue;
                                    width: 100%;
                                    height: 5rem;
                                  "
                                >
                                  PAYMENT INFORMATION
                                </h2>
                                <h2>TITLE: {{ data.item.title }}</h2>
                                <h2>REFERENCE: {{ data.item.ref_no }}</h2>
                                <h2>
                                  AMOUNT PAID: <span>&#x20A6;</span
                                  >{{ data.item.amt_paid }}
                                </h2>
                                <h2>
                                  BALANCE: <span>&#x20A6;</span
                                  >{{ data.item.balance }}
                                </h2>
                                <h2>
                                  TOTAL DUE: <span>&#x20A6;</span
                                  >{{ data.item.balance }}
                                </h2>
                              </div>
                            </section>
                          </vue-html2pdf>
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
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import {
  CREATE_PAYMENT_RECORD_MUTATION,
  RESET_PAYMENT_RECORD_MUTATION,
} from '~/graphql/payments/mutations'
import { PAYMENT_RECORD_QUERIES } from '~/graphql/payments/queries'
export default {
  props: {
    paymentRecords: Array,
    paidPaymentRecords: Array,
    student: Array,
  },
  data() {
    return {
      id: null,
      resetBusy: false,
      payment: {},
      infoModal: 'modelInfo',
      resetThisPayment: 'reset-Payment',
      form: new this.$form({
        id: null,
        class: null,
        term: null,
        session: null,
        amounts: null,
        busy: false,
      }),

      items: [],

      fields: [
        {
          key: 'index',
          label: 'S/N',
        },
        {
          key: 'student',
          label: 'Name',
          sortable: true,
          // sortDirection: 'desc',
        },

        {
          key: 'ref_no',
          label: 'Ref No.',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'klase',
          label: 'Class',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'term',
          label: 'Term',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'session',
          label: 'Session',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'amount',
          label: 'Amount',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'amt_paid',
          label: 'Paid',
          sortable: true,

          // sortDirection: 'desc',
        },
        {
          key: 'balance',
          label: 'Balance',
          sortable: true,
          // sortDirection: 'desc',
        },
        {
          key: 'paidNow',
          label: 'Paid Now',
          sortable: true,
          // sortDirection: 'desc',
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
    generateReport() {
      this.$refs.html2Pdf.generatePdf()
    },
    generateReports() {
      this.$refs.html2Pdf1.generatePdf()
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getModal(item) {
      this.id = item
      this.$bvModal.show(this.infoModal)
    },
    resetPayment() {
      this.resetBusy =true
      this.$apollo
        .mutate({
          mutation: RESET_PAYMENT_RECORD_MUTATION,
          variables: {
            id: parseInt(this.id),
          },
          update: (store, { data: { createPaymentRecord } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: PAYMENT_RECORD_QUERIES,
              variables: {
                klase_id: parseInt(this.student[0]),
                session_id: parseInt(this.student[2]),
                term_id: parseInt(this.student[1]),
              },
            })

            data.paymentRecords = data.paymentRecords.filter((t) => {
              return t.status === 'Due'
            })

            store.writeQuery({
              query: PAYMENT_RECORD_QUERIES,
              variables: {
                klase_id: parseInt(this.student[0]),
                session_id: parseInt(this.student[2]),
                term_id: parseInt(this.student[1]),
              },
              data,
            })
          },
        })
        .then(({ data }) => {
        
         this.$bvModal.hide(this.infoModal)
          this.resetBusy =false
        })
    },

    payFee(id, value) {
      if (value == null || value == 0) {
        Swal.fire({
          title: 'Ooops...',
          icon: 'warning',
          text: 'Field cannot be empty!',
          position: 'center',
          color: '#fff',
          background: '#cc3300',
          toast: false,
          backdrop: false,
          timer: 1500,
          showConfirmButton: false,
        })
      } else {
        const payId = id
        const payValue = value
        this.$refs[`t-${payId}`].value = null

        this.$apollo
          .mutate({
            mutation: CREATE_PAYMENT_RECORD_MUTATION,
            variables: {
              id: parseInt(payId),
              amt_paid: parseInt(payValue),
            },
            update: (store, { data: { createPaymentRecord } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: PAYMENT_RECORD_QUERIES,
                variables: {
                  klase_id: parseInt(this.student[0]),
                  session_id: parseInt(this.student[2]),
                  term_id: parseInt(this.student[1]),
                },
              })

              data.paymentRecords = data.paymentRecords.filter((t) => {
                return t.status === 'Due'
              })

              store.writeQuery({
                query: PAYMENT_RECORD_QUERIES,
                variables: {
                  klase_id: parseInt(this.student[0]),
                  session_id: parseInt(this.student[2]),
                  term_id: parseInt(this.student[1]),
                },
                data,
              })
            },
          })
          .then(({ data }) => {
            Swal.fire({
              title: 'Done...',
              icon: 'success',
              timer: 1000,
              position: 'center',
              color: '#fff',
              background: '#4bb543',
              toast: false,
              backdrop: false,
            })
          })
      }
    },
  },
}
</script>

<style lang="scss">
.fonts {
  .display {
    display: none;
  }
  font-size: 1.6rem !important;
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



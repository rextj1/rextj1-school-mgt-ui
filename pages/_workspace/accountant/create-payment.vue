<template>
  <div class="create-payment p-3">
    <template v-if="nowLoading"><Preload /></template>
    <template v-else>
      <b-card no-body style="border-radius: 6px">
        <b-tabs card>
          <b-tab active>
            <template #title>
              <strong>All Fees</strong>
            </template>

            <b-card class="card-student">
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
                  :items="payments"
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

                  <template #cell(klase)="data">
                    {{ data.item.klase.name }}
                  </template>
                  <template #cell(term)="data">
                    {{ data.item.term.name }}
                  </template>
                  <template #cell(session)="data">
                    {{ data.item.session.name }}
                  </template>

                  <template #cell(amount)="data">
                    <div v-if="amountId == data.item.id">
                      <b-row no-gutters>
                        <b-col md="4">
                          <input
                            v-model="form.amounts"
                            style="width: 10rem"
                            type="text"
                            required
                            size="lg"
                            @blur="updatingAmount(data.value)"
                            @keydown.enter="editField(data.item.id)"
                          />
                        </b-col>
                      </b-row>
                    </div>

                    <div v-else @click="setToEditing(data.item.id)">
                      {{ data.value }}
                    </div>
                  </template>

                  <!-- view modal -->
                  <template #cell(actions)="data">
                    <b-button
                      variant="info"
                      size="sm"
                      class="px-3"
                      @click="setToEditing(data.item.id)"
                    >
                      Edit
                    </b-button>

                    <b-button variant="danger" size="sm" class="px-3">
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
            </b-card>
          </b-tab>

          <b-tab lazy>
            <template #title>
              <b-icon icon="plus" /><strong>Create Payment</strong>
            </template>

            <div class="mt-5 ml-4">
              <!-- expense type -->

              <b-form
                method="POST"
                @submit.prevent="onSubmit"
                @keydown="form.onKeydown($event)"
                @reset.prevent="onReset"
              >
                <b-row>
                  <b-col md="2">
                    <label for="input-small" class="label-padding"
                      >Title:</label
                    >
                  </b-col>

                  <b-col md="4">
                    <b-form-group>
                      <b-form-select v-model="title" size="lg">
                        <!-- This slot appears above the options from 'options' prop -->
                        <template #first>
                          <b-form-select-option :value="null"
                            >School Fee</b-form-select-option
                          >
                        </template>

                        <!-- These options will appear after the ones from 'options' prop -->
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>

                <!-- class -->
                <b-row class="mt-2">
                  <b-col md="2">
                    <label for="input-small" class="label-padding"
                      >Class:</label
                    >
                  </b-col>

                  <b-col md="4">
                    <b-form-select v-model="form.class" required>
                      <template #first>
                        <b-form-select-option :value="null" disabled
                          >--- select class ---</b-form-select-option
                        >
                      </template>

                      <b-form-select-option
                        :value="`${klase.id}`"
                        v-for="klase in klases"
                        :key="klase.id"
                        >{{ klase.name }}</b-form-select-option
                      >
                    </b-form-select>
                  </b-col>
                </b-row>

                <b-row class="mt-3">
                  <b-col md="2">
                    <label for="input-small" class="label-padding">Term:</label>
                  </b-col>

                  <b-col md="4">
                    <b-form-group>
                      <b-form-select
                        id="terms"
                        v-model="form.term"
                        value-field="id"
                        text-field="name"
                        :options="terms"
                        size="lg"
                        required
                      >
                        <!-- This slot appears above the options from 'options' prop -->
                        <template #first>
                          <b-form-select-option :value="null" disabled
                            >-- Select term--</b-form-select-option
                          >
                        </template>

                        <!-- These options will appear after the ones from 'options' prop -->
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="2" class="mt-3">
                    <label for="input-small" class="label-padding"
                      >Session:</label
                    >
                  </b-col>

                  <b-col md="4">
                    <b-form-group>
                      <b-form-select
                        id="sessions"
                        v-model="form.session"
                        value-field="id"
                        text-field="name"
                        :options="sessions"
                        size="lg"
                        required
                      >
                        <!-- This slot appears above the options from 'options' prop -->
                        <template #first>
                          <b-form-select-option :value="null" disabled
                            >-- Select session--</b-form-select-option
                          >
                        </template>

                        <!-- These options will appear after the ones from 'options' prop -->
                      </b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col md="2" class="mt-3">
                    <label for="input-small" class="label-padding"
                      >Amount(&#x20A6;):</label
                    >
                  </b-col>

                  <b-col md="4">
                    <b-form-input
                      id="amount"
                      v-model="form.amount"
                      name="amount"
                      placeholder="Enter the Amount"
                      trim
                      type="number"
                      size="lg"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      :state="!form.errors.has('amount')"
                    >
                      {{ form.errors.get('amount') }}
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
                <!-- description -->

                <b-row>
                  <b-col md="10" class="text-center p-4 mt-2 mb-4"
                    ><b-button
                      type="submit"
                      variant="primary"
                      class="mr-4"
                      size="md"
                      :disabled="form.busy"
                    >
                      <b-spinner
                        v-if="form.busy"
                        variant="light"
                        small
                        class="mr-1 mb-1"
                      />Submit</b-button
                    >
                  </b-col>
                </b-row>
              </b-form>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import {
  CREATE_PAYMENT_FIELD_MUTATION,
  UPDATE_PAYMENT_FIELD_MUTATION,
} from '@/graphql/payments/mutations'
import { PAYMENT_QUERIES, PAYMENT_QUERY } from '@/graphql/payments/queries'
import { KLASE_QUERIES } from '~/graphql/klases/queries'
import { TERM_QUERIES } from '~/graphql/marks/queries'
import Swal from 'sweetalert2'
import { SESSION_QUERIES } from '~/graphql/sessions/queries'
import Preload from '~/components/Preload.vue'

export default {
  components: { Preload },
  middleware: 'auth',
  data() {
    return {
      title: null,
      others: false,
      amountId: '',
      payment: {},
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
          label: '#',
        },
        {
          key: 'title',
          label: 'Title',
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
    klases: {
      query: KLASE_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
    terms: {
      query: TERM_QUERIES,
    },
    sessions: {
      query: SESSION_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
    payments: {
      query: PAYMENT_QUERIES,
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
    nowLoading() {
      return (
        this.$apollo.queries.klases.loading &&
        this.$apollo.queries.sessions.loading &&
        this.$apollo.queries.terms.loading &&
        this.$apollo.queries.payments.loading
      )
    },
    ...mapState(useWorkspaceStore, ['currentWorkspace']),
    mainWorkspace() {
      return this.currentWorkspace
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },

  methods: {
    // filter and update
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    // update
    updatingAmount() {
      this.amountId = ''
    },
    setToEditing(item) {
      this.amountId = item

      if (item > 0) {
        this.$apollo.addSmartQuery('payment', {
          query: PAYMENT_QUERY,
          variables() {
            return {
              id: parseInt(item),
              workspaceId: parseInt(this.mainWorkspace.id),
            }
          },
          result({ data, loading }) {
            if (!loading) {
              this.form.id = parseInt(data.payment.id)
              this.form.amounts = data.payment.amount
            }
          },
        })
      }
    },

    // update now
    editField(item) {
      this.$apollo
        .mutate({
          mutation: UPDATE_PAYMENT_FIELD_MUTATION,
          variables: {
            id: parseInt(item),
            amount: parseInt(this.form.amounts),
            workspaceId: parseInt(this.mainWorkspace.id),
          },
        })
        .then(() => {
          this.amountId = ''
          Swal.fire({
            timer: 1500,
            text: 'School Fee upadted successfully',
            position: 'top-right',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            showConfirmButton: false,
          })
        })
        .catch(({ graphQLErrors }) => {
          this.form.busy = false

          Swal.fire({
            icon: 'warning',
            text: `There's error proccessing this page!`,
            position: 'top-right',
            color: '#fff',
            background: '#cc3300',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
        })
    },
    // create
    async onSubmit() {
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: CREATE_PAYMENT_FIELD_MUTATION,
            variables: {
              amount: parseInt(this.form.amount),
              klase: this.form.class,
              term_id: parseInt(this.form.term),
              session_id: parseInt(this.form.session),
              workspaceId: parseInt(this.mainWorkspace.id),
            },
            update: (store, { data: { createPayment } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: PAYMENT_QUERIES,
                variables: {
                  workspaceId: parseInt(this.mainWorkspace.id),
                },
              })

              if (createPayment == null) {
                return
              } else {
                data.payments.push(createPayment)

                store.writeQuery({
                  query: PAYMENT_QUERIES,
                  variables: {
                    workspaceId: parseInt(this.mainWorkspace.id),
                  },
                  data,
                })
              }
            },
          })
          .then(({ data }) => {
            if (data.createPayment == null) {
              Swal.fire({
                text: 'School Fee Payment Record already exits or no student in current class',
                position: 'center',
                color: '#fff',
                background: '#df534f',
                toast: false,
                backdrop: false,
              })
              this.form.busy = false
              return
            }
            Swal.fire({
              timer: 1500,
              text: 'School Fee set successfully',
              position: 'top-right',
              color: '#fff',
              background: '#4bb543',
              toast: false,
              backdrop: false,
              showConfirmButton: false,
            })
            this.form.amount = ''
            this.form.term = null
            this.form.session = null
            this.form.class = null
            this.form.busy = false
          })
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

<style lang="scss" scoped>
.create-payment {
  border-radius: 0.5rem;
  border: none;

  .card-student {
    border: none;
    border-radius: 0.5rem;
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
      font-size: 16px;
    }
    .form-control,
    .mb-3 {
      height: 38px;
      font-size: 16px;
    }
  }
}
</style>

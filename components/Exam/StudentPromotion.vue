<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h6 class="card-title font-weight-bold">Student Results</h6>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="p-3 roles-table">
            <h2 class="p-4 d-flex justify-content-center">
              Student Result Section
            </h2>
            <b-table :items="promoteStudents" :fields="fields">
              <template #cell(#)="data">
                {{ data.index + 1 }}
              </template>

              <template #cell(first_name)="data">
                {{ data.item.first_name }} {{ data.item.last_name }}
              </template>

              <template #cell(session)="data">
                {{ data.item.session.name }}
              </template>

              <template #cell(klase)="data">
                {{ data.item.klase.name }}
              </template>

              <template #cell(actions)="data">
                <b-button
                  variant="danger"
                  size="md"
                  class="px-3"
                  @click="resultModal(data.item.student.id)"
                >
                  <b-icon icon="eye" class="mr-1"></b-icon>
                  View Result
                </b-button>
              </template>
            </b-table>
          </div>
          <div
            class="d-flex justify-content-center"
            @click="createPromoteStudents"
          >
            <b-button variant="success" size="lg">
              <b-spinner
                variant="light"
                v-if="busy"
                small
                class="mr-1 mb-1"
              />Promote Students</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { CREATE_PROMOTION_MUTATION } from '~/graphql/promotions/mutations'
import { PROMOTESTUDENTS_QUERIES } from '~/graphql/promotions/queries'
export default {
  props: {
    promoteStudents: Array,
    student: Array,
  },
  data() {
    return {
      busy: false,
      fields: [
        {
          key: '#',
          sortable: false,
        },
        {
          key: 'first_name',
          label: 'Full Name',
          sortable: false,
        },
        {
          key: 'adm_no',
          label: 'Adm_no.',
        },
        {
          key: 'klase',
          label: 'Class',
        },
        {
          key: 'cum_avg',
          label: 'Cum Average.',
        },
        {
          key: 'session',
          label: 'Session.',
        },

        {
          key: '',
          sortable: false,
        },
        {
          key: 'actions',
          label: 'Actions',
          sortable: false,
        },
      ],
    }
  },

  methods: {
    createPromoteStudents() {
      const klase = parseInt(this.student[0])
      const session = parseInt(this.student[2])
      this.busy = true
      this.$apollo
        .mutate({
          mutation: CREATE_PROMOTION_MUTATION,
          variables: {
            klase_id: parseInt(this.student[0]),
            klaseTo: parseInt(this.student[1]),
            session_id: parseInt(this.student[2]),
            sessionTo: parseInt(this.student[3]),
          },
          update: (store, { data: { createPromoteStudents } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: PROMOTESTUDENTS_QUERIES,
              variables: {
                klase_id: parseInt(klase),
                status: true,
                session_id: parseInt(session),
              },
            })

            data.promoteStudents = data.promoteStudents.filter((t) => {
              return t.status === true
            })
            data.promoteStudents = createPromoteStudents

            store.writeQuery({
              query: PROMOTESTUDENTS_QUERIES,
              variables: {
                klase_id: parseInt(klase),
                status: true,
                session_id: parseInt(session),
              },

              data,
            })
          },
        })
        .then(({ data }) => {
          this.busy = false
          Swal.fire({
            title: 'Good',
            icon: 'success',
            text: 'Students promoted to next class!',
            position: 'center',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  font-size: 1.5rem;
}
</style>
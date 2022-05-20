<template>
  <div class="card">
    <div class="card-header"></div>
    <div class="card">
      <div class="card-body">
        {{promotioMark}}
        <div class="p-3 roles-table">
          <div v-if="promoteStudents[0] == null"></div>
          <div v-else>
            <h2
              class="p-4 d-flex justify-content-center"
              style="font-weight: bold"
            >
              ({{ promoteStudents[0].klase.name }}) Student Result Section
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

              <!-- <template #cell(actions)="data">
                  <b-button
                    variant="danger"
                    size="md"
                    class="px-3"
                    @click="resultModal(data.item.student.id)"
                  >
                    <b-icon icon="eye" class="mr-1"></b-icon>
                    View Result
                  </b-button>
                </template> -->
            </b-table>
          </div>
        </div>
        <div
          class="d-flex justify-content-center"
          @click="createPromoteStudents"
        >
          <b-button variant="danger" size="lg">
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
</template>

<script>
import Swal from 'sweetalert2'
import { CREATE_PROMOTION_MUTATION } from '~/graphql/promotions/mutations'
import { PROMOTESTUDENTS_QUERIES } from '~/graphql/promotions/queries'
export default {
  props: {
    promoteStudents: Array,
    student: Array,
    setPromotion: Array,
  },
  data() {
    return {
      busy: false,
      promotioMark: '',
      set: null,
      avg: '',
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
  beforeUpdate() {
    const promotioMark = this.setPromotion[0].name
    this.promotioMark = promotioMark
  },

  methods: {
    createPromoteStudents() {
      if (this.promoteStudents.length !== 0) {
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
              showConfirmButton: false,
            })
          })
      } else {
        Swal.fire({
          title: 'Ooops...',
          icon: 'warning',
          text: 'No record found!',
          position: 'center',
          color: '#fff',
          background: '#cc3300',
          toast: false,
          backdrop: false,
          timer: 1500,
          showConfirmButton: false,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  font-size: 1.5rem;
}
</style>
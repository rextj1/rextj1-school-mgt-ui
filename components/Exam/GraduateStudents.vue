<template>
  <div>
    <b-card class="p-4">
      <template v-if="examRecords.length == 0"
        ><h3 class="text-center p-4">No record found</h3></template
      >
      <template v-else>
        <div
          v-if="examRecords[0].ps == 'graduated'"
          class="w-100 py-2 text-center align-middle"
          style="background-color: green; color:#fff"
        >
          Result Published
        </div>
        

        <div
          v-else
          class="w-100 py-2 text-center align-middle"
          style="background-color: #d9530f; color:#fff"
        >
          Result Unpublished
        </div>


        <h2 class="p-4 text-center" style="font-weight: bold">
          <span style="color: green">({{ examRecords[0].klase.name }})</span>
          Student Result Section
        </h2>
        <b-table :items="examRecords" :responsive="true" :fields="fields">
          <template #cell(#)="data">
            {{ data.index + 1 }}
          </template>

          <template #cell(first_name)="data">
            {{ data.item.student.last_name }} {{ data.item.student.first_name }}
          </template>
          <template #cell(adm_no)="data">
            {{ data.item.student.adm_no }}
          </template>

          <template #cell(session)="data">
            {{ data.item.session.name }}
          </template>

          <template #cell(klase)="data">
            {{ data.item.klase.name }}
          </template>
        </b-table>

        <div class="text-center mb-4">
          <b-button
            v-if="examRecords[0].ps == 'graduated'"
            :disabled="busy"
            variant="danger"
            size="lg"
            @click="graduateStudents('notGraduated')"
          >
            <b-spinner
              v-if="busy"
              variant="light"
              small
              class="mr-1 mb-1"
            />Reset Graduate
          </b-button>

          <b-button
            v-else
            :disabled="busy"
            variant="success"
            size="lg"
            @click="graduateStudents('graduated')"
          >
            <b-spinner v-if="busy" variant="light" small class="mr-1 mb-1" />
            Students Graduate</b-button
          >
        </div>
      </template>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { EXAM_RECORD_QUERIES } from '~/graphql/examRecord/queries'
import { CREATE_GRADUATE_MUTATION } from '~/graphql/examRecord/mutations'
export default {
  props: {
    examRecords: Array,
    student: Array,
    setPromotion: Object,
  },
  data() {
    return {
      busy: false,
      set: null,
      graduateId: null,
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
          key: 'action',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  methods: {
    graduateStudents(item) {
      const klase = parseInt(this.student[0])
      const session = parseInt(this.student[1])
      this.busy = true
      this.$apollo
        .mutate({
          mutation: CREATE_GRADUATE_MUTATION,
          variables: {
            klase_id: parseInt(this.student[0]),
            session_id: parseInt(this.student[1]),
            status: item,
            workspaceId: parseInt(this.mainWorkspace.id),
          },
          update: (store, { data: { createGraduates } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: EXAM_RECORD_QUERIES,
              variables: {
                klase_id: parseInt(this.student[0]),
                term_id: 3,
                session_id: parseInt(this.student[1]),
                workspaceId: parseInt(this.mainWorkspace.id),
              },
            })

            data.klaseResults = createGraduates

            store.writeQuery({
              query: EXAM_RECORD_QUERIES,
              variables: {
                klase_id: parseInt(this.student[0]),
                term_id: 3,
                session_id: parseInt(this.student[1]),
                workspaceId: parseInt(this.mainWorkspace.id),
              },

              data,
            })
          },
        })
        .then(() => {
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
        .catch(() => {})
    },
  },
}
</script>

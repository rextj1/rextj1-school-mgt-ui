<template>
  <div>
    <div class="card">
      <div class="card">
        <div class="card-body">
          <div class="p-3 roles-table">
            <h2
              class="p-4 d-flex justify-content-center"
              style="font-weight: bold"
            >
              Reset Student Promotion
            </h2>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Previous Class</th>
                  <th scope="col">current Class</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(reset, index) in resetPromotion" :key="reset.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    {{ reset.student.first_name }} {{ reset.student.last_name }}
                  </td>

                  <td>
                    <b-img
                      :src="`${$config.APIRoot}/storage/student/${reset.student.photo}`"
                      alt="photo"
                      width="30"
                    />
                  </td>

                  <td>
                    {{ resetKlase.name }}
                  </td>

                  <td>
                    {{ reset.student.klase.name }}
                  </td>

                  <td style="color: green">
                    {{ reset.status == true ? 'Promoted' : '' }}
                  </td>
                  <td>
                    <div
                      class="d-flex justify-content-center"
                      @click="createPromoteStudents"
                    >
                      <b-button variant="danger" size="lg">
                        <b-spinner
                          variant="danger"
                          v-if="resetSpinner"
                          small
                          class="mr-1 mb-1"
                        />Reset</b-button
                      >
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
              />Reset Promotion By Class</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { CREATE_RESET_PROMOTION_MUTATION } from '~/graphql/promotions/mutations'
import { RESET_PROMOTE_QUERIES } from '~/graphql/promotions/queries'
export default {
  props: {
    resetPromotion: Array,
    student: Array,
    resetKlase: Object,
  },
  data() {
    return {
      busy: false,
      resetSpinner: false,
    }
  },

  methods: {
    createPromoteStudents() {
      if (this.resetPromotion.length !== 0) {
        const klase = parseInt(this.student[0])
        const session = parseInt(this.student[1])
        this.busy = true
        this.$apollo
          .mutate({
            mutation: CREATE_RESET_PROMOTION_MUTATION,
            variables: {
              from_class: parseInt(this.student[0]),
              status: true,
              from_session: parseInt(this.student[1]),
            },
            update: (store, { data: { createResetPromote } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: RESET_PROMOTE_QUERIES,
                variables: {
                  from_class: parseInt(klase),
                  status: true,
                  from_session: parseInt(session),
                },
              })

              data.resetPromotion = data.resetPromotion.filter((t) => {
                return t.from_class !== parseInt(klase)
              })
              // data.resetPromotion = createPromoteStudents

              store.writeQuery({
                query: RESET_PROMOTE_QUERIES,
                variables: {
                  from_class: parseInt(klase),
                  status: true,
                  from_session: parseInt(session),
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

<style lang="scss">
.card {
  font-size: 1.5rem;
  .custom-select,
  .form-control,
  .mb-3 {
    height: 4rem;
    font-size: 1.4rem;
    color: #000;
  }
  .custom-select {
    option {
      font-size: 1.5rem !important;
    }
  }
}
</style>
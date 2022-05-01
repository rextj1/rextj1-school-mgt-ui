<template>
  <div class="student">
    <template v-if="!timetable">
      <div style="background-color: #f1f9ae; width: 100%; height: 30vh">
        <div class="grow">
          <b-spinner
            style="width: 10rem; height: 10rem"
            type="grow"
            variant="danger"
          ></b-spinner>
        </div></div
    ></template>
    <template v-else>
      <div class="p-4 student__wrapper">
        <div class="exam-timetble">
          <b-form
            method="POST"
            @submit.prevent="onSubmit"
            @keydown="form.onKeydown($event)"
          >
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Monday</th>
                  <th scope="col">Tuesday</th>
                  <th scope="col">Wednesday</th>
                  <th scope="col">Thursday</th>
                  <th scope="col">Friday</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th scope="row">
                    <b-input
                      v-model="form.time"
                      style="width: 11rem"
                      type="text"
                    ></b-input>
                  </th>

                  <th scope="row">
                    <b-form-input
                      v-model="form.monday"
                      type="text"
                    ></b-form-input>
                  </th>
                  <th scope="row">
                    <b-form-input
                      v-model="form.tuesday"
                      type="text"
                    ></b-form-input>
                  </th>
                  <th scope="row">
                    <b-form-input
                      v-model="form.wednesday"
                      type="text"
                    ></b-form-input>
                  </th>
                  <th scope="row">
                    <b-form-input
                      v-model="form.thursday"
                      type="text"
                    ></b-form-input>
                  </th>
                  <th scope="row">
                    <b-form-input
                      v-model="form.friday"
                      type="text"
                    ></b-form-input>
                  </th>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-center">
              <b-button type="submit" variant="primary" class="mr-4" size="lg">
                <b-spinner
                  v-if="form.busy"
                  variant="light"
                  small
                  class="mr-1 mb-1"
                />Register</b-button
              >
            </div>
          </b-form>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { UPDATE_TIMETABLE_MUTATION } from '~/graphql/timetables/mutations'
import { TIMETABLE_QUERY } from '~/graphql/timetables/queries'
export default {
  props: {
    slug: Array,
  },
  data() {
    return {
      klaseId: '',
      id: '',
      closeModal: '',
      form: new this.$form({
        id: null,
        time: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        busy: false,
      }),
    }
  },
  created() {
    this.klaseId = this.slug[1]
    this.id = this.slug[0]
    this.closeModal = this.slug[2]
  },
  apollo: {
    timetable: {
      query: TIMETABLE_QUERY,
      variables() {
        return {
          id: parseInt(this.id),
        }
      },
      result({ data, loading }) {
        if (!loading) {
          const timetable = data.timetable
          this.form.keys().forEach((key) => {
            if (timetable[key]) {
              //  if (key === 'image') {
              //   return true
              // }
              this.form[key] = timetable[key]
            }
          })
        }
      },
    },
  },
  methods: {
    onSubmit() {
      const klaseId = this.klaseId
      this.form.busy = true
      const updateId = parseInt(this.form.id)
      this.$apollo
        .mutate({
          mutation: UPDATE_TIMETABLE_MUTATION,
          variables: {
            id: parseInt(this.form.id),
            time: this.form.time,
            monday: this.form.monday,
            tuesday: this.form.tuesday,
            wednesday: this.form.wednesday,
            thursday: this.form.thursday,
            friday: this.form.friday,
            klase_id: parseInt(this.klaseId),
          },
          update: (store, { data: { updateTimetable } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({
              query: TIMETABLE_QUERY,
              variables: {
                id: parseInt(updateId),
              },
            })
            console.log(data)
            // console.log(this.form.class);
            const index = data.timetable.id
            
            if (index !== -1) {
              // Mutate cache result
              data.timetable = updateTimetable

              store.writeQuery({
                query: TIMETABLE_QUERY,
                variables: {
                  id: parseInt(updateId),
                },
                data,
              })
            }
          },
        })
        .then(({ data }) => {
          this.form.busy = false
          this.$bvModal.hide(this.closeModal)
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>
.student {
  font-size: 1.4rem;
  padding: 2rem;
  .form-control,
  .mb-3 {
    background-color: var(--color-input);
    height: 4rem;
    font-size: 1.4rem;
  }
  .custom-select:focus {
    box-shadow: none;
  }

  .custom-select,
  .form-control,
  .mb-3 {
    height: 4rem;
    font-size: 1.4rem;
    color: #000;
  }
  .grow {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .student__wrapper {
    background-color: var(--color-white);
    border-radius: 0.5rem;
    border: none;
  }
}
</style>
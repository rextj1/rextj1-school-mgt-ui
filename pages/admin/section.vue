<template>
  <div class="p-4">
    <template v-if="$apollo.queries.sections.loading"><Preload /></template>
    <template v-else>
      <div class="libarian__wrapper">
        <b-card no-body>
          <div class="p-4">
            <div class="p-3">
              <h3 class="mb-3">All Sections</h3>
              <b-table :items="sections" :fields="fields">
                <template #cell(#)="data">
                  {{ data.index + 1 }}
                </template>
                <template #cell(name)="data">
                  <div v-if="sectionEditingId == data.item.id">
                    <b-row no-gutters>
                      <b-col md="4">
                        <input
                          v-model="form.names"
                          style="width: 10rem"
                          type="text"
                          required
                          size="lg"
                          @blur="updatingSection(data.value)"
                          @keydown.enter="editFiled(data.item.id)"
                        />
                      </b-col>
                    </b-row>
                  </div>

                  <div v-else @click="setToEditing(data.item.id)">
                    {{ data.item.name }}
                  </div>
                </template>

                <template #cell(actions)="data">
                  <b-button
                    variant="primary"
                    size="sm"
                    class="px-3"
                    @click="setToEditing(data.item.id)"
                  >
                    <b-icon icon="pencil" class="mr-1"> </b-icon>
                    Edit
                  </b-button>
                </template>
              </b-table>
            </div>
          </div>

          <!-- Add Classes -->
          <div class="margin-down">
            <!-- description -->
            <b-form
              v-if="show"
              method="POST"
              @submit.prevent="onSubmitCreate"
              @keydown="form.onKeydown($event)"
              @reset.prevent="onReset"
            >
              <!-- description -->
              <b-row no-gutters>
                <b-col md="2">
                  <label
                    for="input-small"
                    class="label-padding ml-4"
                    style="font-size: 2rem"
                    >Name:</label
                  >
                </b-col>

                <b-col md="8">
                  <div class="d-flex">
                    <b-form-input
                      v-model="form.name"
                      placeholder="Enter class"
                      type="text"
                      required
                      size="lg"
                    ></b-form-input>

                    <b-button
                      type="submit"
                      variant="primary"
                      class="mr-4"
                      size="lg"
                    >
                      <b-spinner
                        v-if="form.busy"
                        variant="light"
                        class="mr-1 mb-1"
                        small
                      />Add Section</b-button
                    >
                  </div>
                </b-col>
              </b-row>
            </b-form>
          </div>
        </b-card>
      </div>
    </template>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { SECTION_QUERIES, SECTION_QUERY } from '~/graphql/sections/queries'
import {
  CREATE_SECTION_MUTATION,
  UPDATE_SECTION_MUTATION,
} from '~/graphql/sections/mutations'
export default {
  middleware: 'auth',
  data() {
    return {
      id: 0,
      sectionEditingId: '',
      section: {},
      busy: false,
      form: new this.$form({
        id: 0,
        name: null,
        names: null,
        busy: false,
      }),
      fields: [
        {
          key: '#',
          sortable: false,
        },
        {
          key: 'name',
          sortable: false,
        },
        {
          key: 'actions',
          sortable: false,
        },
      ],
      show: true,
    }
  },
  apollo: {
    sections: {
      query: SECTION_QUERIES,
    },
  },

  methods: {
    // inline editing
    setToEditing(item) {
      this.sectionEditingId = item
      this.id = item

      if (this.id > 0) {
        this.$apollo.addSmartQuery('section', {
          query: SECTION_QUERY,
          variables() {
            return {
              id: parseInt(this.id),
            }
          },
          result({ data, loading }) {
            if (!loading) {
              this.form.id = parseInt(data.section.id)
              this.form.names = data.section.name
            }
          },
        })
      }
    },
    updatingSection() {
      this.sectionEditingId = ''
    },
    // ------- edit ----//
    editFiled(item) {
      this.$apollo
        .mutate({
          mutation: UPDATE_SECTION_MUTATION,
          variables: {
            id: parseInt(item),
            name: this.form.names,
          },
        })
        .then(() => {
          Swal.fire({
            timer: 1000,
            text: 'sussion updated successfully',
            position: 'top-right',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
          })
          this.sectionEditingId = ''
        })
        .catch((e) => {
          console.log(e)
        })
    },

    // ------create --------//
    async onSubmitCreate() {
      this.form.busy = true
      // const subjectVariable = this.form.subject
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: CREATE_SECTION_MUTATION,
            variables: {
              name: this.form.name,
            },
            update: (store, { data: { createSection } }) => {
              // Read the data from our cache for this query.
              const data = store.readQuery({
                query: SECTION_QUERIES,
              })
              // console.log(this.form.class);

              data.sections.push(createSection)
              // console.log(dataCopy)

              // Write our data back to the cache.
              // Write back to the cache
              store.writeQuery({
                query: SECTION_QUERIES,
                data,
              })
            },
          })
          .then(() => {
            this.form.name = ''
            Swal.fire({
              timer: 1000,
              text: 'section saved successfully',
              position: 'top-right',
              color: '#fff',
              background: '#4bb543',
              toast: false,
              confirmButtonColor: false,
              backdrop: false,
            })
            this.form.section = ''
          })

        this.form.busy = false
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

<style lang="scss">
.libarian__wrapper {
  padding: 2rem;
  font-size: 1.4rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: none;

  option {
    padding: 0.3rem;
  }

  .margin-down {
    margin-top: 5rem;

    .label-padding {
      padding-right: 15rem;
      margin-bottom: 5rem;
    }

    .custom-select:focus,
    .form-control.focus,
    .form-control:focus {
      box-shadow: none;
    }

    .custom-select,
    .form-control,
    .mb-3 {
      height: 4rem;
      font-size: 1.4rem;
      color: #000;
      width: 40.6%;
    }
  }
  .table-down {
    padding: 4rem;

    .table {
      margin-bottom: 4rem;
    }
  }

  .custom-select-lg .nav-link.active {
    border-top: 5px solid limegreen;
  }
}
</style>

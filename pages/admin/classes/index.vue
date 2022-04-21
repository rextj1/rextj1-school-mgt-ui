<template>
  <div class="p-4">
    <template v-if="!klases">
      <div style="background-color: #f1f9ae; width: 100%; height: 100vh">
        <div class="grow">
          <b-spinner
            style="width: 30rem; height: 30rem"
            type="grow"
            variant="danger"
          ></b-spinner>
        </div></div
    ></template>
    <template v-else>
      <div class="libarian__wrapper">
        <div class="p-4">
          <div class="p-3">
            <h3 class="mb-3">All Classes</h3>
            <b-table :items="klases" :fields="fields">
              <template #cell(#)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(name)="data">
                <div v-if="klaseEditingId == data.item.id">
                  <b-row no-gutters>
                    <b-col md="4">
                      <b-form-input
                        v-model="form.names"
                        trim
                        type="text"
                        required
                        size="lg"
                        @blur="updatingKlase(data.vale)"
                        @keydown.enter="editFiled(data.item.id)"
                      ></b-form-input>
                    </b-col>
                  </b-row>
                </div>

                <div v-else @click="setToEditing(data.item.id)">
                  {{ data.item.name }}
                </div>
              </template>

              <template #cell(subjects)="data">
                <b-badge
                  :id="`subjects-${data.index}`"
                  variant="info"
                  class="px-2"
                >
                  {{ data.value.length }} subjects
                </b-badge>
                <b-popover
                  v-if="data.value.length > 0"
                  :target="`subjects-${data.index}`"
                  triggers="hover click"
                >
                  <b-nav vertical>
                    <b-nav-item v-for="subject in data.value" :key="subject.id">
                      <h5 style="font-size: 1.3rem">
                        {{ subject.subject }}
                      </h5>
                    </b-nav-item>
                  </b-nav>
                </b-popover>
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
                <b-button variant="danger" size="sm" class="px-3">
                  <b-icon icon="trash" class="mr-1"></b-icon>
                  Delete
                </b-button>
              </template>
            </b-table>
          </div>
        </div>

        <!-- Info modal -->
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
                  class="label-padding"
                  style="font-size: 2rem"
                  >Name:</label
                >
              </b-col>

              <b-col md="8">
                <div class="d-flex">
                  <b-form-input
                    id="name"
                    v-model="form.name"
                    name="name"
                    placeholder="Enter class"
                    trim
                    type="text"
                    required
                    size="lg"
                  ></b-form-input>
                  <!-- <b-form-invalid-feedback :state="!form.errors.has('lastName')">
                      {{ form.errors.get('lastName') }}
                      </b-form-invalid-feedback> -->
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
                    />Add Class</b-button
                  >
                </div>
              </b-col>
            </b-row>
          </b-form>
        </div>
        <!-- end -->
      </div>
    </template>
  </div>
</template>

<script>
import { KLASES_SUBJECT_QUERIES, KLASE_QUERY } from '~/graphql/klases/queries'
import {
  CREATE_KLASE_MUTATION,
  UPDATE_KLASE_MUTATION,
} from '@/graphql/klases/mutations'
export default {
  data() {
    return {
      id: 0,
      klaseEditingId: '',
      editSlug: '',

      form: new this.$form({
        id: 0,
        name: '',
        names: '',
        busy: false,
      }),
      fields: [
        {
          key: '#',
          sortable: false,
        },
        {
          key: 'slug',
          sortable: false,
        },
        {
          key: 'name',
          sortable: false,
        },
        {
          key: 'subjects',
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
    klases: {
      query: KLASES_SUBJECT_QUERIES,
    },
  },

  methods: {
    // inline editing
    setToEditing(item) {
      this.klaseEditingId = item
      this.id = item

      setTimeout(() => {
        if (this.id > 0) {
          this.$apollo.addSmartQuery('klase', {
            query: KLASE_QUERY,
            variables() {
              return {
                id: parseInt(this.id),
              }
            },
            result({ data, loading }) {
              if (!loading) {
                this.form.id = parseInt(data.klase.id)
                this.form.names = data.klase.name
              }
            },
          })
        } else {
          return false
        }
      }, 1)
    },
    updatingKlase() {
      this.klaseEditingId = ''
    },
    editFiled() {
      alert(this.form.names)
      // submit exam
      this.$apollo
        .mutate({
          mutation: UPDATE_KLASE_MUTATION,
          variables: {
            id: parseInt(this.id),

            name: this.form.names,
          },
        })
        .then(({ data }) => {
          this.$bvModal.hide(this.infoModal)
        })
        .catch((error) => {
          error
        })
    },

    async onSubmitCreate() {
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: CREATE_KLASE_MUTATION,
            variables: {
              name: this.form.nameS,
            },
          })
          .then(({ data }) => {
            this.$bvModal.hide(this.infoModal)
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
.grow {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.libarian__wrapper {
  padding: 2rem;
  font-size: 1.4rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: none;

  .margin-down {
    margin-top: 3rem;

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
      height: 4.5rem;
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
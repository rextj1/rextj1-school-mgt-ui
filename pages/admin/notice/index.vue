<template>
  <div class="p-4">
    <template v-if="!notices">
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
        <b-card no-body>
          <b-tabs card style="font-size: 1.4rem">
            <b-tab active>
              <template #title>
                <b-icon icon="plus" /><strong>Add Notice</strong>
              </template>
              <b-form
                v-if="show"
                method="POST"
                @submit.prevent="onSubmit"
                @keydown="form.onKeydown($event)"
                @reset.prevent="onReset"
              >
                <b-row class="p-4">
                  <b-col md="10" class="p-4">
                    <b-form-group label="School Notice">
                      <b-form-textarea
                        id="textarea"
                        v-model="form.description"
                        placeholder="Enter something..."
                        rows="10"
                        cols="10"
                        size="lg"
                        required
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>

                  <b-col md="3" class="p-4">
                    <b-form-group label="Date">
                      <b-form-datepicker
                        id="datepicker-buttons"
                        v-model="form.date"
                        today-button
                        reset-button
                        close-button
                        locale="en"
                        size="lg"
                        required
                      ></b-form-datepicker>
                    </b-form-group>
                  </b-col>

                  <b-col md="12" class="p-4">
                    <b-button
                      type="submit"
                      pill
                      variant="primary"
                      class="mr-4"
                      size="lg"
                    >
                      <b-spinner
                        v-if="form.busy"
                        variant="light"
                        small
                        class="mr-1 mb-1"
                      />Register</b-button
                    >
                    <b-button
                      pill
                      class="ml-4"
                      style="font-size: 1.4rem"
                      size="lg"
                      type="reset"
                      variant="danger"
                      >Reset</b-button
                    >
                  </b-col>
                </b-row>
              </b-form>
            </b-tab>

            <b-tab lazy>
              <template #title>
                <strong>School Notice</strong>
                <b-icon scale="0.8" icon="caret-down-fill" />
              </template>
              <b-col md="12">
                <b-table
                  striped
                  responsive
                  hover
                  :items="notices"
                  :fields="fields"
                >
                  <template #cell(date)="date">
                    <b-badge
                      style="font-size: 1.4rem"
                      class="d-inline-block"
                      variant="warning"
                      >{{ date.value }}</b-badge
                    >
                  </template>
                  <template #cell(actions)="row" class="d-flex">
                    <div class="d-flex">
                      <b-button size="smd" variant="primary" class="mr-1">
                        Unpublished
                      </b-button>
                      <b-button size="smd" variant="info" class="mr-1">
                        <b-icon icon="pencil-square"></b-icon>
                      </b-button>

                      <b-button
                        size="smd"
                        variant="danger"
                        @click="row.toggleDetails"
                      >
                        <b-icon icon="trash"></b-icon>
                      </b-button>
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </template>
  </div>
</template>

<script>
import { CREATE_NOTICE_MUTATION } from '~/graphql/notices/mutations'
import { NOTICE_QUERIES } from '~/graphql/notices/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      form: new this.$form({
        description: null,
        title: null,
        photo: null,
        date: null,
        busy: false,
      }),
      show: true,

      fields: [
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'title',
          label: 'Title',
        },
        {
          key: 'pubished',
          label: 'Published',
        },
        {
          key: 'photo',
          label: 'Photo',
        },

        { key: 'actions', label: 'Actions' },
      ],
    }
  },
  apollo: {
    notices: {
      query: NOTICE_QUERIES,
    },
  },
  methods: {
    // update
    async onSubmit() {
      alert('yu')
      this.form.busy = true
      // submit exam
      try {
        await this.$apollo
          .mutate({
            mutation: CREATE_NOTICE_MUTATION,
            variables: this.form.data(),
          })
          .then(({ data }) => {
            this.$router.push('/')
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

    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form = ''
      // this.form.photo = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
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
  font-size: 1.6rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: none;

  .nav-link.active {
    border-top: 5px solid limegreen;
  }

  .menu {
    ul {
      position: absolute;
      border: none;
      top: -8.5rem;
      left: 14.3rem;
      background-color: #fff;
    }

    li:not(:last-child) {
      background-color: #fff;
      padding: 1.2rem 5.8rem;
      border-bottom: 1px solid gray;
      cursor: pointer;

      &:hover {
        background-color: var(--color-input);
      }
    }
  }
}
</style>
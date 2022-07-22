<template>
  <div>
    <b-modal
      size="md"
      centered
      :value="value"
      :visible="value"
      hide-footer
      title="Edit Event"
      :hide-backdrop="false"
      @change="$emit('input', $event)"
    >
      <b-form
        method="POST"
        @submit.prevent="editEvent"
        @keydown="form.onKeydown($event)"
      >
        <div class="bg-white rounded p-4 edit-lead-modal">
          <b-form-group label="School Event">
            <b-form-textarea
              id="textarea"
              v-model="form.description"
              placeholder="Enter something..."
              rows="3"
              size="lg"
              required
            ></b-form-textarea>
          </b-form-group>

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

          <div class="mt-4 text-right">
            <b-button
              type="submit"
              variant="primary"
              size="sm"
              class="px-3 py-1 blue-shadow"
              :disabled="form.busy"
            >
              <b-spinner v-if="form.busy" small class="mr-1" />
              Update Event
            </b-button>
          </div>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { UPDATE_EVENT_MUTATION } from '~/graphql/events/mutations'
import Swal from 'sweetalert2'
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    event: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: new this.$form({
        id: null,
        description: '',
        date: null,
      }),
    }
  },

  created() {
    this.form.id = this.event.id
    this.form.description = this.event.description
    this.form.date = this.event.date
  },

  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  watch: {
    event(value) {
      this.setEvent(value)
    },
  },

  methods: {
    editEvent() {
      this.form.busy = true
      this.$apollo
        .mutate({
          mutation: UPDATE_EVENT_MUTATION,
          variables: {
            workspace: this.mainWorkspace.slug,
            ...this.form,
          },
        })
        .then(() => {
          this.form.busy = false

          Swal.fire({
            text: `event updated successfully!`,
            position: 'top-right',
            color: '#fff',
            background: '#5cb85c',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
          this.$emit('input', false)
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

    setLead(event) {
      this.form.id = event.id
      this.form.description = event.description
      this.form.date = event.date
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/scss/variables';

.edit-lead-modal {
  padding: 4rem;
  font-size: 17px;

  .form-control {
    border-radius: 10px;
    font-size: 15px;
  }
}
</style>

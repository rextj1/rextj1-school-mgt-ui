<template>
  <div>
    <b-modal
      size="lg"
      centered
      :value="value"
      :visible="value"
      hide-footer
      title="Edit Notice"
      :hide-backdrop="false"
      @change="$emit('input', $event)"
    >
      <b-form
        method="POST"
        @submit.prevent="editNotice"
        @keydown="form.onKeydown($event)"
      >
        <div class="bg-white rounded p-4 edit-lead-modal">
          <b-form-group label="School Notice">
            <client-only>
              <VueEditor v-model="form.description"/>
            </client-only>
            <b-form-invalid-feedback :state="!form.errors.has('description')">
              {{ form.errors.get('description') }}
            </b-form-invalid-feedback>
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
            ></b-form-datepicker>
             <b-form-invalid-feedback :state="!form.errors.has('date')">
              {{ form.errors.get('date') }}
            </b-form-invalid-feedback>
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
              Update Notice
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
import { UPDATE_NOTICE_MUTATION } from '~/graphql/notices/mutations'
import Swal from 'sweetalert2'
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    notice: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: new this.$form({
        id: null,
        description: null,
        date: null,
      }),
    }
  },

  created() {
    this.form.id = this.notice.id
    this.form.description = this.notice.description
    this.form.date = this.notice.date
  },

  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },

  watch: {
    notice(value) {
      this.setNotice(value)
    },
  },

  methods: {
    editNotice() {
      this.form.busy = true
      this.$apollo
        .mutate({
          mutation: UPDATE_NOTICE_MUTATION,
          variables: {
            workspaceId: parseInt(this.mainWorkspace.id),
            ...this.form,
          },
        })
        .then(() => {
          this.form.busy = false

          Swal.fire({
            text: `notice updated successfully!`,
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

    setLead(notice) {
      this.form.id = notice.id
      this.form.description = notice.description
      this.form.date = notice.date
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/scss/variables';

.edit-lead-modal {
  padding: 40px;

  .form-control {
    border-radius: 10px;
    font-size: 16px;
  }
}
</style>

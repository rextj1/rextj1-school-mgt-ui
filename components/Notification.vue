<template>
  <div>
    <div class="d-flex justify-content-between">
      <h3>Notifications</h3>
      <b-button class="mb-2" variant="dark" pill size="sm" @click="close"
        >Mark As Read</b-button
      >
    </div>
    <div v-for="data in user.notifications" :key="data.id" class="">
      <!-- {{ data.data.data }} -->
      <!-- notice -->
      <div v-if="data.type == 'App\\Notifications\\SchoolNotice'">
        <b-card>
          <b-badge variant="danger">{{ data.created_at | formatDate }}</b-badge>
          <span v-html="data.data.description" @click="navigateTo">
            There is a new Event, click here to view
          </span>
        </b-card>
      </div>
      <!-- event -->

      <div v-if="data.type == 'App\\Notifications\\SchoolEvent'">
        <b-card>
          <b-badge variant="primary">{{
            data.created_at | formatDate
          }}</b-badge>
          <span v-html="data.data.description" @click="navigateTo">
            There is a new Event, click here to view
          </span>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { USER_NOTIFICATION_QUERIES } from '~/graphql/notifications/queries'
import { MARK_AS_READ } from '@/graphql/notifications/mutations'
export default {
  filters: {
    formatDate(value) {
      const date = moment.utc(value).local()
      return date.format('D MMM YYYY')
    },
  },
  props: {
    notifyNow: {
      type: Array,
      required: false,
    },
  },
  data: () => ({
    user: [],
  }),
  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  apollo: {
    user: {
      query: USER_NOTIFICATION_QUERIES,
      variables() {
        return { id: parseInt(this.notifyNow[0]) }
      },
    },
  },
  methods: {
    close() {
      this.$apollo
        .mutate({
          mutation: MARK_AS_READ,
          variables: { notifiable_id: parseInt(this.notifyNow[0]) },
        })
        .then(() => {
          this.$bvModal.hide(this.notifyNow[1])
        })
    },
    navigateTo() {
      this.$router.push({
        name: 'workspace-dashboard',
        params: { workspace: this.mainWorkspace.slug },
      }),
        this.$bvModal.hide(this.notifyNow[1])
    },
  },
}
</script>

<style scoped>
span {
  cursor: pointer;
}
</style>

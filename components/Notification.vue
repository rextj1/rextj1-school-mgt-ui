<template>
  <div>
    <b-button variant="warning" size="sm" @click="close">Mark As Read</b-button>
    <div v-for="data in user.notifications" :key="data.id" class="">
      <!-- {{ data.data.data }} -->
      <!-- notice -->
      <div v-if="data.type == 'App\\Notifications\\SchoolNotice'">
        <b-card>
          <span v-html="data.data.data" @click="navigateTo">
            
            There is a new Notice, click here to view
          </span>
          {{ data.created_at | formatDate }}
        </b-card>
      </div>
      <!-- event -->
      <div v-if="data.type == 'App\\Notifications\\SchoolEvent'">
        <b-card>
          <span class="mt-2">There is a new Event, click here to view </span>

          <b-button
            variant="link"
            v-html="data.data.data"
            @click="navigateTo"
          ></b-button>
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
    notifyNow: Array,
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
span{
  cursor: pointer;
}
</style>
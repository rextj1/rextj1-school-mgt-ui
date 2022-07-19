<template>
  <div>
    <div v-for="data in user.notifications" :key="data.id">
      <!-- {{ data.data.data }} -->
      <!-- notice -->
      <div v-if="data.type == 'App\\Notifications\\SchoolNotice'">
        <nuxt-link to="/dashboard"
          >There is a new Notice: {{ data.data.data }}</nuxt-link
        >
      </div>
      <!-- event -->
      <div v-if="data.type == 'App\\Notifications\\SchoolEvent'">
        <nuxt-link to="/dashboard"
          >There is a new Event: {{ data.data.data }}</nuxt-link
        >
      </div>
    </div>
    <div @click="close">Mark As Read</div>
  </div>
</template>

<script>
import { USER_NOTIFICATION_QUERIES } from '~/graphql/notifications/queries'
import { MARK_AS_READ } from '@/graphql/notifications/mutations'
export default {
  props: {
    notifyNow: Array,
  },
  data: () => ({
    user: [],
  }),
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
  },
}
</script>

<style></style>

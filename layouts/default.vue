<template>
  <div>
    <div v-if="$fetchState.pending"><Preload /></div>
    <div v-else-if="$fetchState.error">Error Message</div>
    <div v-else>
      <SideBar />
      <div class="ty"><TopNav /></div>
      <div style="margin-left: 20rem"><Nuxt /></div>
    </div>
  </div>
</template>

<script>
import { GUARDIAN_DASHBOARD_QUERIES } from '~/graphql/guardians/queries'
import { STUDENT_DASHBOARD_QUERIEX } from '~/graphql/students/queries'
import { TEACHER_DASHBOARD_QUERIES } from '~/graphql/teachers/queries'
import { ROLEX_QUERIEX } from '~/graphql/users/queries'
export default {
  async fetch() {
    const { app, route, redirect } = this.$nuxt.context

    const {
      apolloProvider: { defaultClient: apolloClient },
      pinia,
    } = app

    const {
      data: { user },
    } = await apolloClient.query({
      query: ROLEX_QUERIEX,
      variables: { id: parseInt(this.$auth.user.id) },
    })
     const {
      data: { guardiansDashboard },
    } = await apolloClient.query({
      query: GUARDIAN_DASHBOARD_QUERIES
    })
     const {
      data: { teachersDashboard },
    } = await apolloClient.query({
      query: TEACHER_DASHBOARD_QUERIES
 
    })
     const {
      data: { studentsDashboard },
    } = await apolloClient.query({
      query: STUDENT_DASHBOARD_QUERIEX
     
    })

    // if (this.$auth.user.email === 'tojurex@yahoo.om') {
    //   return redirect({
    //     name: 'admin-timetable',
    //   })
    // }
  },
  // fetchDelay: 9000,
}
</script>

<style lang="scss">
.ty {
  margin-top: 6rem;
}
</style>

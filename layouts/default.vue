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
import { mapActions } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { GUARDIAN_DASHBOARD_QUERIES } from '~/graphql/guardians/queries'
import { STUDENT_DASHBOARD_QUERIEX } from '~/graphql/students/queries'
import { TEACHER_DASHBOARD_QUERIES } from '~/graphql/teachers/queries'
import { ROLEX_QUERIEX, USER_WORKSPACE_QUERY } from '~/graphql/users/queries'
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
      data: { userWorkspace },
    } = await apolloClient.query({
      query: USER_WORKSPACE_QUERY,
      variables: { id: parseInt(this.$auth.user.id) },
    })
    console.log(userWorkspace)
    const {
      data: { guardiansDashboard },
    } = await apolloClient.query({
      query: GUARDIAN_DASHBOARD_QUERIES,
      variables: {
        workspaceId: parseInt(userWorkspace.workspace.id),
      },
    })
    const {
      data: { teachersDashboard },
    } = await apolloClient.query({
      query: TEACHER_DASHBOARD_QUERIES,
      variables: {
        workspaceId: parseInt(userWorkspace.workspace.id),
      },
    })
    const {
      data: { studentsDashboard },
    } = await apolloClient.query({
      query: STUDENT_DASHBOARD_QUERIEX,
      variables: {
        workspaceId: parseInt(userWorkspace.workspace.id),
      },
    })

    if (
      this.$auth.user.email === 'tojurex@yahoo.com' &&
      userWorkspace.workspace.name === 'defaultWorkspace'
    ) {
      return redirect({
        name: 'workspace-school',
        params: { workspace: userWorkspace.workspace.name },
      })
    } else {
      return redirect({
        name: 'workspace-dashboard',
        params: { workspace: userWorkspace.workspace.slug },
      })
    }
  },
  // fetchDelay: 8000,

  watch: {
    userWorkspace(value) {
      this.setWorkspaces(value)
    },
  },

  apollo: {
    userWorkspace: {
      query: USER_WORKSPACE_QUERY,
      variables() {
        return { id: parseInt(this.$auth.user.id) }
      },
    },
  },

  methods: {
    ...mapActions(useWorkspaceStore, ['setWorkspace']),
    async setWorkspaces() {
      const {
        apolloProvider: { defaultClient: apolloClient },
      } = this.$nuxt.context.app

      const {
        data: { userWorkspace },
      } = await apolloClient.query({
        query: USER_WORKSPACE_QUERY,
        variables: { id: parseInt(this.$auth.user.id) },
      })
      this.setWorkspace(userWorkspace.workspace)
    },
  },
}
</script>

<style lang="scss">
.ty {
  margin-top: 6rem;
}
</style>

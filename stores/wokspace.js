import { defineStore } from 'pinia'

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    currentWorkspace: {}
  }),

  actions: {
    setWorkspace(workspace) {
      this.$state.currentWorkspace = workspace
    },
  },
})

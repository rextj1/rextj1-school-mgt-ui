import { defineStore } from 'pinia'

export const useToggleMenu = defineStore('toggle', {
  state: () => ({
    isCollasped: true,
  }),

  actions: {
    toggleMenu() {
      this.$state.isCollasped = !this.$state.isCollasped
    },
    toggleIcon() {
      this.$state.isCollasped = true
    },
  },
 
    
  
})

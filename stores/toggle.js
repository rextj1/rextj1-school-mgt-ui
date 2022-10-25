import { defineStore } from 'pinia'

export const useToggleMenu = defineStore('toggle', {
  state: () => ({
    isCollasped: true,
    isHideNav: true,
  }),

  actions: {
    toggleMenu() {
      this.$state.isCollasped = !this.$state.isCollasped
    },
    toggleIcon(item) {
      this.$state.isCollasped = item
    },
    hideNav() {
      this.$state.isHideNav = false
    },
    hideNavs() {
      this.$state.isHideNav = true
    },
  },
 
    
  
})

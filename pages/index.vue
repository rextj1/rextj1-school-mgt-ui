<template>
  <div class="p-4">
    <div class="libarian__wrapper" @click.prevent="hideMenu">
      <b-card no-body @click="hideMenu">
        <b-tabs card style="font-size: 1.4rem">
          <b-tab active @click="hideMenu">
            <template #title>
              <b-icon icon="plus"/><strong>Add Notice</strong>
            </template>
        
          </b-tab>

          <b-tab @click.prevent="registrationMenu" lazy>
            <template #title>
              <strong>School Notice</strong>
              <b-icon scale="0.8" icon="caret-down-fill" />
            </template>
         
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: '',
      registerMenu: false,
      registrationMenuClass: '',
    }
  },
  methods: {
    registrationMenu(e) {
      if (this.registrationMenuClass === '') {
        this.registerMenu = true
        this.registrationMenuClass = 'off'
        e.stopPropagation()
      } else {
        this.registerMenu = false
        this.registrationMenuClass = ''
      }
    },
    hideMenu() {
      if (this.registerMenu === true) {
        this.registerMenu = false
        this.registrationMenuClass = ''
      }
    },
  },
}
</script>

<style lang="scss">
.libarian__wrapper {
  padding: 2rem;
  font-size: 1.4rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: none;

  .nav-link.active {
    border-top: 5px solid limegreen;
  }
}
</style>
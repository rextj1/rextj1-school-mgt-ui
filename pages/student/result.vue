<template>
  <div class="p-4">
    <div class="libarian__wrapper" @click.prevent="hideMenu">
      <b-card no-body @click="hideMenu">
        <b-tabs card style="font-size: 1.4rem">
          <b-tab active @click="hideMenu">
            <template #title>
              <strong>Current Result</strong>
              <b-icon scale="0.8" icon="caret-down-fill" />
            </template>
            <StudentResult />
          </b-tab>

          <b-tab @click.prevent="registrationMenu" lazy>
            <template #title>
              <strong>All Results</strong>
              <b-icon scale="0.8" icon="caret-down-fill" />
            </template>

            <div class="menu" style="background-color: #fff">
              <ul
                class="shadow"
                v-show="registerMenu"
                :class="registrationMenuClass"
              >
                <li @click.prevent="activeTab = 'StudentResult'">
                  <span class="d-flex">JSS1</span>
                </li>
                <li @click.prevent="activeTab = 'StudentResult'">
                  <span class="d-flex">JSS2</span>
                </li>
                <li @click.prevent="activeTab = 'StudentResult'">
                  <span class="d-flex">JSS3</span>
                </li>
                <li @click.prevent="activeTab = 'StudentResult'">
                  <span class="d-flex">SSS1</span>
                </li>
                <li @click.prevent="activeTab = 'StudentResult'">
                  <span class="d-flex">SSS2</span>
                </li>
                <li @click.prevent="activeTab = 'StudentResult'">
                  <span class="d-flex"> SSS3</span>
                </li>
                <li></li>
              </ul>
            </div>

            <component :is="activeTab" />
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

  .menu {
    ul {
      z-index: 999;
      position: absolute;
      border: none;
      top: -3.5rem;
      left: 14.2rem;
      background-color: #fff;
    }

    li:not(:last-child) {
      background-color: #fff;
      padding: 1rem 4.8rem;
      border-bottom: 1px solid gray;
      cursor: pointer;

      &:hover {
        background-color: var(--color-input);
      }
    }
  }
}
</style>
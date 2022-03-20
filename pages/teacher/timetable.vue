<template>
  <div class="fonts">
    <div>
      <b-card no-body @click="hideMenu">
        <b-tabs card style="font-size: 1.4rem">
          <b-tab @click.prevent="registrationMenu" lazy>
            <template #title>
              <strong>All Timetable</strong>
              <b-icon scale="0.8" icon="caret-down-fill" />
            </template>

            <b-card-text>
              <div class="menu" style="background-color: #fff">
                <ul
                  class="shadow"
                  v-show="registerMenu"
                  :class="registrationMenuClass"
                >
                  <li
                    @click.prevent="
                      dynamicStudentClass('JSS 1')
                      activeTab = 'Timetable'
                    "
                  >
                    <span class="d-flex">JSS1</span>
                  </li>
                  <li
                    @click.prevent="
                      dynamicStudentClass('JSS 2')
                      activeTab = 'Timetable'
                    "
                  >
                    <span class="d-flex">JSS2</span>
                  </li>
                  <li
                    @click.prevent="
                      dynamicStudentClass('JSS 3')
                      activeTab = 'Timetable'
                    "
                  >
                    <span class="d-flex">JSS3</span>
                  </li>
                  <li
                    @click.prevent="
                      dynamicStudentClass('SSS 1')
                      activeTab = 'Timetable'
                    "
                  >
                    <span class="d-flex">SSS1</span>
                  </li>
                  <li
                    @click.prevent="
                      dynamicStudentClass('SSS 2')
                      activeTab = 'Timetable'
                    "
                  >
                    <span class="d-flex">SSS2</span>
                  </li>
                  <li
                    @click.prevent="
                      dynamicStudentClass('SSS 3')
                      activeTab = 'Timetable'
                    "
                  >
                    <span class="d-flex"> SSS3</span>
                  </li>
                  <li></li>
                </ul>
              </div>
              <component :is="activeTab" :show="currentClass" />
            </b-card-text>
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
      currentClass: '',
      activeTab: null,
      registerMenu: false,
      registrationMenuClass: '',
    }
  },
  methods: {
    dynamicStudentClass(item) {
      this.currentClass = item
    },
    registrationMenu(e) {
      if (this.registrationMenuClass === '') {
        this.registerMenu = true
        e.stopPropagation()
        this.registrationMenuClass = 'off'
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
.fonts {
  font-size: 1.6rem;
  padding: 2rem;

  .nav-tabs .nav-link.active {
    border-top: 5px solid limegreen;
  }

  .menu {
    ul {
      z-index: 999;
      position: absolute;
      border: none;
      top: -2.2rem;
      left: 9.69rem;
      background-color: #fff;
    }

    li:not(:last-child) {
      background-color: #fff;
      padding: 0.6rem 4.2rem;
      border-bottom: 1px solid gray;
      cursor: pointer;

      &:hover {
        background-color: var(--color-input);
      }
    }
  }
}
</style>

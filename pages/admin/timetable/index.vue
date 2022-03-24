<template>
  <div class="p-4 view-payment">
    <b-card class="p-3 mb-4 d-flex">
      <b-row no-gutters>
        <b-col md="6" class="p-4">
          <b-form-group label="Class">
            <b-form-select
              v-model="form.class"
              :options="classes"
              class="mb-3"
              size="lg"
              required
              @change="timetableDropdown"
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- select class --</b-form-select-option
                >
              </template>

              <!-- These options will appear after the ones from 'options' prop -->
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <div
      class="libarian__wrapper"
      @click.prevent="hideMenu"
      v-show="timetableDropdownClass"
    >
      <b-card no-body @click="hideMenu">
        <b-tabs card style="font-size: 1.4rem">
          <b-tab active @click="hideMenu">
            <template #title>
              <strong>Create Timetable</strong>
              <b-icon scale="0.8" icon="caret-down-fill" />
            </template>

            <TimetableCreateClassTimetable :currentClass="form.class" />
          </b-tab>

          <b-tab @click.prevent="registrationMenu" lazy>
            <template #title>
              <strong>Class Payment</strong>
              <b-icon scale="0.8" icon="caret-down-fill" />
            </template>

            <div class="menu" style="background-color: #fff">
              <ul
                class="shadow"
                v-show="registerMenu"
                :class="registrationMenuClass"
              >
                <li
                  @click.prevent="
                    dynamicStudentClass('JSS 1')
                    activeTab = 'TimetableEditClassTimetable'
                  "
                >
                  <span class="d-flex">JSS1</span>
                </li>
                <li
                  @click.prevent="
                    dynamicStudentClass('JSS 2')
                    activeTab = 'TimetableEditClassTimetable'
                  "
                >
                  <span class="d-flex">JSS2</span>
                </li>
                <li
                  @click.prevent="
                    dynamicStudentClass('JSS 3')
                    activeTab = 'TimetableEditClassTimetable'
                  "
                >
                  <span class="d-flex">JSS3</span>
                </li>
                <li
                  @click.prevent="
                    dynamicStudentClass('SSS 1')
                    activeTab = 'TimetableEditClassTimetable'
                  "
                >
                  <span class="d-flex">SSS1</span>
                </li>
                <li
                  @click.prevent="
                    dynamicStudentClass('SSS 2')
                    activeTab = 'TimetableEditClassTimetable'
                  "
                >
                  <span class="d-flex">SSS2</span>
                </li>
                <li
                  @click.prevent="
                    dynamicStudentClass('SSS 3')
                    activeTab = 'TimetableEditClassTimetable'
                  "
                >
                  <span class="d-flex"> SSS3</span>
                </li>
                <li></li>
              </ul>
            </div>

            <component :is="activeTab" :editCurrentClass="dynamicClass" />
          
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
      timetableDropdownClass: false,
      form: {
        class: null,
      },
      classes: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'],
      dynamicClass: '',

      activeTab: '',
      registerMenu: false,
      registrationMenuClass: '',
    }
  },
  methods: {
    dynamicStudentClass(item) {
      this.dynamicClass = item
    },
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
    timetableDropdown() {
      if (this.form.class === null) {
        return false
      } else {
        this.timetableDropdownClass = true
      }
    },
  },
}
</script>

<style lang="scss">
.view-payment {
  font-size: 1.6rem;

  .custom-select:focus {
    box-shadow: none;
  }

  .custom-select,
  .form-control,
  .mb-3 {
    height: 4rem;
    font-size: 1.4rem;
    color: #000;
  }
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
}
</style>
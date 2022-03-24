<template>
  <div class="p-4 view-payment">
    <b-card class="p-3 mb-4 d-flex">
      <b-row no-gutters>
        <b-col md="3" class="p-4">
          <b-form-group label="Class">
            <b-form-select
              v-model="form.class"
              :options="classes"
              class="mb-3"
              size="lg"
              required
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

        <b-col md="3" class="p-4">
          <b-form-group label="Term">
            <b-form-select
              v-model="form.term"
              :options="terms"
              class="mb-3"
              size="lg"
              required
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- select term --</b-form-select-option
                >
              </template>

              <!-- These options will appear after the ones from 'options' prop -->
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="3" class="p-4">
          <b-form-group label="Session">
            <b-form-select
              v-model="form.session"
              :options="sessions"
              class="mb-3"
              size="lg"
              required
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- select session --</b-form-select-option
                >
              </template>

              <!-- These options will appear after the ones from 'options' prop -->
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>

    <div class="libarian__wrapper" v-show="timetableDropdownClass">
      <ExamEditExamScores />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timetableDropdownClass: true,
      form: {
        class: null,
        session: null,
        term: null,
      },
      classes: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'],
      terms: ['First Terms', 'Second Term', 'Third Term'],
      sessions: [2022],

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

    timetableDropdown() {
      if (
        this.form.class === null ||
        this.form.term === null ||
        this.form.session === null
      ) {
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
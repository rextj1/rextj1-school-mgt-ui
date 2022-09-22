<template>
  <div class="p-4 teacher-examTimetable">
    <template v-if="$apollo.queries.klases.loading"> <Preload /></template>
    <template v-else>
      <div class="exam-wrapper">
        <b-card no-body @click="hideMenu">
          <b-tabs card style="font-size: 1.4rem">
            <b-tab lazy @click="registrationMenu">
              <template #title>
                <strong>Exam Timetable</strong>
                <b-icon scale="0.8" icon="caret-down-fill" />
              </template>

              <div class="menu">
                <ul
                  v-show="registerMenu"
                  class="shadow"
                  :class="registrationMenuClass"
                >
                  <span v-for="klase in klases" :key="klase.id">
                    <li
                      @click.prevent="
                        dynamicStudentClass(klase.id, klase.name)
                        activeTab = 'TimetableEditClassExamTimetable'
                      "
                    >
                      <span class="d-flex">{{ klase.name }}</span>
                    </li>
                  </span>
                </ul>
              </div>

              <component
                :is="activeTab"
                :edit-current-class="[dynamicClass, klaseName]"
              />
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { KLASE_QUERIES } from '~/graphql/klases/queries'
export default {
  middleware: 'auth',
  data() {
    return {
     
      infoModal: 'modelInfo',
      slug: '',

      id: 0,
      klaseName: '',
      show: true,
      form: new this.$form({
        class: null,
        date: null,
        time: null,
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        busy: false,
      }),
      fields: [
        { key: 'date', label: 'Date' },
        { key: 'time', label: 'Time' },
        { key: 'monday', label: 'Monday' },

        { key: 'tuesday', label: 'Tuesday' },

        { key: 'wednesday', label: 'Wednesday' },

        { key: 'thursday', label: 'Thursday' },

        { key: 'friday', label: 'Friday' },
        { key: 'Action', label: 'Action' },
      ],
      dynamicClass: '',

      activeTab: '',
      registerMenu: false,
      registrationMenuClass: '',
    }
  },
  apollo: {
    klases: {
      query: KLASE_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
  },
  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  methods: {
    // modal
    timetableEdit(item) {
      this.$bvModal.show(this.infoModal)
      this.slug = item
    },
    // end modal
    dynamicStudentClass(item, itemName) {
      this.dynamicClass = item
      this.klaseName = itemName
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

  },
}
</script>

<style lang="scss">
.teacher-examTimetable {
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
  .exam-wrapper {
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
        top: -1.2rem;
        left: 0.3rem !important;
        background-color: #fff;
      }

      li {
        background-color: #fff;
        padding: 1.3rem 5.6rem !important;
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

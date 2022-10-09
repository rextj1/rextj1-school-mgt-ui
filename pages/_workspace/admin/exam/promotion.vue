<template>
  <div class="p-4">
    <template v-if="nowLoading">
      <Preload />
    </template>
    <template v-else>
      <b-card class="p-2 mb-4 d-flex">
        <!-- setPromotion -->

        <h3>Set promotion mark</h3>
        <b-row>
          <b-col md="3" class="mb-4">
            <input
              v-model="setPromotion.name"
              type="number"
              class="mb-3"
              size="lg"
              required
              style="width: 40%; text-align: center"
              @keydown.enter="studenSetPromotion($event.target.value)"
            />
          </b-col>
        </b-row>

        <!-- end of setPromotion -->

        <b-form @submit.prevent="promoteClassQuery">
          <b-row>
            <b-col md="2">
              <b-form-group label="Current Class">
                <b-form-select
                  id="klases"
                  v-model="form.class"
                  value-field="id"
                  text-field="name"
                  :options="klases"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- select class--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
              <b-form-group label="Current Session">
                <b-form-select
                  id="sessions"
                  v-model="form.session"
                  value-field="id"
                  text-field="name"
                  :options="sessions"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- select session--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
              <b-form-group label="Next Class">
                <b-form-select
                  id="klases"
                  v-model="form.classTo"
                  value-field="id"
                  text-field="name"
                  :options="klases"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- select class--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
              <b-form-group label="Next Session">
                <b-form-select
                  id="sessions"
                  v-model="form.sessionTo"
                  value-field="id"
                  text-field="name"
                  :options="sessions"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- select session--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-button
              type="submit"
              variant="primary"
              size="lg"
              style="height: 3.75rem; margin-top: 2.9rem"
              :disabled="isBusy"
              ><b-spinner
                class="mr-1 mb-1"
                small
                variant="light"
                v-if="isBusy"
              />Submit</b-button
            >
          </b-row>
        </b-form>
      </b-card>

      <div v-show="timetableDropdownClass" class="">
        <ExamStudentPromotion
          v-if="examRecords"
          :promote-students="promoteStudents"
          :examRecords="examRecords"
          :student="[form.class, form.classTo, form.session, form.sessionTo]"
          :set-promotion="setPromotion"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import Swal from 'sweetalert2'
import { KLASE_QUERIES } from '~/graphql/klases/queries'
import {
  PROMOTESTUDENTS_QUERIES,
  SET_PROMOTION_QUERIES,
} from '@/graphql/promotions/queries'
import { CREATE_SET_PROMOTION_MUTATION } from '@/graphql/promotions/mutations'
import { SESSION_QUERIES } from '~/graphql/sessions/queries'
import { EXAM_RECORD_QUERIES } from '~/graphql/examRecord/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      isBusy: false,
      promoteStudents: [],
      setPromotion: {},
      examRecords: null,
      klaseResults: [],
      timetableDropdownClass: false,
      form: {
        class: null,
        session: null,
        classTo: null,
        sessionTo: null,
      },

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

    sessions: {
      query: SESSION_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
    setPromotion: {
      query: SET_PROMOTION_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
  },
  computed: {
    nowLoading() {
      return (
        this.$apollo.queries.klases.loading &&
        this.$apollo.queries.setPromotion.loading &&
        this.$apollo.queries.sessions.loading &&
        this.$apollo.queries.setPromotion.loading
      )
    },
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  methods: {
    dynamicStudentClass(item) {
      this.dynamicClass = item
    },
    studenSetPromotion(item) {
      this.$apollo
        .mutate({
          mutation: CREATE_SET_PROMOTION_MUTATION,
          variables: {
            name: parseInt(item),
            workspaceId: parseInt(this.mainWorkspace.id),
          },
        })
        .then(() => {
          Swal.fire({
            title: 'Good',
            icon: 'success',
            text: 'Promotion mark set successfully!',
            position: 'top-end',
            color: '#fff',
            background: '#4bb543',
            toast: false,
            backdrop: false,
            timer: 1500,
            showConfirmButton: false,
          })
        })
        .catch(() => {})
    },
    promoteClassQuery() {
      if (
        this.form.class === null ||
        this.form.classTo === null ||
        this.form.session === null ||
        this.form.sessionTo === null ||
        this.form.class === this.form.classTo ||
        this.form.class > this.form.classTo ||
        this.form.session === this.form.sessionTo ||
        this.form.session > this.form.sessionTo
      ) {
        Swal.fire({
          title: 'Ooop...',
          icon: 'warning',
          text: `select all available fields, current class and new class must
           not be the same or if current session and new session to are the same,
            you may need to create a new session!`,
          position: 'center',
          color: '#fff',
          background: '#d9534f',
          toast: false,
          backdrop: false,
        })
        return false
      } else {
        this.isBusy = true

        this.$apollo.addSmartQuery('klaseResults', {
          query: EXAM_RECORD_QUERIES,
          variables() {
            return {
              klase_id: parseInt(this.form.class),
              term_id: 3,
              session_id: parseInt(this.form.session),
              workspaceId: parseInt(this.mainWorkspace.id),
            }
          },
          result({ loading, data }, key) {
            if (!loading) {
              this.examRecords = data.klaseResults
            }
          },
        })

        this.timetableDropdownClass = false
        this.$apollo.addSmartQuery('promoteStudents', {
          query: PROMOTESTUDENTS_QUERIES,
          variables() {
            return {
              klase_id: parseInt(this.form.class),
              status: true,
              session_id: parseInt(this.form.session),
              workspaceId: parseInt(this.mainWorkspace.id),
            }
          },
          result({ loading, data }, key) {
            if (!loading) {
              this.promoteStudents = data.promoteStudents
              this.isBusy = false
              this.timetableDropdownClass = true
            }
          },
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
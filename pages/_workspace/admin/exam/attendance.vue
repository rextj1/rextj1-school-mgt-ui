<template>
  <div class="p-3">
    <div v-if="nowLoading"><Preload /></div>
    <div v-else>
      <b-card class="mb-2 d-flex">
        <b-form @submit.prevent="onSubmit">
          <b-row>
            <b-col md="2">
              <b-form-group label="Classes">
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
                      >-- Select class --</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
              <b-form-group label="Terms">
                <b-form-select
                  id="terms"
                  v-model="form.term"
                  value-field="id"
                  text-field="name"
                  :options="terms"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- Select term--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
              <b-form-group label="Sections">
                <b-form-select
                  id="sections"
                  v-model="form.section"
                  value-field="id"
                  text-field="name"
                  :options="sections"
                  class="mb-3"
                  size="lg"
                >
                  <!-- This slot appears above the options from 'options' prop -->
                  <template #first>
                    <b-form-select-option :value="null" disabled
                      >-- Section term--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-col md="2">
              <b-form-group label="Session">
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
                      >-- Select session--</b-form-select-option
                    >
                  </template>

                  <!-- These options will appear after the ones from 'options' prop -->
                </b-form-select>
              </b-form-group>
            </b-col>

            <b-button
              type="submit"
              variant="primary"
              size="md"
              :disabled="isBusy"
              style="height: 47px; margin-top: 32px"
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

      <div
        v-show="timetableDropdownClass"
        class="p-3"
        style="background-color: #fff"
      >
        <div v-if="klases.length == 0">
          <h3 style="text-align: center; padding: 13rem 0">
            No record found
          </h3>
        </div>
        <div v-else>
          <ExamClassAttendance
            v-if="classAttendances"
            :classAttendances="classAttendances"
            :student="[form.class, form.term, form.session, form.section]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { KLASE_QUERIES } from '~/graphql/klases/queries'
import { TERM_QUERIES } from '~/graphql/marks/queries'
import { SECTION_QUERIES } from '~/graphql/sections/queries'
import { SUBJECT_QUERIES } from '~/graphql/subjects/queries'
import { SESSION_QUERIES } from '~/graphql/sessions/queries'
import { EXAM_RECORD_QUERIES } from '~/graphql/examRecord/queries'
import ExamClassAttendance from '~/components/Exam/ClassAttendance.vue'
import Preload from '~/components/Preload.vue'

export default {
  components: {ExamClassAttendance, Preload},
  middleware: 'auth',
  data() {
    return {
      classAttendances: null,
      klaseResults: [],
      klases: [],
      isBusy: false,
      timetableDropdownClass: false,
      form: {
        class: null,
        subject: null,
        session: null,
        section: null,
        term: null,
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
    subjects: {
      query: SUBJECT_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
          klase_id: parseInt(this.form.class),
          section_id: parseInt(this.form.section),
        }
      },
    },
    terms: {
      query: TERM_QUERIES,
    },
    sections: {
      query: SECTION_QUERIES,
      variables() {
        return {
          klase_id: parseInt(this.form.class),
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
  },
  computed: {
    nowLoading() {
      return (
        this.$apollo.queries.klases.loading &&
        this.$apollo.queries.terms.loading &&
        this.$apollo.queries.sessions.loading &&
        this.$apollo.queries.sections.loading &&
        this.$apollo.queries.subjects.loading
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
    onSubmit() {
      this.timetableDropdownClass = false

      if (
        this.form.class === null ||
        this.form.term === null ||
        this.form.session === null ||
        this.form.section === null
      ) {
        return false
      } else {
        this.isBusy = true

        this.$apollo.addSmartQuery('klaseResults', {
          query: EXAM_RECORD_QUERIES,
          variables: {
            klase_id: parseInt(this.form.class),
            session_id: parseInt(this.form.session),
            section_id: parseInt(this.form.section),
            term_id: parseInt(this.form.term),
            workspaceId: parseInt(this.mainWorkspace.id),
          },
          result({ loading, data }, key) {
            if (!loading) {
              this.classAttendances = data.klaseResults
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
<template>
  <div class="p-3 reset">
    <template v-if="nowLoading">
      <Preload />
    </template>
    <template v-else>
      <b-card class="mb-2 d-flex">
        <!-- end of setPromotion -->

        <b-form @submit.prevent="markSubmit">
          <b-row>
            <b-col md="3">
              <b-form-group label="Previous Class">
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

            <b-col md="3">
              <b-form-group label="Previous Session">
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

            <b-button
              type="submit"
              variant="primary"
              size="md"
              style="height: 47px; margin-top: 32px"
              :disabled="isBusy"
              ><b-spinner
                class="mr-1 mb-1"
                small
                variant="light"
                v-if="isBusy"
              />Reset Promotion</b-button
            >
          </b-row>
        </b-form>
      </b-card>

      <div v-show="timetableDropdownClass">
        <ExamResetPromotion
          v-if="resetPromotion"
          :resetPromotion="resetPromotion"
          :resetKlase="resetKlase"
          :student="[form.class, form.session]"
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
  RESET_KLASE_QUERIES,
  RESET_PROMOTE_QUERIES,
} from '@/graphql/promotions/queries'
import { SESSION_QUERIES } from '~/graphql/sessions/queries'
import ExamResetPromotion from '~/components/Exam/ResetPromotion.vue'
import Preload from '~/components/Preload.vue'

export default {
  components: { ExamResetPromotion, Preload },
  middleware: 'auth',
  data() {
    return {
      isBusy: false,
      resetPromotion: null,
      resetKlase: {},
      timetableDropdownClass: false,
      form: {
        class: null,
        session: null,
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
  },
  computed: {
    nowLoading() {
      return (
        this.$apollo.queries.klases.loading &&
        this.$apollo.queries.sessions.loading
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
    markSubmit() {
      if (this.form.class === null || this.form.session === null) {
        Swal.fire({
          title: 'Ooop...',
          icon: 'warning',
          text: `select all available fields, current class and 
          new class must not be the same or if current session and 
          new session to are the same, you may need to create a new session!`,
          position: 'center',
          color: '#fff',
          background: '#4bb543',
          toast: false,
          backdrop: false,
        })
        return false
      } else {
        // class
        this.isBusy = true
        this.timetableDropdownClass = false

        this.$apollo.addSmartQuery('resetKlase', {
          query: RESET_KLASE_QUERIES,
          variables() {
            return {
              id: parseInt(this.form.class),
              workspaceId: parseInt(this.mainWorkspace.id),
            }
          },
          result({ loading, data }, key) {
            if (!loading) {
              this.resetKlase = data.resetKlase
            }
          },
        })
      }

      this.isBusy = true
      this.$apollo.addSmartQuery('resetPromotion', {
        query: RESET_PROMOTE_QUERIES,
        variables() {
          return {
            from_class: parseInt(this.form.class),
            status: true,
            from_session: parseInt(this.form.session),
            workspaceId: parseInt(this.mainWorkspace.id),
            from_term: 3,
          }
        },
        result({ loading, data }, key) {
          if (!loading) {
            this.resetPromotion = data.resetPromotion
            this.isBusy = false
            this.timetableDropdownClass = true
          }
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.reset {
  .custom-select:focus {
    box-shadow: none;
  }

  .custom-select,
  .form-control,
  .mb-3 {
    height: 50px;
     font-size: 16px;
    color: #000;
  }
}
</style>

<template>
  <div class="p-4 view-payment">
    <template v-if="!klases && !sessions && !resetPromotion">
      <div style="background-color: #f1f9ae; width: 100%; height: 100vh">
        <div class="grow">
          <b-spinner
            style="width: 30rem; height: 30rem"
            type="grow"
            variant="danger"
          ></b-spinner>
        </div></div
    ></template>
    <template v-else>
      <b-card class="p-3 mb-4 d-flex">
        <!-- end of setPromotion -->

        <b-form @submit.prevent="markSubmit">
          <b-row>
            <b-col md="3">
              <b-form-group label="Previous Class">
                <b-form-select
                  id="klases"
                  value-field="id"
                  text-field="name"
                  v-model="form.class"
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
                  value-field="id"
                  text-field="name"
                  v-model="form.session"
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
          </b-row>

          <b-button type="submit" variant="danger">Submit</b-button>
        </b-form>
      </b-card>

      <div class="libarian__wrapper" v-show="timetableDropdownClass">
        <ExamResetPromotion
          :resetPromotion="resetPromotion"
          :resetKlase="resetKlase"
          :student="[form.class, form.session]"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { KLASES_QUERIES } from '~/graphql/klases/queries'
import { SESSION_QUERIES } from '~/graphql/marks/queries'
import {
  RESET_KLASE_QUERIES,
  RESET_PROMOTE_QUERIES,
} from '@/graphql/promotions/queries'
import Swal from 'sweetalert2'
export default {
  middleware: 'auth',
  data() {
    return {
      resetPromotion: [],
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
      query: KLASES_QUERIES,
    },
    sessions: {
      query: SESSION_QUERIES,
    },
  },
  methods: {
    dynamicStudentClass(item) {
      this.dynamicClass = item
    },
    // studenSetPromotion(item) {
    //   console.log(item)
    //   this.$apollo
    //     .mutate({
    //       mutation: CREATE_SET_PROMOTION_MUTATION,
    //       variables: { id: 1, name: parseInt(item) },
    //     })
    //     .then(({ data }) => {
    //       Swal.fire({
    //         title: 'Good',
    //         icon: 'success',
    //         text: 'Promotion mark set successfully!',
    //         position: 'top-end',
    //         color: '#fff',
    //         background: '#4bb543',
    //         toast: false,
    //         backdrop: false,
    //         timer: 1500,
    //         showConfirmButton: false
    //       })
    //     })
    // },
    markSubmit() {
      if (this.form.class === null || this.form.session === null) {
        Swal.fire({
          title: 'Ooop...',
          icon: 'warning',
          text: 'select all available fields, current class and new class must not be the same or if current session and new session to are the same, you may need to create a new session!',
          position: 'center',
          color: '#fff',
          background: '#4bb543',
          toast: false,
          backdrop: false,
        })
        return false
      } else {
        this.timetableDropdownClass = true

        setTimeout(() => {
          this.$apollo.addSmartQuery('resetPromotion', {
            query: RESET_PROMOTE_QUERIES,
            variables() {
              return {
                from_class: parseInt(this.form.class),
                status: true,
                from_session: parseInt(this.form.session),
              }
            },
            result({ loading, data }, key) {
              if (!loading) {
                this.resetPromotion = data.resetPromotion
              }
            },
          })
        }, 100)

        // class
        setTimeout(() => {
          this.$apollo.addSmartQuery('resetKlase', {
            query: RESET_KLASE_QUERIES,
            variables() {
              return {
                id: parseInt(this.form.class),
              }
            },
            result({ loading, data }, key) {
              if (!loading) {
                this.resetKlase = data.resetKlase
              }
            },
          })
        }, 100)
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
  .grow {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
  .custom-select {
    option {
      font-size: 1.8rem !important;
    }
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
<template>
  <div class="fee-payment p-4">
    <div v-if="nowLoading"><Preload /></div>
    <div v-else>
      <b-card class="p-3 mb-4 d-flex">
        <b-form @submit.prevent="markSubmit">
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
              size="lg"
              :disabled="isBusy"
              style="height: 3.8rem; margin-top: 2.83rem"
              ><b-spinner
                class="mr-1 mb-1"
                small
                variant="light"
                v-if="isBusy"
              />
              Submit</b-button
            >
          </b-row>
        </b-form>
      </b-card>

      <b-card v-show="paymentDropdownClass" class="p-4">
        <PaymentStudentPayment
          :paymentRecords="paymentRecords"
          :paidPaymentRecords="paidPaymentRecords"
          :student="[form.class, form.term, form.session]"
        />
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { KLASE_QUERIES } from '~/graphql/klases/queries'
import { TERM_QUERIES } from '~/graphql/marks/queries'
import {
  PAID_PAYMENT_RECORD_QUERIES,
  PAYMENT_RECORD_QUERIES,
} from '~/graphql/payments/queries'
import { SESSION_QUERIES } from '~/graphql/sessions/queries'
export default {
  middleware: 'auth',
  data() {
    return {
      isBusy: false,
      paymentRecords: [],
      paidPaymentRecords: [],
      paymentDropdownClass: false,
      form: {
        class: null,
        term: null,
        session: null,
      },
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
    terms: {
      query: TERM_QUERIES,
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
        this.$apollo.queries.sessions.loading
      )
    },
    ...mapState(useWorkspaceStore, ['currentWorkspace']),
    mainWorkspace() {
      return this.currentWorkspace
    },
  },
  methods: {
    markSubmit() {
      if (
        this.form.class === null ||
        this.form.term === null ||
        this.form.session === null
      ) {
        return false
      } else {
        this.isBusy = true
        this.paymentDropdownClass = false
        this.$apollo.addSmartQuery('paymentRecords', {
          query: PAYMENT_RECORD_QUERIES,
          variables: {
            klase_id: parseInt(this.form.class),
            session_id: parseInt(this.form.session),
            term_id: parseInt(this.form.term),
            workspaceId: parseInt(this.mainWorkspace.id),
          },
          result({ loading, data }, key) {
            if (!loading) {
              this.paymentRecords = data.paymentRecords
            }
          },
        })

        setTimeout(() => {
          this.$apollo.addSmartQuery('paidPaymentRecords', {
            query: PAID_PAYMENT_RECORD_QUERIES,
            variables: {
              klase_id: parseInt(this.form.class),
              session_id: parseInt(this.form.session),
              term_id: parseInt(this.form.term),
              workspaceId: parseInt(this.mainWorkspace.id),
            },
            result({ loading, data }, key) {
              if (!loading) {
                this.paidPaymentRecords = data.paidPaymentRecords
                this.isBusy = false
                this.paymentDropdownClass = true
              }
            },
          })
        }, 100)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fee-payment {
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
}
</style>

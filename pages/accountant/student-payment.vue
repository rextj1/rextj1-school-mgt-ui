<template>
  <div class="student-paayment p-4">
    <b-card class="p-4 d-flex mb-4">
      <b-row no-gutters>
        <b-col md="6" class="p-4">
          <b-form-group label="Class">
            <b-form-select
              v-model="form.class"
              :options="classes"
              class="mb-3"
              size="lg"
              required
                @change="paymentDropdown"
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

    <b-card v-show="paymentDropdownClass" class="p-4"> 
        <PaymentStudentPayment :current-class="form.class"/>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentDropdownClass: false,
      form: {
        class: null,
      },
      classes: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'],
    }
  },
  methods: {
    paymentDropdown() {
      if (this.form.class === null) {
        return false
      } else {
        this.paymentDropdownClass = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.student-paayment {
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
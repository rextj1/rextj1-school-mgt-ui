<template>
  <div class="p-4">
    <div class="libarian__wrapper">
      <b-card no-body>
        <b-tabs card style="font-size: 1.4rem">
          <b-tab active>
            <template #title>
              <b-icon icon="plus" /><strong>Create Payment</strong>
            </template>

            <div class="margin-down">
              <b-row>
                <b-col md="2">
                  <label for="input-small" class="label-padding">Class:</label>
                </b-col>

                <b-col md="8">
                  <b-form-input
                    class="focus"
                    placeholder="select class"
                    size="lg"
                    list="my-list-id"
                    v-model="form.data"
                  ></b-form-input>

                  <datalist id="my-list-id">
                    <option disabled>select class</option>
                    <option v-for="currentClass in classes" :key="currentClass">
                      {{ currentClass }}
                    </option>
                  </datalist>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="2">
                  <label for="input-small" class="label-padding"
                    >Payment Method:</label
                  >
                </b-col>
                <b-col md="8">
                  <b-form-select
                    size="lg"
                    v-model="form.paymentMethod"
                    :options="options"
                  ></b-form-select>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="2">
                  <label for="input-small" class="label-padding">Year:</label>
                </b-col>

                <b-col md="8">
                  <b-form-input
                    id="year"
                    v-model="form.year"
                    name="amount"
                    placeholder="Enter current year"
                    trim
                    type="number"
                    required
                    size="lg"
                  ></b-form-input>
                  <!-- <b-form-invalid-feedback :state="!form.errors.has('lastName')">
                    {{ form.errors.get('lastName') }}
                    </b-form-invalid-feedback> -->
                </b-col>
              </b-row>

              <b-row>
                <b-col md="2">
                  <label for="input-small" class="label-padding"
                    >Amount(&#x20A6;):</label
                  >
                </b-col>

                <b-col md="8">
                  <b-form-input
                    id="amount"
                    v-model="form.amount"
                    name="amount"
                    placeholder="Enter the Amount"
                    trim
                    type="number"
                    required
                    size="lg"
                  ></b-form-input>
                  <!-- <b-form-invalid-feedback :state="!form.errors.has('lastName')">
                    {{ form.errors.get('lastName') }}
                    </b-form-invalid-feedback> -->
                </b-col>
              </b-row>

              <b-row>
                <b-col
                  md="10"
                  class="d-flex justify-content-center p-4 mt-2 mb-4"
                  ><b-button
                    type="submit"
                    variant="primary"
                    class="mr-4"
                    size="lg"
                  >
                    <b-spinner
                      v-if="form.busy"
                      variant="light"
                      class="mr-1 mb-1"
                    />Submit</b-button
                  >
                </b-col>
              </b-row>
            </div>
          </b-tab>

          <b-tab lazy>
            <template #title>
              <strong>Current Fee</strong>
            </template>
            <div class="table-down">
              <h1 class="mb-4" style="color: red">
                Junour Secondary School Fee
              </h1>
              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Class</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Year</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Junior Secondary</td>
                    <td>Cash</td>
                    <td>2022</td>
                    <td>&#x20A6; 80,000</td>
                  </tr>
                </tbody>
              </table>

              <h1 class="mb-4" style="color: red">
                Senior Secondary School Fee
              </h1>
              <table class="table">
                <thead class="thead-light table-borbered">
                  <tr>
                    <th scope="col">Class</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Year</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Senior Secondary</td>
                    <td>Cash</td>
                    <td>2022</td>
                    <td>&#x20A6; 120,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
      form: {
        data: null,
        year: null,
        paymentMethod: 'Cash or Online',
      },

      classes: ['Junour', 'Senior'],
      options: [
        { value: 'Cash or Online', text: 'Cash or online' },
        { value: 'online', text: 'online', disabled: true },
      ],
    }
  },
}
</script>

<style lang="scss">
.libarian__wrapper {
  padding: 2rem;
  font-size: 1.4rem;
  background-color: var(--color-white);
  border-radius: 0.5rem;
  border: none;

  .margin-down {
    margin-top: 5rem;

    .label-padding {
      padding-right: 15rem;
      margin-bottom: 5rem;
    }

    .custom-select:focus,
    .form-control.focus,
    .form-control:focus {
      box-shadow: none;
    }

    .custom-select,
    .form-control,
    .mb-3 {
      height: 4rem;
      font-size: 1.4rem;
      color: #000;
      width: 40.6%;
    }
  }
  .table-down {
    padding: 4rem;

    .table {
      margin-bottom: 4rem;
    }
  }

  .custom-select-lg .nav-link.active {
    border-top: 5px solid limegreen;
  }
}
</style>
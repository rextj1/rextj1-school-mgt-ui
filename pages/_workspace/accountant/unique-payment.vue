<template>
  <div class="p-4">
    <div class="libarian__wrapper">
      <b-card no-body>
        <b-tabs card style="font-size: 1.4rem">
          <b-tab active>
            <template #title>
              <strong>Incomplete Payment</strong>
            </template>
          </b-tab>

          <b-tab lazy>
            <template #title>
              <strong>Complete Payment</strong>
            </template>
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
        paymentMethod: 'cash',
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
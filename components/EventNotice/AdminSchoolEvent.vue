<template>
  <div class="liberian">
    <div class="shadow p-4 liberian__wrapper mt-4">
      <h1 class="d-flex justify-content-center mb-4 mt-4">Notice Board</h1>

      <b-row no-gutters>
        <b-col md="12">
          <b-table striped responsive hover :items="items" :fields="fields">
            <template #cell(date)="date">
              <b-badge class="d-inline-block" variant="danger">{{date.value}}</b-badge>
            </template>
            <template #cell(actions)="row" class="d-flex">
              <div class="d-flex">
                <b-button size="smd" variant="primary" class="mr-1">
                  Unpublished
                </b-button>
                <b-button size="smd" variant="info" class="mr-1">
                  <b-icon icon="pencil-square"></b-icon>
                </b-button>

                <b-button
                  size="smd"
                  variant="danger"
                  @click="row.toggleDetails"
                >
                  <b-icon icon="trash"></b-icon>
                </b-button>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          date: '12-6-11',
          notice:
            'perspiciatis laudantium modi aliquam accusantium ratione consequatur! Animi, consectetur?',
          _cellVariants: { paid: 'success' },
        },
        {
          date: '12-6-11',
          notice:
            'perspiciatis laudantium modi aliquam accusantium ratione consequatur! Animi, consectetur perspiciatis laudantium modialiquam accusantium ratione consequatur! Animi, consectetur?',
        },
        {
          date: '12-6-11',
          notice:
            'perspiciatis laudantium modi aliquam accusantium ratione consequatur! Animi, consectetur?',
        },
      ],

      fields: [
        {
          key: 'date',
          label: 'Date',
        },
        {
          key: 'notice',
          label: 'Notice',
        },

        { key: 'actions', label: 'Actions' },
      ],
      form: {
        text: '',
        busy: false,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.liberian {
  font-size: 1.6rem;
  padding: 2rem;
  .form-control {
    background-color: var(--color-input);
  }

  .liberian__wrapper {
    background-color: var(--color-white);
    border-radius: 0.5rem;
    border: none;
  }
}
</style>
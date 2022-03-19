<template>
  <div class="liberian">
    <div class="p-4 liberian__wrapper">
      <h1 class="d-flex justify-content-center mb-4">Notice Board</h1>

      <b-row no-gutters>
        <b-col md="12">
          <b-table striped responsive :items="items" :fields="fields">
            <template #cell(date)="row">
              <div class="d-flex flex-column">
                <div>
                  <b-badge class="d-inline-block" variant="danger">{{
                    row.item.date
                  }}</b-badge>
                </div>

                <div>{{ row.item.notice }}</div>
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
<template>
  <div class="liberian">
    <div class="p-4 liberian__wrapper">
      <h1 class="d-flex justify-content-center mb-4">Notice Board</h1>

      <b-row no-gutters>
        <b-col md="12">
          <b-table striped responsive :items="notices" :fields="fields">
            <template #cell(date)="row">
              <div class="d-flex flex-column">
                <div>
                  <b-badge style="font-size:1.4rem" class="d-inline-block" variant="danger">{{
                    row.item.date
                  }}</b-badge>
                </div>

                <div>{{ row.item.description }}</div>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { NOTICE_QUERIES } from '@/graphql/notices/queries'
export default {
  data() {
    return {
      fields: [
        {
          key: 'date',
          label: 'Date',
        },
        //   {
        //   key: 'title',
        //   label: 'Title',
        // },
        // {
        //   key: 'published',
        //   label: 'Published',
        // },
        // {
        //   key: 'photo',
        //   label: 'Photo',
        // },
      ],
      form: {
        text: '',
        busy: false,
      },
    }
  },
  apollo: {
    notices: {
      query: NOTICE_QUERIES,
    },
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
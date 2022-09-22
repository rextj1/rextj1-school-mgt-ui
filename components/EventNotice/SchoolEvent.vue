<template>
  <div class="liberian">
    <div class="p-4 liberian__wrapper">
      <b-row no-gutters>
        <b-col md="12">
          <b-table striped responsive :items="events" :fields="fields">
            <template #cell(date)="row">
              <div class="d-flex flex-column">
                <div>
                  <b-badge
                    style="font-size: 1.4rem"
                    class="d-inline-block"
                    variant="warning"
                    >{{ row.item.date }}</b-badge
                  >
                </div>

                 <span v-html="row.item.description"></span>
              </div>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { EVENT_QUERIES } from '@/graphql/events/queries'
export default {
  data() {
    return {
      fields: [
        {
          key: 'date',
          label: 'School Event',
        },
      ],
      form: {
        text: '',
        busy: false,
      },
    }
  },
   computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
  apollo: {
    notices: {
      query: EVENT_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
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
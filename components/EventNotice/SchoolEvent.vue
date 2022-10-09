<template>
  <div class="p-4 mt-4">
    <b-table striped :responsive="true" :items="schoolEvents" small :fields="fields">
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
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { SCHOOL_EVENT_QUERIES } from '@/graphql/events/queries'
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
    schoolEvents: {
      query: SCHOOL_EVENT_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="p-4 mt-4">
    <b-table
      striped
      :responsive="true"
      :items="schoolNotices"
      small
      :fields="fields"
    >
      <template #cell(date)="row">
        <div class="d-flex flex-column">
          <div>
            <b-badge
              style="font-size: 1.4rem"
              class="d-inline-block"
              variant="danger"
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
import { SCHOOL_NOTICE_QUERIES } from '@/graphql/notices/queries'
export default {
  data() {
    return {
      fields: [
        {
          key: 'date',
          label: 'School Notice',
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
    schoolNotices: {
      query: SCHOOL_NOTICE_QUERIES,
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

<template>
  <div class="p-4 roles">
    <div class="mt-4">
      <nuxt-link to="/admin/roles/assignrole">
        <b-button variant="primary" class="assign-role"
          ><b-icon
            class="h1 "
            scale="1.7"
            icon="plus"
            variant="light"
            style="margin-top:0.5rem"
          />
          <span>assign role</span>
        </b-button>
      </nuxt-link>
    </div>

    <div class="shadow p-3 roles-table">
      <h2 class="p-4 d-flex justify-content-center">Roles & Permissions</h2>
      <b-table :items="roles" :fields="fields">

        <template #cell(#)="data">
          {{data.index + 1}}
        </template>

        <template #cell(permissions)="data">
          <b-badge
            :id="`permissions-${data.index}`"
            variant="info"
            class="px-2"
          >
            {{ data.value.length }} permissions
          </b-badge>
          <b-popover
            v-if="data.value.length > 0"
            :target="`permissions-${data.index}`"
            triggers="hover"
          >
            <b-nav vertical>
              <b-nav-item v-for="permission in data.value" :key="permission.id">
                <div style="font-size: 1.3rem">{{ permission.name }}</div>
              </b-nav-item>
            </b-nav>
          </b-popover>
        </template>
        <template #cell(actions)="">
          <b-button variant="primary" size="sm" class="px-3">
            <b-icon icon="pencil" class="mr-1"></b-icon>
            Edit
          </b-button>
          <b-button variant="danger" size="sm" class="px-3">
            <b-icon icon="trash" class="mr-1"></b-icon>
            Delete
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { ROLES_AND_PERMISSION_QUERIES } from '~/graphql/users/queries'

export default {
  middleware: 'auth',

  apollo: {
    roles: {
      query: ROLES_AND_PERMISSION_QUERIES,
    },
  },

  data() {
    return {
      fields: [
         {
          key: '#',
          sortable: false,
        },
        {
          key: 'name',
          sortable: false,
        },

        {
          key: 'permissions',
          sortable: false,
        },
        {
          key: 'actions',
          label: 'Actions',
          sortable: false,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.roles {
  .assign-role{
    
    margin-bottom: 4rem;
    display: flex;

    span{
      font-size: 1.4rem;
      margin-left: 0.4rem;
      align-items: center;
    }
  }

  font-size: 1.6rem;
  .roles-table {
    background-color: #fff;
  }
}
</style>

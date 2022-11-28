<template>
  <div class="profile p-3">
    <template v-if="$apollo.queries.schoolAdmin.loading"><Preload /></template>
    <template v-else>
      <b-button
        :to="{
          name: 'workspace-admin-school-admin',
          params: { workspace: mainWorkspace.slug },
        }"
        variant="primary"
        size="md"
        class="add-student mb-2"
      >
        <b-icon icon="arrow-left" /> Back
      </b-button>

      <b-card class="user shadow-sm">
        <div v-if="schoolAdmin.photo == null" class="text-center mb-4 mt-4">
          <b-img
            src="@/assets/svg/user-avatar.svg"
            
            fluid
            alt="admin"
            width="200"
          ></b-img>
        </div>

        <div v-else class="text-center mb-4 mt-4">
          <b-img style="border-radius:50%"
            :src="`${$config.APIRoot}/storage/${mainWorkspace.id}/admin/${schoolAdmin.photo}`"
            thumbnail
            fluid
            alt="admin"
            width="200"
          ></b-img>
        </div>

        <div class="d-flex justify-content-between p-5">
          <div>
            <p>Full Name</p>
            <p>Phone no:</p>
            <p>Qualifications</p>
            <p>Code</p>
            <p>Gender</p>
            <p>Blood Group</p>
            <p>Country</p>
            <p>State</p>
            <p>city</p>
            <p>L.G.A</p>
          </div>

          <div style="font-weight: bold">
            <p>
              {{ schoolAdmin.last_name }} {{ schoolAdmin.first_name }}
              {{ schoolAdmin.middle_name }}
            </p>
            <p>{{ schoolAdmin.phone }}</p>
            <p>{{ schoolAdmin.qualification }}</p>
            <p>{{ schoolAdmin.code }}</p>

            <p>{{ schoolAdmin.gender }}</p>
            <p>
              {{
                schoolAdmin.user.blood_group != null
                  ? schoolAdmin.user.blood_group.name
                  : ''
              }}
            </p>
            <p>
              {{ schoolAdmin.user.country.name }}
            </p>
            <p>
              {{ schoolAdmin.user.state.name }}
            </p>
            <p>
              {{ schoolAdmin.user.city }}
            </p>
            <p>
              {{ schoolAdmin.user.lga }}
            </p>
          </div>
        </div>
      </b-card>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { SCHOOL_ADMIN_QUERY } from '~/graphql/admin/queries'
import Preload from '~/components/Preload.vue'

export default {
  components: {Preload},
  apollo: {
    schoolAdmin: {
      query: SCHOOL_ADMIN_QUERY,
      variables() {
        return {
          id: parseInt(this.$route.params.id),
          workspaceId: parseInt(this.mainWorkspace.id),
        }
      },
    },
  },
  computed: {
    ...mapState(useWorkspaceStore, {
      mainWorkspace: (store) => store.currentWorkspace,
    }),
  },
}
</script>

<style lang="scss" scoped>
.profile {

  .first-detail p {
    display: block;
    margin-left: 40%;
  }
  .first-details p {
    display: block;
    margin-left: 30%;
    font-weight: bold;
  }
  @include media-breakpoint-down(md) {
    .first-detail p {
      margin-left: 0;
    }
    .first-details p {
      margin-left: 0;
    }
  }
  @include media-breakpoint-down(sm) {
    .col-md-6 {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .first-details p {
      margin-left: 50%;
    }
  }
}
</style>

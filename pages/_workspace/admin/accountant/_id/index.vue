<template>
  <div class="profile p-3">
    <div v-if="$apollo.queries.accountant.loading" class="preload">
      <Preload />
    </div>

    <div v-else>
      <b-button
        :to="{
          name: 'workspace-admin-accountant',
          params: { workspace: mainWorkspace.slug },
        }"
        variant="primary"
        size="md"
        class="add-student mb-2"
      >
        <b-icon icon="arrow-left" /> Back
      </b-button>
      <b-card class="user shadow-sm">
        <div v-if="accountant.photo == null" class="text-center mb-4 mt-4">
          <b-img
            src="@/assets/svg/user-avatar.svg"
            
            fluid
            alt="accountant"
            width="200"
          ></b-img>
        </div>

        <div v-else class="text-center mb-4 mt-4">
          <b-img style="border-radius:50%"
            :src="`${$config.APIRoot}/storage/${mainWorkspace.id}/accountants/${accountant.photo}`"
            thumbnail
            fluid
            alt="accountant"
            width="200"
          ></b-img>
        </div>

        <div class="d-flex justify-content-between p-5">
          <div>
            <p>Full Name</p>
            <p>Qualifications</p>
            <p>Code</p>
            <p>Date of employment</p>
            <p>Email</p>
            <p>Phone no:</p>
            <p>Gender</p>
            <p>Blood Group</p>
            <p>Country</p>
            <p>State</p>
            <p>City</p>
            <p>L.G.A</p>
          </div>
          <div class="" style="font-weight: bold">
            <p>
              {{ accountant.last_name }} {{ accountant.first_name }}
              {{ accountant.middle_name }}
            </p>
            <p>{{ accountant.qualification }}</p>
            <p>{{ accountant.code }}</p>
            <p>{{ accountant.employment }}</p>
            <p>{{ accountant.user.email }}</p>
            <p>{{ accountant.phone }}</p>
            <p>{{ accountant.gender }}</p>
            <p>
              {{
                accountant.user.blood_group != null
                  ? accountant.user.blood_group.name
                  : ''
              }}
            </p>
            <p>
              {{ accountant.user.country.name }}
            </p>
            <p>
              {{ accountant.user.state.name }}
            </p>
            <p>
              {{ accountant.user.city }}
            </p>
            <p>
              {{ accountant.user.lga }}
            </p>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { ACCOUNTANT_QUERY } from '~/graphql/accountants/queries'
import Preload from '~/components/Preload.vue'

export default {
  components: { Preload },
  middleware: 'auth',
  data() {
    return {}
  },
  apollo: {
    accountant: {
      query: ACCOUNTANT_QUERY,
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

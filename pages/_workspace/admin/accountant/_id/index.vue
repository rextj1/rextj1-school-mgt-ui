<template>
  <div class="profile">
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
        size="lg"
        class="add-student mb-4"
      >
        <b-icon icon="arrow-left" /> Back
      </b-button>
      <b-jumbotron header="" class="accountant shadow">
        <h1>About {{ accountant.last_name }}</h1>
        <div class="d-flex justify-content-center mb-4">
          <span
            v-if="accountant.gender == 'Female' && accountant.photo == null"
          >
            <b-img
              src="~/assets/images/teacher.jpeg"
              thumbnail
              fluid
              alt="Responsive image"
              width="230"
            ></b-img>
          </span>
          <span v-else>
            <b-img
              :src="`${$config.APIRoot}/storage/accountant/${accountant.photo}`"
              thumbnail
              fluid
              alt="image"
              width="230"
            ></b-img>
          </span>
        </div>
        <b-row no-gutters class="sm-query">
          <b-col md="6" class="first-detail p-4">
            <p>Full Name</p>
            <p>Phone no:</p>
            <p>Qualifications</p>
            <p>Code</p>
            <p>Gender</p>
            <p>Blood Group</p>
            <p>Country</p>
            <p>State</p>
            <p>City</p>
            <p>L.G.A</p>

            <!-- <p>
              <b-badge style="font-size: 1.6rem" variant="warning"
                >Subjects Assigned</b-badge
              >
            </p> -->
          </b-col>
          <b-col md="6" class="first-details p-4">
            <p>
              {{ accountant.last_name }} {{ accountant.first_name }}
              {{ accountant.middle_name }}
            </p>
            <p>{{ accountant.phone }}</p>
            <p>{{ accountant.qualification }}</p>
            <p>{{ accountant.code }}</p>

            <p>{{ accountant.gender }}</p>
            <p>
              {{ accountant.user.blood_group.name }}
            </p>
            <p>
              {{ accountant.user.country.name }}
            </p>
            <p>
              {{ accountant.user.state.name }}
            </p>
            <p>
              {{ accountant.user.city.name }}
            </p>
            <p>
              {{ accountant.user.lga }}
            </p>
            <!-- <h3 v-for="klase in accountant.klases" :key="klase">
              <p>
                <b-badge
                  style="line-height: 1.6"
                  variant="warning"
                  class="px-2"
                  :id="klase.id"
                  >{{ klase.name }}</b-badge
                >
              </p>
              <b-popover :target="klase.id" triggers="hover click">
                <b-nav vertical>
                  <b-nav-item
                    v-for="subject in klase.subjects"
                    :key="subject.id"
                  >
                    <div style="font-size: 1.4rem">{{ subject.subject }}</div>
                  </b-nav-item>
                </b-nav>
              </b-popover>
            </h3> -->
          </b-col>
        </b-row>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { ACCOUNTANT_QUERY } from '~/graphql/accountants/queries'
export default {
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
  font-size: 1.6rem;
  padding: 1rem;
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

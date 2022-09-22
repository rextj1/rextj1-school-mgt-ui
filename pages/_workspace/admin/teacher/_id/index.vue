<template>
  <div class="profile">
    <template v-if="$apollo.queries.teacher.loading"><Preload /></template>
    <template v-else>
      <b-button
      :to="{
          name: 'workspace-admin-teacher',
          params: { workspace: mainWorkspace.slug },
        }"
        variant="primary"
        size="lg"
        class="add-student mb-4"
      >
        <b-icon icon="arrow-left" /> Back
      </b-button>
      <b-jumbotron header="" class="teacher shadow">
        <h1>About {{ teacher.last_name }}</h1>
        <div class="d-flex justify-content-center mb-4">
          <b-img
            src="~/assets/images/teacher.jpeg"
            thumbnail
            fluid
            alt="Responsive image"
            width="230"
          ></b-img>
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
            <p>city</p>
            <p>L.G.A</p>

            <p>
              <b-badge style="font-size: 1.6rem" variant="warning"
                >Subjects Assigned</b-badge
              >
            </p>
          </b-col>
          <b-col md="6" class="first-details p-4">
            <p>
              {{ teacher.last_name }} {{ teacher.first_name }}
              {{ teacher.middle_name }}
            </p>
            <p>{{ teacher.phone }}</p>
            <p>{{ teacher.qualification }}</p>
            <p>{{ teacher.code }}</p>

            <p>{{ teacher.gender }}</p>
            <p>
              {{ teacher.user.blood_group != null ? teacher.user.blood_group.name : '' }}
            </p>
            <p>
              {{ teacher.user.country.name }}
            </p>
            <p>
              {{ teacher.user.state.name }}
            </p>
            <p>
              {{ teacher.user.city.name }}
            </p>
            <p>
              {{ teacher.user.lga }}
            </p>

            <h3 v-for="klase in teacher.klases" :key="klase.id">
              <p>
                <b-badge
                  :id="klase.id"
                  style="line-height: 1.6"
                  variant="warning"
                  class="px-2"
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
            </h3>
          </b-col>
        </b-row>
      </b-jumbotron></template
    >
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { TEACHER_QUERY } from '@/graphql/teachers/queries'
export default {
  apollo: {
    teacher: {
      query: TEACHER_QUERY,
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

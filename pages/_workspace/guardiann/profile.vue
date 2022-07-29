<template>
  <div class="profile">
    <template v-if="!user"> <div></div></template>
    <template v-else>
      {{ user.guardian.students[0] }}
      <div v-for="students in user.guardian.students" :key="students.id">
        <b-jumbotron header="" class="students shadow">
          <h1>About {{ students.last_name }}</h1>
          <div class="d-flex justify-content-center mb-4">
            <b-img
              :src="`${$config.APIRoot}/storage/students/${students.photo}`"
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
                {{ students.last_name }} {{ students.first_name }}
                {{ students.middle_name }}
              </p>
              <p>{{ students.phone }}</p>
              <p>{{ students.qualification }}</p>
              <p>{{ students.code }}</p>

              <p>{{ students.klase.name }}</p>
              <!-- <p>
                {{ user.blood_group.name }}
              </p> -->

              <h3 v-for="klase in students.klases" :key="klase.id">
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
        </b-jumbotron>
      </div>
    </template>
  </div>
</template>

<script>
import { USER_GUARDIAN_QUERY } from '@/graphql/guardians/queries'
export default {
  apollo: {
    user: {
      query: USER_GUARDIAN_QUERY,
      variables() {
        return {
          id: parseInt(this.$auth.user.id),
        }
      },
    },
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
<template>
  <div class="profile">
    <template v-if="!user">
      <div style="background-color: #f1f9ae; width: 100%; height: 100vh">
        <div class="grow">
          <b-spinner
            style="width: 20rem; height: 20rem"
            type="grow"
            variant="success"
          ></b-spinner>
        </div></div
    ></template>
    <template v-else>
      <div v-for="student in user.students" :key="student.id">
        {{ student }}
        <b-jumbotron header="" class="teacher shadow">
          <h1 class="d-flex align-items-center">
            Current Fee Status: <b-badge variant="success">Paid</b-badge>
          </h1>
          <b-button
            :to="{
              name: 'student-timetables',
              params: { timetables: parseInt(student.klase.id) },
            }"
            variant="primary"
            size="md"
            class="px-3"
          >
            <b-icon icon="eye" class="mr-1"></b-icon>
            {{ student.klase.name }} Timetable
          </b-button>

          <b-button
            :to="{
              name: 'student-exam',
              params: { exam: parseInt(student.klase.id) },
            }"
            variant="primary"
            size="md"
            class="px-3"
          >
            <b-icon icon="eye" class="mr-1"></b-icon>
            {{ student.klase.name }} Exam Timetable
          </b-button>
          <div class="d-flex justify-content-center mb-4">
            <div v-if="student.photo == 'null'">
              <b-img
                src="~/assets/images/teacher.jpeg"
                thumbnail
                fluid
                alt="Responsive image"
                width="230"
              ></b-img>
            </div>
            <div v-else>
              <b-img
                :src="`${$config.APIRoot}/storage/student/${student.photo}`"
                thumbnail
                fluid
                alt="Responsive image"
                width="230"
              ></b-img>
            </div>
          </div>
          <b-row no-gutters class="sm-query">
            <b-col md="6" class="first-detail p-4">
              <p>Name</p>
              <p>Gender</p>
              <p>Name</p>
              <p>Gender</p>
              <p>Name</p>
              <p>Gender</p>
              <p>Name</p>
              <p>Gender</p>
            </b-col>
            <b-col md="6" class="first-details p-4">
              <p>
                {{ student.first_name }} {{ student.last_name }}
                {{ student.middle_name }}
              </p>
              <p>{{ student.gender }}</p>
              <p>{{ student.klase.name }}</p>
              <p>{{ student.adm_no }}</p>
              <p>{{ student.code }}</p>
              <p>{{ student.code }}</p>
              <p>{{ student.admitted_year }}</p>
              <p>{{ student.birthday }}</p>
              <p>{{ student.guardian_name }}</p>
              <p>{{ student.guardian_no }}</p>
              <p>{{ student.guardian_email }}</p>
              <p>{{ user.blood_group.name }}</p>
              <!-- <p>{{student.guardian_name}}</p> -->
            </b-col>
          </b-row>
        </b-jumbotron>
      </div>
    </template>
  </div>
</template>

<script>
import { USER_STUDENT_QUERY } from '~/graphql/users/queries'
export default {
  apollo: {
    user: {
      query: USER_STUDENT_QUERY,
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

  .grow {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

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
<template>
  <div class="p-4">
    <template v-if="nowLoading"><Preload /></template>
    <template v-else>
      <div class="wrapper p-4">
        <h3 class="text-center">School Info</h3>
        <h5>About Admin</h5>

        <p>Full Name: Ruth Lala</p>
        <p>School Name: Faith International</p>
        <h3>Packages</h3>
        <p>Payment Method</p>
        <p>Status: Active</p>

        <h3>All students</h3>
        :
        <h3>{{ students }}</h3>
        <h3>All Guardians</h3>
        :
        <h3>{{ guardians }}</h3>
        <h3>All Teachers</h3>
        :
        <h3>{{ teachers }}</h3>
        <h3>All accountants</h3>
        <h3>All drivers</h3>
      </div>
    </template>
  </div>
</template>

<script>
import { GUARDIAN_DASHBOARD_QUERIES } from '@/graphql/guardians/queries'
import { TEACHER_DASHBOARD_QUERIES } from '@/graphql/teachers/queries'
import { STUDENT_DASHBOARD_QUERIEX } from '@/graphql/students/queries'
export default {
  data() {
    return {
      studentsDashboard: [],
      teachersDashboard: [],
      guardiansDashboard: [],
    }
  },
  computed: {
    nowLoading() {
      return (
        this.$apollo.queries.studentsDashboard.loading &&
        this.$apollo.queries.teachersDashboard.loading &&
        this.$apollo.queries.guardiansDashboard.loading
      )
    },
    schoolId() {
      return this.$route.params.id
    },
    students() {
      return this.studentsDashboard.length
    },
    guardians() {
      return this.guardiansDashboard.length
    },
    teachers() {
      return this.teachersDashboard.length
    },
  },

  apollo: {
    studentsDashboard: {
      query: STUDENT_DASHBOARD_QUERIEX,
      variables() {
        return {
          workspaceId: parseInt(this.schoolId),
        }
      },
    },
    teachersDashboard: {
      query: TEACHER_DASHBOARD_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.schoolId),
        }
      },
    },
    guardiansDashboard: {
      query: GUARDIAN_DASHBOARD_QUERIES,
      variables() {
        return {
          workspaceId: parseInt(this.schoolId),
        }
      },
    },
  },
}
</script>

<style lang="scss">
.wrapper {
  background-color: #fff;
}
</style>

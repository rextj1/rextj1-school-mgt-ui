<template>
  <div class="profile p-3">
    <template v-if="$apollo.queries.student.loading">
      <Preload />
    </template>
    <template v-else>
      <div class="d-flex justify-content-between">
        <b-button
          :to="{
            name: 'workspace-admin-student',
            params: { workspace: mainWorkspace.slug },
          }"
          variant="light"
          size="md"
          class="add-student mb-4"
        >
          <b-icon icon="arrow-left" /> Back
        </b-button>

        <b-button
          variant="primary"
          pill
          size="md"
          class="mb-4"
          @click="showGuardianProfile"
        >
          Guardian Details
        </b-button>
      </div>

      <b-card class="user shadow-sm">
        <div v-if="student.photo == null" class="text-center mb-4 mt-4">
          <b-img
            src="@/assets/svg/user-avatar.svg"
            
            fluid
            alt="student"
            width="200"
          ></b-img>
        </div>

        <div v-else class="text-center mb-4 mt-4">
          <b-img style="border-radius:50%"
            :src="`${$config.APIRoot}/storage/${mainWorkspace.id}/students/${student.photo}`"
            thumbnail
            fluid
            alt="student"
            width="200"
          ></b-img>
        </div>

        <div class="d-flex justify-content-between p-5">
          <div>
            <p>Full Name</p>
            <p>Phone no:</p>
            <p>Admission no:</p>
            <p>class</p>
            <p>Registration Code</p>
            <p>Section</p>
            <p>Gender</p>
            <p>Email</p>
            <p>Religion</p>
            <p>Blood Group</p>
            <p>Country</p>
            <p>State</p>
            <p>City</p>
            <p>L.G.A</p>
          </div>
          <div style="font-weight: bold">
            <p>
              {{ student.last_name }} {{ student.first_name }}
              {{ student.middle_name | '' }}
            </p>
            <p>{{ student.phone }}</p>

            <p>{{ student.adm_no }}</p>
            <p>{{ student.klase.name }}</p>
            <p>{{ student.code }}</p>
            <p>{{ student.section.name }}</p>

            <p>{{ student.gender }}</p>
            <p>
              {{ student.user.email }}
            </p>
            <p>
              {{ student.user.religion }}
            </p>
            <p>
              {{
                student.user.blood_group != null
                  ? student.user.blood_group.name
                  : ''
              }}
            </p>
            <p>
              {{ student.user.country.name }}
            </p>
            <p>
              {{ student.user.state.name }}
            </p>
            <p>
              {{ student.user.city }}
            </p>
            <p>
              {{ student.user.lga }}
            </p>
          </div>
        </div>
      </b-card>

      <!-- change password modal -->
      <b-modal id="guardian-profile" size="lg" centered hide-header hide-footer>
        <b-card class="user shadow-sm">
          <h5 style="color: green">Guardian Details</h5>
          <div
            v-if="student.guardian.user.photo == null"
            class="text-center mb-4 mt-4"
          >
            <b-img
              src="@/assets/svg/user-avatar.svg"
              fluid
              alt="student"
              width="150"
            ></b-img>
          </div>

          <div v-else class="text-center mb-4 mt-4">
            <b-img
              :src="`${$config.APIRoot}/storage/${mainWorkspace.id}/guardians/${student.guardian.user.photo}`"
              fluid
              alt="guardian"
              width="150"
            ></b-img>
          </div>

          <div class="d-flex justify-content-between p-3">
            <div>
              <p>Full Name</p>
              <p>Phone no:</p>

              <p>Email</p>
              <p>Guardian Address</p>
            </div>
            <div style="font-weight: bold">
              <p>{{ student.guardian_name }}</p>

              <p>{{ student.guardian_no }}</p>

              <p>{{ student.guardian_email }}</p>
              <p>{{ student.guardian_address }}</p>
            </div>
          </div>
        </b-card>
      </b-modal>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { STUDENT_QUERY } from '~/graphql/students/queries'
import Preload from '~/components/Preload.vue'

export default {
  components: { Preload },
  apollo: {
    student: {
      query: STUDENT_QUERY,
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
  methods: {
    showGuardianProfile() {
      this.$bvModal.show('guardian-profile')
    },
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

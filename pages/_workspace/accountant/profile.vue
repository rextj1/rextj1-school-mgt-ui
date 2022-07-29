<template>
  <div class="profile">
    <template v-if="$apollo.queries.user.loading"><Preload /></template>
    <template v-else>
     <div>
              {{ accountant }}
        <b-jumbotron header="" class="teacher shadow">
          <h1 class="d-flex align-items-center">
            Current Fee Status: <b-badge variant="success">Paid</b-badge>
          </h1>

          <div class="d-flex justify-content-center mb-4">
            <div v-if="accountant.photo == 'null'">
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
                :src="`${$config.APIRoot}/storage/${mainWorkspace.id}/accountants/${accountant.photo}`"
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
                {{ accountant.first_name }} {{ accountant.last_name }}
                {{ accountant.middle_name }}
              </p>
              <p>{{ accountant.gender }}</p>

              <p>{{ accountant.adm_no }}</p>
              <p>{{ accountant.code }}</p>
              <p>{{ accountant.qualification }}</p>
              <p>{{ accountant.birthday }}</p>
            </b-col>
          </b-row>
        </b-jumbotron>
      </div>
    </template>
  </div> 
 
</template>

<script>
import { mapState } from 'pinia'
import { useWorkspaceStore } from '@/stores/wokspace'
import { USER_ACCOUNTANT_QUERY } from '~/graphql/users/queries'
export default {
  apollo: {
    user: {
      query: USER_ACCOUNTANT_QUERY,
      variables() {
        return {
          id: parseInt(this.$auth.user.id),
        }
      },
    },
  },
  computed: {
    ...mapState(useWorkspaceStore, ['currentWorkspace']),
    mainWorkspace() {
      return this.currentWorkspace
    },
    accountant(){
      return this.user.accountant
    }
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

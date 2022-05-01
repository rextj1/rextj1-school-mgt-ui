<template>
  <div class="profile">
    <template v-if="!driver">
      <div style="background-color: #f1f9ae; width: 100%; min-height: 100vh">
        <div class="grow">
          <b-spinner
            style="width: 30rem; height: 30rem"
            type="grow"
            variant="danger"
          ></b-spinner>
        </div></div
    ></template>
    <template v-else>
      <b-button
        to="/admin/driver"
        variant="primary"
        size="lg"
        class="add-student mb-4"
      >
        <b-icon icon="arrow-left" /> Back
      </b-button>
      <b-jumbotron header="" class="driver shadow">
        <h1>About {{ driver.last_name }}</h1>
        <div class="d-flex justify-content-center mb-4">
          <b-img
            :src="`http://sms.test/storage/driver/${driver.photo}`"
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
            <p>Country</p>
            <p>State</p>
            <p>L.G.A</p>
            <p>Social Media Links</p>

            <!-- <p>
              <b-badge style="font-size: 1.6rem" variant="warning"
                >Subjects Assigned</b-badge
              >
            </p> -->
          </b-col>
          <b-col md="6" class="first-details p-4">
            <p>
              {{ driver.last_name }} {{ driver.first_name }}
  
            </p>
            <p>{{ driver.route }}</p>
            <p>{{ driver.driver_license }}</p>
            <p>{{ driver.vehicle_number }}</p>

            <p>{{ driver.phone }}</p>
            <p>
              {{ driver.blood_group.name }}
            </p>
            <p>
              {{ driver.country.name }}
            </p>
            <p>
              {{ driver.state.name }}
            </p>
            <p>
            </p>
            <p>{{ driver.lga }}</p>
           
          </b-col>
        </b-row>
      </b-jumbotron></template
    >
  </div>
</template>

<script>
import { DRIVER_QUERY } from '~/graphql/drivers/queries'
export default {
  apollo: {
    driver: {
      query: DRIVER_QUERY,
      variables() {
        return {
          slug: this.$route.params.slug,
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
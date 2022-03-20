<template>
  <div class="profile">
    <b-jumbotron header="" class="teacher shadow">
      <h1>
        About Me
      </h1>
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
          <p>John Sweet</p>
          <p>Female</p>
          <p>John Sweet</p>
          <p>Female</p>
          <p>John Sweet</p>
          <p>Female</p>
          <p>John Sweet</p>
          <p>Female</p>
        </b-col>
      </b-row>
    </b-jumbotron>
  </div>
</template>

<script>
export default {}
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
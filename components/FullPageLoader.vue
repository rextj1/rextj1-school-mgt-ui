<template>
  <div class="full-page-loader">
    <b-spinner variant="primary" />
  </div>
</template>

<style lang="scss">
// @import '~@/assets/scss/variables';

.full-page-loader {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner-border {
    height: 50px;
    width: 50px;
    border-width: 5px;
  }
}
</style>

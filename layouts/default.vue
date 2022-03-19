<template>
  <div class="flex-container">
    <SideBar />
    <div class="full-width">
      <TopNav />
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  .full-width {
    width: 100%;
  }
}

</style>

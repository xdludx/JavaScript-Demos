<template>
  <div class="header-wrapper">
    <header class="header">JavaScript-Demo</header>
  </div>
</template>

<script>
export default {
  name: 'l-header',
  // props: {
  //   title: {
  //     default: [],
  //     type: [Array, String],
  //     required: true
  //   }
  // },
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
}
.header {
  width: 1140px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  color: $color
}
</style>

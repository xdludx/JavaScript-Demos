<template>
  <div id="app">
    <div>
      <el-button @click="startHacking">Starts</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
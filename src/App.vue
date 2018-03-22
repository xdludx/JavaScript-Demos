<template>
  <div id="app">
    <l-header></l-header>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <div class="content">
      <div class="page-container">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100%;
  .content {
    height: 100%;
  }
  .page-container {
    width: 1140px;
    margin-top: 50px;
  }
}
</style>
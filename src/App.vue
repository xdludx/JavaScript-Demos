<template>
  <div id="app">
    <!--  -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <!-- <div class="content">
      <div class="page-container">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div> -->
    <el-container class="page-container">
      <el-header height="50px">
        <l-header></l-header>
      </el-header>
      <el-container class="main-container">
        <el-aside width="200px">
          <l-menu></l-menu>
        </el-aside>
        <el-main>
          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
#app {
  height: 100%;
  .page-container {
    width: 1140px;
    min-height: 100%;
    margin: 0 auto;
    padding-top: 60px;
  }
  .el-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    z-index: 1000;
  }
  .main-container {
    min-height: 100%;
  }
  .el-aside {
    // background-color: #D3DCE6;
    color: #333;
    // text-align: center;
    // line-height: 200px;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
}
</style>
<template>
  <div class="menu-box">
    <el-menu
      default-active="2"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu v-for="(firstItem, firstIndex) in menu" :key="firstIndex" :index="firstIndex + ''">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{firstItem.text}}</span>
        </template>
        <el-menu-item v-for="(secondItem, secondIndex) in firstItem.children" :key="secondIndex" :index="secondItem + ''">
          {{secondItem.text}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'l-menu',
  data() {
    return {
      menu: [
        {
          text: "1111",
          link: "2222",
          children: [
            {
              text: "11-11",
            }, {
              text: "22-22"
            }
          ]
        }, {
          text: "1111",
          link: "2222",
          children: [
            {
              text: "11-11",
            }, {
              text: "22-22"
            }
          ]
        }, {
          text: "1111",
          link: "2222",
          children: [
            {
              text: "11-11",
            }, {
              text: "22-22"
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
.header-box {
  width: 1140px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  background-color: #fff;
  color: $color;
  font-size: 16px;
}
</style>

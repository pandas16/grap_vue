<template>
  <div id="app">
    <el-container>
      <el-header>
        <div id="header">
          <div class="logo">非動</div>
          <div class="menu">
            <el-menu default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="/index">首页</el-menu-item>
              <el-menu-item index="/grap">演示</el-menu-item>
              <el-menu-item index="/userCenter">个人中心</el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-header>
      <el-divider class="el-divider"></el-divider>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '/',
    }
  },
  methods: {
    handleSelect (index) {
      this.activeIndex = index;
    },
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
#header {
  position: relative;
}

#header ul {
  border: 0;
  border-bottom: 5px;
}

#header li {
  line-height: 49px;
  height: 49px;
  padding: 0 15px;
}
.logo {
  float: left;
  font-size: 26px;
  font-weight: bold;
  font-family: serif;
  line-height: 60px;
}
.menu {
  float: right;
  line-height: 60px;
}
.el-divider{
  margin: 0;
}
</style>
<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <span>本熊</span>
          </el-col>
          <el-col :span="6">
            <el-menu :default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">
                <router-link to="/index">首页</router-link>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">百宝箱</template>
                <el-menu-item index="2-1">
                  <router-link to="/demo">演示</router-link>
                </el-menu-item>
              </el-submenu>
              <el-menu-item index="3">
                <router-link to="/userCenter">个人中心</router-link>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
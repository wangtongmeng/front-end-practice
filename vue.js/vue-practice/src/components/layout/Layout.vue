<template>
  <el-container class="layout">
    <!-- header -->
    <!-- <el-header class="layout-header">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>wtm</span>
    </el-header> -->
    <!-- content -->
    <el-container class="layout-content">
      <!-- content-aside -->
      <el-aside width="200px" class="layout-content-aside">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-openeds="['1', '3']"
          unique-opened
        >
          <el-submenu index="0">
              <template slot="title"><i class="el-icon-s-platform"></i>vue知识</template>
              <el-menu-item index="0-1">
                <router-link tag="li" to="/directive">自定义指令</router-link>
              </el-menu-item>
            </el-submenu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-data"></i>图表</template>
            <el-menu-item index="1-1">
              <router-link tag="li" to="/v-chart">v-chart</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-platform"></i>UI组件</template>
            <el-menu-item index="2-1">
              <router-link tag="li" to="/element-ui">element-ui</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link tag="li" to="/vue-multipane">vue-multipane</router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        
      </el-aside>
      <!-- content-main -->
      <el-main class="layout-content-main">
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
};
</script>
<style lang="scss" scoped>
.layout {
  height: 100vh;
  &-header {
    background: #999;
    text-align: right;
    font-size: 12px;
  }
  &-content {
    &-aside {
      background: #545c64;
      color: #fff;
    }
    &-main {
      overflow-y: auto;
    }
  }
}
</style>
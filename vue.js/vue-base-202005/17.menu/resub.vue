<template>
  <el-submenu :key="data.id" v-if="data.children">
    <template slot="title">{{data.title}}</template>
    <template v-for="d in data.children">
      <resub :key="d.id" :data="d"></resub>
    </template>
  </el-submenu>
  <el-menu-item v-else :key="data.id">{{data.title}}</el-menu-item>
</template>

<script>
import elMenuItem from './components/el-menu-item'
import elSubmenu from './components/el-submenu'
export default {
  name: 'resub', // 可以根据自己当前的组件名循环自己
  props: {
    data: {}
  },
  components: {
    'el-menu-item': elMenuItem,
    'el-submenu': elSubmenu
  }
}
</script>

<style lang="scss" scoped>
</style>
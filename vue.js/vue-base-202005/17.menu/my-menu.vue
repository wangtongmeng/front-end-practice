<template>
  <el-menu>
    <template v-for="d in data">
      <resub :data="d" :key="d.id"></resub>
    </template>
    <!-- <el-menu-item>根1</el-menu-item>
    <el-submenu>
      <template slot="title">根2</template>
      <el-menu-item index="2-1">根2-1</el-menu-item>
      <el-menu-item index="2-1">根2-2</el-menu-item>
    </el-submenu>
    <el-menu-item>根3</el-menu-item>
    <el-menu-item>根4</el-menu-item> -->
  </el-menu>
  <!-- <ul>
      <li>根1</li>
      <li>
        <div>根2</div>
        <ul>
          <li>根2-1</li>
          <li>根2-2</li>
        </ul>
      </li>
      <li>根3</li>
      <li>根4</li>
    </ul> -->
</template>

<script>
import elMenu from './components/el-menu'
// import elMenuItem from './components/el-menu-item'
// import elSubmenu from './components/el-submenu'
import resub from './resub'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    'el-menu': elMenu,
    // 'el-menu-item': elMenuItem,
    // 'el-submenu': elSubmenu,
    resub
  }
}
</script>

<style lang="scss" scoped>
</style>
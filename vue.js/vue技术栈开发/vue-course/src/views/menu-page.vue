<template>
  <div class="menu-box">
    <a-menu>
      <a-menu-item>111</a-menu-item>
      <a-menu-item>222</a-menu-item>
      <a-submenu>
				<div slot="title">333</div>
        <a-menu-item>333-11</a-menu-item>
        <a-menu-item>333-22</a-menu-item>
				<a-submenu>
				<div slot="title">333-33</div>
        <a-menu-item>333-33-11</a-menu-item>
        <a-menu-item>333-33-22</a-menu-item>
      </a-submenu>
      </a-submenu>
    </a-menu>
  </div>
</template>
<script>
import menuComponents from '_c/menu'
const { AMenu, AMenuItem, ASubmenu } = menuComponents
export default {
  name: 'menu_page',
  components: {
    AMenu,
    AMenuItem,
    ASubmenu
  }
}
</script>

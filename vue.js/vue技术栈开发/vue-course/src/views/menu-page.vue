<template>
  <div class="menu-box">
    <!-- <a-menu>
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
    </a-menu> -->
    <a-menu>
      <template v-for="(item, index) in list">
        <a-menu-item v-if="!item.children" :key="`mune_item_${index}`">{{ item.title }}</a-menu-item>
        <re-submenu v-else :key="`menu_item_${index}`" :parent="item" :index="index"></re-submenu>
      </template>
    </a-menu>
  </div>
</template>
<script>
import menuComponents from '_c/menu'
import ReSubmenu from './re-submenu.vue'
const { AMenu, AMenuItem, ASubmenu } = menuComponents
export default {
  name: 'menu_page',
  components: {
    AMenu,
    AMenuItem,
		ASubmenu,
		ReSubmenu
  },
  data() {
    return {
      list: [
        {
          title: '1'
        },
        {
          title: '2'
        },
        {
          title: '3',
          children: [
            {
              title: '3.1'
            },
            {
              title: '3.2',
              children: [
                {
                  title: '3.2.1'
                },
                {
                  title: '3.2.2'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

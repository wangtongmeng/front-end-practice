<template>
    <Menu ref="menu" :theme="theme2" :open-names="openNames" :active-name="activeName" accordion>
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-paper" />
                内容管理
            </template>
            <MenuItem name="1-1">文章管理</MenuItem>
            <MenuItem name="1-2">评论管理</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-people" />
                用户管理
            </template>
            <MenuItem name="2-1">新增用户</MenuItem>
            <MenuItem name="2-2">活跃用户</MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
    </Menu>
</template>
<script>
export default {
    data () {
        return {
            theme2: 'light',
            activeName: '1-1',
            openNames: ['1']
        }
    },
    mounted () {
      setTimeout(() => {
          this.openNames = ['2']
          this.activeName = '2-1'
          this.$nextTick(() => {
            this.$refs.menu.updateOpened()
            this.$refs.menu.updateActiveName()
          })
        }, 1000)
    },
}
</script>
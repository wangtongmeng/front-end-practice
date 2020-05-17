<template>
  <div>
    <myDialog ref="dialog"></myDialog>
    <button @click="change">点我</button>
  </div>
</template>

<script>
import myDialog from './components/my-dialog'
export default {
  components: {
    myDialog,
  },
  mounted () {
    this.$bus.$emit('监听事件','hello')
  },
  methods: {
    change() {
      // 可以获取当前dialog组件中任何属性
      // 不要通过这种方式去改变组件的属性，不符合单项数据流
      // ref用法
      // 在普通元素上 可以获取dom元素
      // 在v-for里面 获取的是一组 dom/组件实例
      // 在组件上 获取当前组件的实例 
      this.$refs.dialog.change()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
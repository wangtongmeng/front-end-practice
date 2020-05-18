<template>
  <div>
    <myDialog ref="dialog">
      <!-- 普通插槽 -->
      <!-- hello world -->

      <!-- 具名插槽 -->
      <!-- 内部原理 {header:div,footer:div} -->
      <!-- 新版本写法 不能放在div上 -->
      <template v-slot:header>header</template>
      <!-- 老版本的写法 slot="" -->
      <div slot="footer">footer</div>
    </myDialog>
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
    this.$bus.$on('父', function () {
      console.log('被触发')
    })
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
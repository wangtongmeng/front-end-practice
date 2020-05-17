<template>
  <div style="border: 1px solid red;padding:5px;">
    App
    <!-- <Parent></Parent> -->

    <!-- $parent $children -->
    <!-- parent.$on('eat) parent.$emit('eat') 自己绑的自己触发 -->
    <my-parent @eat="eat"></my-parent>
    <!-- <button @click="$broadcast('drink','grandson','xxx')">触发grandson中的drink方法</button> -->
    <Test a="1" b="2" c="3" d="4" @click="click" @mousedown="mousedown"></Test>
  </div>
</template>

<script>
// 组件的使用规则：1.定义组件 2.引入 3.注册组件 4.使用组件
// 注册时和使用时命名一致
import Parent from './components/parent'
import Test from './components/test'
  export default {
    data(){
      return {msg: 'hello'}
    },
    components: {
      // Parent, // 最好和template中保持一致
      // 'myParent': Parent // 驼峰的，template中可以用驼峰的myParent，也可以用中划线的my-parent
      'my-parent': Parent,
      Test
    },
    methods: {
      // $parent $children
    // eat(){
    //   console.log('app 中的 eat方法')
    // },
    // $dispatch
    eat(value){
      console.log('parent绑定的eat方法', value)
    },
    click() {
      console.log('click')
    },
    mousedown() {
      console.log('mousedown')
    }
    }
  }
</script>

<style scoped>
</style>
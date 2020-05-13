<template>
  <div>
    <!-- <Parent></Parent> -->
    <my-parent></my-parent>
  </div>
</template>

<script>
// 组件的使用规则：1.定义组件 2.引入 3.注册组件 4.使用组件
// 注册时和使用时命名一致
import Parent from './components/parent'
  export default {
    data(){
      return {msg: 'hello'}
    },
    components: {
      // Parent, // 最好和template中保持一致
      // 'myParent': Parent // 驼峰的，template中可以用驼峰的myParent，也可以用中划线的my-parent
      'my-parent': Parent
    },
  }
</script>

<style scoped>

</style>
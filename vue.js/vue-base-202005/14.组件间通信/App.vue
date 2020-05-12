<template>
  <div>
    <Parent></Parent>
  </div>
</template>

<script>
// 组件的使用规则：1.定义组件 2.引入 3.注册组件 4.使用组件
import Parent from './components/parent'
  export default {
    data(){
      return {msg: 'hello'}
    },
    components: {
      Parent,
    },
  }
</script>

<style scoped>

</style>
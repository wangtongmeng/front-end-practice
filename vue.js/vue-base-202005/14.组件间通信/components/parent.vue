<template>
  <div style="border: 1px solid red;padding:5px;">
    parent
    <Son1 :money="mny" :change-money="changeMoney"></Son1>
  </div>
</template>
<script>
import Son1 from './son1'
export default {
  name: 'parent',
  components: {
    Son1
  },
  data(){
    return {
      // 父亲有100块
      mny: 100
    }
  },
  methods: {
    changeMoney(value){
      this.mny += value
    }
  }
}
// 数据传递的关系 父子传递 子父传递 平级传递 跨级传递
// 父子通信
//   给子组件传递属性和方法 子组件可以调用父组件中定义的函数，将需要修改的值传递给父组件。典型的单向数据流
</script>
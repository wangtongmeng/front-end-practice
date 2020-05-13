<template>
  <div style="border: 1px solid red;padding:5px;">
    son1
    {{money}} <button @click="changeMoney(500)">更改父亲的钱数</button>
  </div>
</template>
<script>
export default {
  name: 'son1',
  // 子组件不能更改父组件中的数据，因为属性不是响应式的
  // 子组件可以调用父组件中定义的函数，将需要修改的值传递给父组件。典型的单向数据流
  
  // props: ['money'] // 把money属性添加给了子组件
  props: {
    money: {
      type: Number,
      default: 100
    },
    // 驼峰chagneMoney或者写死 change-money
    'changeMoney': {
      type: Function,
      default: () => {}
    }
  }
}
</script>
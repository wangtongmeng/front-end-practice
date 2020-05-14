<template>
  <div style="border: 1px solid red;padding:5px;">
    <!-- son1 {{value}} -->
    <!-- 方式1 -->
    <!-- {{money}} <button @click="changeMoney(500)">更改父亲的钱数</button> -->
    <!-- {{money}} -->
    <!-- 方式2 -->
    <!-- <button @click="change">点击按钮</button> -->
    <!-- 方式3 -->
    <!-- <button @click="change1">点击按钮</button> -->
    <!-- son1 {{mny}} -->
    <!-- <button @click="$emit('change', 500)">更新</button> -->

    <!-- .sync语法 语法糖 -->
    {{money}}  <button @click="$emit('update:money', 500)">更新</button>
  </div>
</template>
<script>
export default {
  name: "son1",
  model: {
    // 自定义 v-model
    prop: "mny", // 默认是 value 属性
    event: "change" // 默认是 input 事件名
  },
  // 子组件不能更改父组件中的数据，因为属性不是响应式的
  // 子组件可以调用父组件中定义的函数，将需要修改的值传递给父组件。典型的单向数据流

  // props: ['money'] // 把money属性添加给了子组件
  props: {
    // value: {
    //   type: Number
    // },
    mny: {
      type: Number
    },
    money: {
      type: Number,
      default: 100
    },
    // 驼峰chagneMoney或者写死 change-money
    changeMoney: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    change() {
      // 子组件给自己绑定了一个父组件的方法，子组件通过发布订阅的方式触发这个方法
      this.$emit("click", 300);
    },
    change1() {
      this.$emit("input", 300);
    }
  }
};
</script>
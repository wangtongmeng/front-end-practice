<template>
  <div style="border: 1px solid red;padding:5px;">
    parent
    <!-- 方式1 -->
    <!-- <Son1 :money="mny" :change-money="changeMoney"></Son1> -->
    <!-- 方式2 给儿子添加一个事件，等一会儿触发这个事件 -->
    <!-- 这里的click不是不是原生的事件  v-on:click="changeMoney"  最终会给son1.$on('click', changeMoney) 处于也是在子组件上 son1.$emit('click', 参数)-->
    <!-- <Son1 :money="mny" @click="changeMoney"></Son1> -->
    <!-- 如果想用原生的click事件 .native修饰符  会把事件帮顶给 当前的组件的最外层元素上 一般不会这样写 -->
    <!-- <Son1 :money="mny" @click.native="changeMoney"></Son1> -->
    <!-- <Son1 :money="mny" @click="changeMoney"></Son1> -->

    <!-- 同步数据 -->
    <!-- {{mny}} -->
    <!-- <Son1 :value="mny" @input="val => mny=val"></Son1> -->
    <!-- 可以更换成   v-model是:value+@input的语法糖-->
    <!-- <Son1 v-model="mny"></Son1> -->
    <!-- 自定义 v-model -->
    <!-- <Son1 v-model="mny"></Son1> -->

    <!-- .sync语法 语法糖 -->
    <!-- <Son1 :money="mny" @update:money="val=>mny=val"></Son1> -->
    <!-- .sync是上面的语法糖 -->
    <!-- <Son1 :money.sync="mny"></Son1> -->

    <!-- 1.如果父子组件 想同步数据 可以使用 传递属性+自定义事件的方式(语法糖 v-model/.sync) -->
    <!-- 2.将父组件的方法直接传递给子组件调用 -->
    <Son2 @eat="eat"></Son2>
  </div>
</template>
<script>
// import Son1 from "./son1";
import Son2 from "./son2";
export default {
  provide () { // 提供者 上下文
    return {
      parent: this // 直接将这个组件暴露出去
    }
  },
  name: "parent",
  components: {
    // Son1,
    Son2
  },
  data() {
    return {
      // 父亲有100块
      mny: 100
    };
  },
  methods: {
    changeMoney(value) {
      // methods中的函数 已经被bind过了 不能再更改了
      console.log(this.$options.name); // parent，this指向parent组件
      this.mny += value;
    },
    // $parent $children
    eat(){
      console.log('son2绑定的eat方法')
    },
  }
};
// 数据传递的关系 父子传递 子父传递 平级传递 跨级传递
// 父子通信
//   1.给子组件传递属性和方法(和react一样) 子组件可以调用父组件中定义的函数，将需要修改的值传递给父组件。典型的单向数据流
//   2.
</script>
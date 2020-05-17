<template>
  <div style="border: 1px solid red;padding:5px;">
    test
    {{$attrs}}
    <!-- <T :c="$attrs.c" :d="$attrs.d"></T> -->
    <!-- 可以使用v-bind代替上面的写法，把所有属性传给子组件 -->
    <!-- 类似于对象的展开运算符{...obj} -->
    <!-- <T v-bind="$attrs"></T> -->
    <!-- <T v-bind="{a:1,b:2,c:3,d:4}"></T> -->
    <T v-on="$listeners" v-bind="$attrs"></T>
  </div>
</template>

<script>
// 这个组件只是过渡的 它不需要使用这些属性
// props 和 $attrs是互斥的。如果在props里用了 attr里就会减少
// $attr是响应式的 父亲变了 数据也会更新
import T from './t'
export default {
  inheritAttrs: false, // 这些属性($attrs中的) 虽然没有用，但不希望增加到dom元素上
  props: ['a', 'b'],
  components: {
    T
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
</style>
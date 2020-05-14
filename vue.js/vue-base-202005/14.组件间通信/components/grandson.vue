<template>
  <div style="border: 1px solid red;padding:5px;">
    grandson
    {{parent.mny}} 
    <!-- $parent $children -->
    <button @click="$parent.$emit('eat')">触发son2的事件</button>
    <button @click="$parent.$parent.$emit('eat')">触发parent的事件</button>
    <button @click="$dispatch('eat', '饭')">通过$dispatch 触发parent的事件</button>

  </div>
</template>
<script>
// $parent指代的是父组件
// $children指代的子组件
// element-ui 内部的机制 就是触发事件时只要父亲绑定过这个方法就触发
export default {
  inject: ['parent']
}
</script>
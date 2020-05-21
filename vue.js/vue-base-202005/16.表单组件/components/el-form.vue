<template>
    <form>
      <slot></slot>
    </form>
</template>

<script>
export default {
  // 可以默认和当前组件标签一致
  name: 'el-form',
  props: {
    model: {
      type: Object,
      default: () => ({}) // 保证组件间的数据都是独立的
    },
    rules: Object
  },
  methods: {
    validate () {
      
    }
  }
}
</script>

<style>

</style>
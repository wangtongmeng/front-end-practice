<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  // 可以默认和当前组件标签一致
  name: 'el-form-item',
  props: {
    label: { // 标签
      type: String,
      default: ''
    },
    prop: String // 当前校验哪一个属性
  },
  mounted(){
    this.$on('validate', function(){
      console.log(this.prop)
    })
  }
}
</script>

<style>

</style>
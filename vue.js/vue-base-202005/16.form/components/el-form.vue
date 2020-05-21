<template>
    <form @submit.prevent>
      <slot></slot>
    </form>
</template>

<script>
export default {
  // 可以默认和当前组件标签一致
  name: 'el-form',
  provide(){
    return {
      elForm: this
    }
  },
  props: {
    model: {
      type: Object,
      default: () => ({}) // 保证组件间的数据都是独立的
    },
    rules: Object
  },
  methods: {
    async validate (cb) {
      // 看一下 所有的form-item 是否符合规范
      // 调用一下所有的form-item validate方法 看是否通过就可以了
      let children = this.$children
      let arr = []
      function findFormItem(children) {
        children.forEach(child => {
          if(child.$options.name === 'el-form-item'){
            arr.push(child)
          }
          if(child.$children){
            findFormItem(child.$children)
          }
        })
        
      }
      findFormItem(children)
      try {
        await Promise.all(arr.map(child=>child.validate()))
        cb(true)
      } catch (e) {
        cb(false)
      }
    }
  }
}
</script>

<style>

</style>
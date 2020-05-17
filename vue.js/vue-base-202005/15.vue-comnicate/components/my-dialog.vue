<template>
  <div v-if="isShow">
    这是个弹框
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      isShow: true
    }
  },
  mounted () {
    // 内部原理 发布订阅 {'监听事件', [fn, fn]}
    this.$bus.$on('监听事件', function (arg) {
      console.log('父组件ok了 1', arg)
    })
    this.$bus.$on('监听事件', function (arg) {
      console.log('父组件ok了 2', arg)
    })
  },
  methods: {
    change() {
      this.isShow = !this.isShow
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
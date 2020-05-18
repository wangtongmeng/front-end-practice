<template>
  <div v-if="isShow">
    这是个弹框
    <!-- 普通插槽 -->
    <!-- <slot></slot> -->

    <!-- 具名插槽 -->
    <!-- 内部原理 {header:div,footer:div} 渲染的时候会根据name找到要渲染的dom -->
    <div><slot name="header"></slot></div>
    这是一个弹框
    <div><slot name="footer" :isShow="isShow" a="a" b="b"></slot></div>
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
    this.fn = function (arg) {
      console.log('父组件ok了 1', arg)
    }
    // 内部原理 发布订阅 {'监听事件', [fn, fn]}
    this.$bus.$on('监听事件', this.fn)
    this.$bus.$on('监听事件', function (arg) {
      console.log('父组件ok了 2', arg)
    })

    // mounted顺序 先子后父，这时父组件还没有的被挂载，所以在父组件mounted的$on监听，是没有被触发的
    // this.$bus.$emit('父')
    // 可以通过$nextTick
    this.$nextTick(() => {
      this.$bus.$emit('父')
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
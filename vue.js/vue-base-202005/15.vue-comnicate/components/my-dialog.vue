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
  methods: {
    change() {
      this.isShow = !this.isShow
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
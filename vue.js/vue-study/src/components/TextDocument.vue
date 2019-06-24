<template>
  <div @click="handleClick">{{title}}</div>
</template>
<script>
export default {
  props: {
    title: String
  },
  methods: {
    handleClick () {
      this.$emit('update:title', '新title')
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>

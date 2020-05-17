<template>
  <div style="border: 1px solid red;padding:5px;">
    t.vue
    {{$attrs}}
    <button @click="$listeners.click">点击</button>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$listeners)
  },
}
</script>

<style lang="scss" scoped>
</style>
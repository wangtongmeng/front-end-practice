<template>
  <div id="app">
    我的年龄 {{ $store.state.age }} <br />
    珠峰的年龄 {{ $store.getters.getAge }} <br />
    <button @click="$store.commit('changeAge', 10)">同步修改</button>
    <button @click="$store.dispatch('changeAge', 5)">异步修改</button>
    <button @click="$store.state.age++">恶意修改</button>

    <div>A模块中的状态 : {{ $store.state.a.aAge }}</div>
    <div>B模块中的状态 : {{ $store.state.b.bAge }}</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    console.log(this.$store)
  }
}
</script>

<style>
</style>

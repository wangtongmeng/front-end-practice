<template>
  <div id="app">
    <map-one></map-one>
  </div>
</template>

<script>
import MapOne from './components/BMapOne.vue'
export default {
  name: 'app',
  components: {
    MapOne
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

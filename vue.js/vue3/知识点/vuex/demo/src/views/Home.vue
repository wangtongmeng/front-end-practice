<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>{{myName}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    myName() {
      return this.$store.state.name;
    }
  }
}
</script>

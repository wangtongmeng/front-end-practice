<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <router-view></router-view> -->
    <VueTest></VueTest>
  </div>
</template>

<script>
// @ is an alias to /src
import VueTest from '@/components/vuex'
export default {
  name: 'home',
  components: {
    VueTest
  }
}
</script>

<template>
  <div>
    <router-link to="/demo">demo</router-link>
    <router-link to="/home">home</router-link>
    <router-link to="/form">form</router-link>
    <router-link to="/FormGenerator">FormGenerator</router-link>
    <router-link to="/optimize">optimize</router-link>
    <router-link to="/FormCreate">FormCreate</router-link>
    <router-link to="/ele">element二次封装</router-link>
    <!-- <my-marquee></my-marquee> -->
    <router-view></router-view>
  </div>
</template>

<script>
import MyMarquee from './components/marquee'
export default {
  components: {
    MyMarquee
  }
};
</script>

<style>
</style>
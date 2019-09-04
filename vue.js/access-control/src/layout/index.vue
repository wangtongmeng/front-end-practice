<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar'
export default {
  components: {
    Sidebar
  }
}
</script>

<style scoped>
</style>

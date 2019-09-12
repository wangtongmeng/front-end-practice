<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar'

export default {
  components: {
    Sidebar
  }
}
</script>
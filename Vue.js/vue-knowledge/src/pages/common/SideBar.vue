<template>
    <div class="sidebar">
        sidebar
    </div>
</template>
<script>
export default {
  name: "SideBar"
};
</script>
<style lang="less" scoped>
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  z-index: 10;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

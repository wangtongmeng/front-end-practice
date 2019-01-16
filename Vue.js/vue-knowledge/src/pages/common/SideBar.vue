<template>
    <div class="sidebar">
        <ul>
            <li>
                <router-link to="/vue-router" class="page">vue-router</router-link>
            </li>
            <li>
                <router-link to="/components-dynamic-async" class="page">components-dynamic-async</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "SideBar"
};
</script>
<style lang="less" scoped>
.sidebar {
  overflow-y: auto;
  width: 320px;
  border-right: 1px solid #eaecef;
  .page {
    font-size: 16px;
    font-weight: bold;
    padding: 5px 2px;
  }
}
</style>

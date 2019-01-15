<template>
    <div id="app" class="app">
        <Header></Header>
        <router-view></router-view>
        
    </div>
</template>
<script>
import Header from "./pages/common/Header";
export default {
  name: "app",
  components: {
    Header
  }
};
</script>
<style lang="less" scoped>
@import "~styles/variables.less";
.app {
  color: @app-font-color;
  font-family: @app-font-family;
  font-size: @app-font-size;
}
</style>

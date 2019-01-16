<template>
    <div id="app" class="app">
        <Header></Header>
        <div class="content">
            <SideBar></SideBar>
            <div class="page">
                <router-view></router-view>
            </div>
        </div>
        <div></div>
    </div>
</template>
<script>
import Header from "./pages/common/Header";
import SideBar from "./pages/common/SideBar";
export default {
  name: "app",
  components: {
    Header,
    SideBar
  }
};
</script>
<style lang="less">
@import "~styles/variables.less";
html {
  height: 100%;
  body {
    height: 100%;
    .app {
      color: @app-font-color;
      font-family: @app-font-family;
      font-size: @app-font-size;
      background: @background-color;
      height: 100%;
      overflow: hidden;
      .content {
        padding-top: 60px;
        display: flex;
        height: 100%;
        .page {
          flex: 1;
          overflow: auto;
        }
      }
    }
  }
}
</style>

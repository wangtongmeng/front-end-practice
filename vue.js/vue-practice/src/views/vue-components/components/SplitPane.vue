<template>
  <div class="split-pane-wrapper" ref="outer">
    <div class="pane pane-left">
      left
    </div>
    <div class="pane-trigger-con"></div>
    <div class="pane pane-right">
      right
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
    };
  }
};
</script>
<style lang="scss" scoped>
.split-pane-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  .pane {
    position: absolute;
    top: 0;
    height: 100%;
    &-left {
      width: 30%;
      background: palevioletred;
    }
    &-right {
      right: 0;
      bottom: 0;
      background: paleturquoise;
    }
    &-trigger-con {
      height: 100%;
      background: red;
      position: absolute;
      top: 0;
      z-index: 10;
      user-select: none;
      cursor: col-resize;
    }
  }
}
</style>
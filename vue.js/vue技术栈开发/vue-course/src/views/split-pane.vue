<template>
  <div class="split-pane-con">
    <split-pane></split-pane>
  </div>
</template>
<script>
import SplitPane from '_c/split-pane'
export default {
  components: {
    SplitPane
  }
}
</script>
<style lang="less" scoped>
.split-pane-con {
	width: 400px;
	height: 200px;
	background: papayawhip;
}
</style>

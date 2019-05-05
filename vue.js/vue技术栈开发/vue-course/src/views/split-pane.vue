<template>
  <div class="split-pane-con">
		<!-- v-model 的写法 -->
    <!-- <split-pane v-model="offset"></split-pane> -->
		<!-- 通过 .sync修饰符实现双向绑定 -->
    <split-pane :value.sync="offset">
			<div slot="left">left</div>
			<div slot="right">right</div>
		</split-pane>
  </div>
</template>
<script>
import SplitPane from '_c/split-pane'
export default {
  components: {
    SplitPane
	},
	data () {
		return {
			offset:  0.8
		}
	},
	methods: {
		// handleInput (value) {
		// 	this.offset = value
		// }
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

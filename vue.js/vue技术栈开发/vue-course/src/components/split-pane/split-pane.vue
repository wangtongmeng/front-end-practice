<template>
  <div class="split-pane-wrapper" ref="outer">
    <div class="pane pane-left" :style="{ width: leftOffsetPercent }"></div>
    <div class="pane-trigger-con" @mousemove="handleMousemove" :style="{ left: triggerLeft, width: `${triggerWidth}px` }"></div>
    <div class="pane pane-right" :style="{ left: leftOffsetPercent }"></div>
  </div>
</template>
<script>
export default {
	name: 'SplitPane',
	props: {
		triggerWidth: {
			type: Number,
			default: 8
		}
	},
	data () {
		return {
			leftOffset: 0.3,
		}
	},
	computed: {
		leftOffsetPercent () {
			return `${this.leftOffset * 100}%`
		},
		triggerLeft () {
			return `calc(${this.leftOffset * 100}% - ${this.triggerWidth / 2}px)`
		}
	},
	methods: {
		handleMousemove (event) {
			// 容器距离页面左侧的距离
			console.log(event.pageX - this.$refs.outer.getBoundingClientRect().left)
		}
	}
}
</script>
<style lang="less" scoped>
.split-pane-wrapper {
  height: 100%;
	width: 100%;
	position: relative;
  .pane {
		position: absolute;
		top: 0;
		height: 100%;
		&-left{
			// width: 30%;
			background: palevioletred;
		}
		&-right{
			left: 30%;
			right: 0;
			bottom: 0;
			background: paleturquoise;
		}
		&-trigger-con{
			// width: 8px;
			height: 100%;
			background: red;
			position: absolute;
			top: 0;
			z-index: 10;
		}
  }
}
</style>

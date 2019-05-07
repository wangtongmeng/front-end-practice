<template>
	<li class="a-menu-item">
		<slot></slot>
	</li>
</template>
<script>
export default {
	name: 'AMenuItem'
}
</script>
<style lang="less" scoped>
.a-menu-item {
	background: #614747;
	color:#fff;
}
</style>


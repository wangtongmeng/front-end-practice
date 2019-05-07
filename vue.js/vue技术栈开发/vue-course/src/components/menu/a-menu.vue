<template>
	<div class="a-menu">
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: 'AMenu'
}
</script>
<style lang="less" scoped>
.a-menu {
	& * {
		list-style: none;
	}
	ul {
		margin: 0;
		padding: 0;
	}
}
</style>


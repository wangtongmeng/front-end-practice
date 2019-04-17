<template>
	<div>
		{{ name }}
	</div>
</template>
<script>
export default {
	props: {
		name: {
			type:String,
			default: 'lison'
		}
	},
	beforeRouteUpdate (to, from ,next) {
		// 路由发生变化，组件被复用时调用
		// 由于组件已经渲染过了，所以可以使用 this
		console.log(to.name, from.name)
	},
}
</script>

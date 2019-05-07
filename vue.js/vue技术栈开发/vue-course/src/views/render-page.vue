<template>
	<div>
		<list :list="list" :render="renderFunc"></list>
	</div>
</template>
<script>
import List from '_c/list'
import CountTo from '_c/count-to'
export default {
	components: {
		List
	},
	data () {
		return {
			// list: [
			// 	{name: 'lison'},
			// 	{name: 'liili'},
			// ],
			list: [
				{number: 100},
				{number: 45},
			]
		}
	},
	methods: {
		// renderFunc (h, name) {
		renderFunc (h, number) {
			return (
				// <i on-click={this.handleClick} style={{color:'pink'}}>{name}</i>
				<CountTo nativeOn-click={this.handleClick} on-on-animation-end={this.handleEnd} endVal={ number } style={{color:'pink'}}>{name}</CountTo>
			)
		},
		handleClick (event) {
			console.log(event)
		},
		handleEnd () {
			console.log('end!')
		}
	}
}
</script>

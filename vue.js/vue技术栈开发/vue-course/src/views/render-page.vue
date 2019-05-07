<template>
	<div>
		<list :list="list">
			<!-- 作用插槽配合具名插槽使用 -->
			<!-- <count-to slot="aa" slot-scope="count" :end-val="count.number"></count-to> -->
			<count-to slot-scope="count" :end-val="count.number"></count-to>
		</list>
	</div>
</template>
<script>
import List from '_c/list'
import CountTo from '_c/count-to'
export default {
	components: {
		List,
		CountTo
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

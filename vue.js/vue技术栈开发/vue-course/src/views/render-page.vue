<template>
	<div>
		<ul @click="handleClick">
			<li @click.stop="handleClick" v-for="(item, index) in list" :key="`list_item_${index}`">{{ item.name }}</li>
		</ul>
	</div>
</template>
<script>
export default {
	data () {
		return {
			list: [
				{name: 'lison'},
				{name: 'liili'},
			]
		}
	},
	methods: {
		handleClick (event) {
			console.log(event)
		}
	}
}
</script>

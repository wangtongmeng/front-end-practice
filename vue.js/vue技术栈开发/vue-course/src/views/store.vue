<template>
	<div>
		<a-input v-model="inputValue"></a-input>		
		<p>{{ inputValue }}</p>
	</div>
</template>
<script>
import AInput from '_c/AInput.vue'
export default {
	components: {
		AInput
	},
	data () {
		return {
			inputValue: ''
		}
	}
}
</script>
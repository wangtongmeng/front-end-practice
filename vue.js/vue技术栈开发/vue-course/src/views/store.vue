<template>
	<div>
		<a-input @input="handleInput" />
		<p>{{ inputValue }}</p>
		<a-show :content="inputValue" />
	</div>
</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
export default {
	components: {
		AInput,
		AShow
	},
	data () {
		return {
			inputValue: ''
		}
	},
	methods: {
		handleInput (val) {
			this.inputValue = val
		}
	}
}
</script>
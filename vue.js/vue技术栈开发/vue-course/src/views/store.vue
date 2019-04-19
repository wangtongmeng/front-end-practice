<template>
	<div>
		<a-input @input="handleInput" />
		<p>{{ inputValue }} -> lastLetter is {{ inputValueLastLetter }}</p>
		<!-- <a-show :content="inputValue" /> -->
		<!-- <p>appName: {{ appName }}, appNameWithVersion: {{ appNameWithVersion }}</p> -->
		<p>userName: {{ userName }}, firstLetter is: {{ firstLetter }}</p>
	</div>
</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
import { mapState, mapGetters } from 'vuex'
// import { createNamespacedHelpers } from 'vuex'
// const { mapState } = createNamespacedHelpers('user')
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
	computed: {
		...mapState('user', {
			userName: state => state.userName
		}),
		// ...mapGetters([
		// 	'appNameWithVersion',
		// 	'firstLetter'
		// ]),
		...mapGetters('user', [
			'firstLetter'
		]),
		appName () {
			return this.$store.state.appName
		},
		inputValueLastLetter () {
			return this.inputValue.substr(-1, 1)
		},
		// appNameWithVersion () {
		// 	return this.$store.getters.appNameWithVersion
		// }

	},
	methods: {
		handleInput (val) {
			this.inputValue = val
		}
	}
}
</script>
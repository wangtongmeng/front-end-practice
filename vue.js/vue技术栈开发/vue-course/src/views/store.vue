<template>
	<div>
		<a-input @input="handleInput" />
		<p>{{ inputValue }} -> lastLetter is {{ inputValueLastLetter }}</p>
		<!-- <a-show :content="inputValue" /> -->
		<!-- <p>appName: {{ appName }}, appNameWithVersion: {{ appNameWithVersion }}</p> -->
		<p>appName: {{ appName }}</p>
		<p>userName: {{ userName }}, firstLetter is: {{ firstLetter }}</p>
		<button @click="handleChangeAppName">修改appName</button>
		<p>{{ appVersion }}</p>
		<button @click="changeUserName">修改用户名</button>
		<button @click="registerModule">动态注册模块</button>
		<p v-for="(li, index) in todoList" :key="index">{{ li }}</p>
	</div>
</template>
<script>
import AInput from '_c/AInput.vue'
import AShow from '_c/AShow.vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { maxHeaderSize } from 'http';
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
		...mapState({
			appVersion: state => state.appVersion,
			// todoList: state => state.todo ? state.todo.todoList: []
			todoList: state => state.user.todo ? state.user.todo.todoList: []
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
		...mapMutations([
			'SET_APP_NAME'
		]),
		...mapMutations('user', [
			'SET_USER_NAME',
		]),
		...mapActions([
			'updateAppName'
		]),
		handleInput (val) {
			this.inputValue = val
		},
		handleChangeAppName () {
			// this.$store.commit('SET_APP_NAME', 'newAppName')
			// this.$store.commit('SET_APP_NAME', {
			// 	appName: 'newAppName'
			// })
			// 对象的写法
			// this.$store.commit({
			// 	type: 'SET_APP_NAME',
			// 	appName: 'newAppName'
			// })
			// this.SET_APP_NAME('newAppName')
			// this.SET_APP_NAME({ appName: 'newAppName' })
			// this.$store.commit('SET_APP_VERSION')
			this.updateAppName()
		},
		changeUserName () {
			// this.SET_USER_NAME('vue-course')
			this.$store.dispatch('updateAppName')
		},
		registerModule () {
			// this.$store.registerModule('todo', {
			this.$store.registerModule(['user', 'todo'], {
				state: {
					todoList: ['学习1', '学习2']
				}
			})
		}
	}
}
</script>
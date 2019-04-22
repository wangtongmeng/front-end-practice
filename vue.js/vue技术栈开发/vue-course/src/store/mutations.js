import vue from'vue'

const mutations = {
	SET_APP_NAME (state, params) {
		state.appName = params
		// state.appName = params.appName
	},
	SET_APP_VERSION (state) {
		vue.set(state, 'appVersion', 'v2.0')
	},
	SET_STATE_VALUE (state, value) {
		state.stateValue = value
	}
}
export default mutations
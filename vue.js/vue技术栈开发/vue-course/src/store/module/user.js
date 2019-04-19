const state = {
	userName: 'Lison'
}

const getters = {
	firstLetter: state => {
		return state.userName.substr(0, 1)
	}
}

const mutations = {
	//
}

const actions = {
	//
}

export default {
	// 模块使用命名空间，会让模块更加密闭，不会收到污染
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
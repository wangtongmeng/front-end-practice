import { login } from '@/api/user'
import { setToken } from '@/lib/util'

const state = {
	userName: 'Lison'
}

const getters = {
	firstLetter: state => {
		return state.userName.substr(0, 1)
	}
}

const mutations = {
	SET_USER_NAME (state, params) {
		state.userName = params
	}
}

const actions = {
	updateUserName ({ commit, state, rootState, dispatch}) {

	},
	login ( { commit }, { userName, password }) {
		return new Promise((resolve, reject) => {
			login({ userName, password }).then(res => {
				if (res.code === 200 && res.data.token){
					setToken(res.data.token)
					resolve()
				} else {
					reject(new Error('错误'))
				}
			}).catch(error => {
				reject(error)
			})
		})
	}
}

export default {
	// 模块使用命名空间，会让模块更加密闭，不会收到污染
	// namespaced: true,
	state,
	getters,
	mutations,
	actions
}
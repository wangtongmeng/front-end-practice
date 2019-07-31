import Vue from 'vue'
import Vuex from './myVuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state, n = 1) {
      state.count += n
    }
  },
  getters: {
    score(state) {
      return `共： ${state.count}`
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment' , 2)
      }, 1000)
    }
  }
})

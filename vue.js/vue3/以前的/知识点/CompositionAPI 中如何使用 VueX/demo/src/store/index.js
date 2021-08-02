import { createStore } from 'vuex'
export default createStore({
  state: { name: 'dell' },
  mutations: {
    changeName(state, str) {
      state.name = str;
    }
  },
  actions: {
    getData(store) {
      setTimeout(() => {
        store.commit('changeName', 'hello')
      }, 2000)
    }
  }
})

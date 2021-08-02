import { createStore } from 'vuex'
// VueX 数据管理框架
// VueX 创建了一个全局唯一的仓库，用来存放全局的数据
export default createStore({
  state: { name: 'dell' },
  // mutation 里面只允许写同步代码，不允许写异步代码
  // commit 和 mutation 做关联
  mutations: {
    change(state, str) {
      state.name = str;
    }
  },
  // dispatch 和 actions 做关联
  actions: {
    // change(store, str) {
    //   setTimeout(() => {
    //     store.commit('change', str)
    //   }, 2000)
    // }
  }
})

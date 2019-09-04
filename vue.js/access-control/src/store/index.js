import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { permission, user },
  // 全局定义 getters 便于访问
  getters: {
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes
  }
})

export default store

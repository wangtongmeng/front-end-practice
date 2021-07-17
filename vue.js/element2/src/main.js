import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入 vue-ele-form
import EleForm from 'vue-ele-form'

Vue.use(ElementUI) // 注册 element-ui
Vue.use(EleForm) // 注册 vue-ele-form

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

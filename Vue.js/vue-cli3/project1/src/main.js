import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
console.log(process.env); // development（在终端输出）
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

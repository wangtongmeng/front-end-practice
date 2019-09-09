import Vue from 'vue'
import App from './App.vue'

import router from './router'
// import router from './myRouter'

import store from './myStore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

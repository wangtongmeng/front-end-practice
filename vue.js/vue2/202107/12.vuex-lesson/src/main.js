import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false




new Vue({
  name:'root',
  store, // 目的是让所有组件都能共享到这个容器，从根组件中注入, 应用可以是多个实例的
  render: h => h(App)
}).$mount('#app')

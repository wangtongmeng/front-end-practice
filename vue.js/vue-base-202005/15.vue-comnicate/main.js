import Vue from 'vue'

import App from './App'
// 兄弟组件通信 eventBus
Vue.prototype.$bus = new Vue() // 每一个vue实例都具备 $on $emit $off 

new Vue({
  el: '#app',
  render: h => h(App)
})

// 面试题：子组件如何监听父组件的mounted事件

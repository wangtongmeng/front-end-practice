import Vue from 'vue'

import App from './App'
// 兄弟组件通信 eventBus
Vue.prototype.$bus = new Vue() // 每一个vue实例都具备 $on $emit $off 

new Vue({
  el: '#app',
  render: h => h(App)
})

// 面试题：子组件如何监听父组件的mounted事件? 通过eventBus可以
// 组件挂载 先挂载父组件 -> 渲染子组件 -> 子mounted -> 父mounted
// eventBus 可以任意组件间通信 只适合小规模的通信(大规模会导致事件不好维护 一呼百应)
// vuex

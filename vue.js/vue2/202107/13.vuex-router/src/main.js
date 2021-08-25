import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  name:'root',
  render: h => h(App)
}).$mount('#app')


// vue中路由模式有几种  (能根据不同的路径返回不同的资源) 访问不同的路径 返回不同的组件
// 早期实现跳转都是后端来跳转， spa应用不用像服务器发请求 可以直接进行跳转 （在不刷新页面的情况下可以切换路径）
// hash模式 路径后面带# hash模式 缺点就是丑(不会像服务器发送请求)， 服务器无法获取hash值，从而没法做seo优化 。 优点方便不需要服务端支持
// historyApi 默认不带 # , 有点漂亮，而且支持服务端渲染 可以做seo优化 需要服务端支持（如果访问的资源不存在，我们可以跳转到首页， 渲染首页内容，渲染的时候前端会取到路径渲染组件）
// memoryHistroy 不会发生路径变化 但是可以切换组件 （微前端中我们希望不显示子应用路径）
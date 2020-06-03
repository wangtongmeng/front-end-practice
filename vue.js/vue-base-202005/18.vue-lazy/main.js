// vue-lazyload 图片懒加载 v-lazy
import Vue from 'vue'
import App from './App'
// import VueLazyLoad from 'vue-lazyload'
import VueLazyLoad from './vue-lazyload/index'
import loading from './loading.jpg'

// use方法是一个全局的api 会调用VueLazyLoad的install
Vue.use(VueLazyLoad,{
  preLoad: 1.3, // 可见区域的1.3倍
  loading, // loading图
}) // use的默认调用就会执行VuelazyLoad的install方法

new Vue({
  el: '#app',
  render: h=>h(App)
})
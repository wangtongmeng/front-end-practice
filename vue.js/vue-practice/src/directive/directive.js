import Vue from 'vue'

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 自定义指令
// Vue.directive('pin', {
//   bind: function (el, binding, vnode) {
//     el.style.position = 'fixed'
//     var s = (binding.arg == 'left' ? 'left' : 'top')
//     el.style[s] = binding.value + 'px'
//   }
// })
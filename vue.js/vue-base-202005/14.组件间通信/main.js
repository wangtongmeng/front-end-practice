import Vue from 'vue'

import App from './App'
console.log(App) // 运行时，打印出来的对象，template已经被编译成render函数了

// 默认使用的是 runtime-only，所以这里不能使用template

// 向上派发事件 只要组件上绑定过此事件就会触发
Vue.prototype.$dispatch = function (eventName, componentName, value) {
  let parent = this.$parent
  while (parent) {
    // 触发指定组件的事件 而不是全部向上找
    if (parent.$options.name === componentName) {
      parent.$emit(eventName, value) // 没有绑定触发 不会有任何影响
      break
    }
    parent = parent.$parent
  }
}
Vue.prototype.$broadcast = function (eventName, componentName, value) {
  // 需要找到所有儿子组件进行触发
  let children = this.$children // 获取的是数组
  function broadcast(children) {
    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      if (componentName === child.$options.name) { // 找到了同名组件
        child.$emit(eventName, value)
        return
      } else {
        if(child.$children){
          broadcast(child.$children)
        }
      }
    }
  }
  broadcast(children)
}

new Vue({
  el: '#app', // 内部自带html模板
  // render(h){
  //   return h(App)
  // }
  render: h => h(App) // 官方用法
  // ...App // 因为App组件中也有render方法
})

// 为什么vue文件中可以写template
// 通过v-loader处理 => .vue 通过vue-template-compiler 来实现的
// 编译时 将template变成render函数的

// 使用快速原型工具 默认的配置就是vue-cli的配置
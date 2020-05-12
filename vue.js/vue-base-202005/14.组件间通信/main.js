import Vue from 'vue'

import App from './App'
console.log(App) // 运行时，打印出来的对象，template已经被编译成render函数了

// 默认使用的是 runtime-only，所以这里不能使用template
new Vue({
  el: '#app', // 内部自带html模板
  // render(h){
  //   return h(App)
  // }
  render: h=>h(App) // 官方用法
  // ...App // 因为App组件中也有render方法
})

// 为什么vue文件中可以写template
// 通过v-loader处理 => .vue 通过vue-template-compiler 来实现的
// 编译时 将template变成render函数的

// 使用快速原型工具 默认的配置就是vue-cli的配置
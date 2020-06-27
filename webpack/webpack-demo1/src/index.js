/* import sum from './sum'
import './index.css'
// 配置less-loader
// import './a.less'
console.log(sum(10, 5)) */
// import './icon/iconfont.css'
// import url from './img1.jpg'
// let img = new Image()
// img.src = url
// document.body.appendChild(img)

// let i = document.createElement('i')
// i.className = 'iconfont icon-bianji'
// document.body.appendChild(i)
// import $ from 'jquery'
// require('expose-loader?$!jquery')
// import $ from 'jquery'
// import A from './a'
// console.log('index', window.$)
// console.log('index', $)
// // console.log('index', jQuery)
// class Son {
//   constructor() {
//     this.a = 1
//   }
// }
// let s = new Son()
// console.log(s.a)

// let p = new Promise((resolve, reject) => {
//   console.log(1)
// })

// console.log('zhangsan'.includes('z'))

// // 草案语法
// @fn
// class Son1 {
//   a = 1
// }

// function fn(target) {
//   console.log(target)
//   target.b = 5
// }
// let s1 = new Son1()
// console.log(Son1.b, s1.a)

// let xhr = new XMLHttpRequest()
// xhr.open('get', '/api/user', true)
// xhr.onreadystatechange = function () {
//   console.log(xhr.response)
// }
// xhr.send()
// consoe.log(a)
// import './index.css'
// import minus from './test' // 副作用：test代码只在自己模块执行，在index模块没有使用

let btn = document.createElement('button')
let p = document.createElement('p')
btn.innerHTML = 'BUTTON'

// 懒加载是使用了后才去加载 import()
btn.addEventListener('click', function () {
  import(/*webpackChunkName:"c"*/"./test").then(({default: m})=>{
    // import("./test").then(({default: m})=>{
    p.innerHTML = m(20,10)
  })
}, false)
document.body.appendChild(btn)
document.body.appendChild(p)
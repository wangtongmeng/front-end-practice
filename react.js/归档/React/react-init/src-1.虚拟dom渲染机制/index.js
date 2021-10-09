// import React from 'react'
// react的核心：基础语法、属性、状态、生命周期、组件等
// import ReactDOM from 'react-dom'
// ReactDOM把虚拟dom渲染成真是的dom
import './index.less'
import { createElement, render } from './selfJSX'

render(createElement("div", {
  className: "box",
  style: {
    fontSize: '20px'
  },
  index: 0
}, "hello world"), document.getElementById('root'))

// ReactDOM.render(jsx语法,容器,渲染完触发的回调函数)

// ReactDOM.render(<div>hello world</div>, document.getElementById('root'))
// 使用<></>，可以少一层嵌套

// let str = 'zhangsan'
// let arr = [10, 20, 30]
// let boxStyle = {
//   fontSize: '20px'
// }

// ReactDOM.render(<>
//   <span className="box" style={boxStyle}>hello world</span>
//   <div>{str} {arr} {null} {undefined}</div>
//   {arr.map(item => {
//     return <a href="" key={item}>{item}</a>
//   })}
//   {str ? 'zhangsan' : 'lisi'}

// </>, document.getElementById('root'))

// ReactDOM.render(<div className='box' style={{
//   fontSize: '20px'
// }} index={0}>
//   hello world
//   <a></a>
// </div>, document.getElementById('root'))

// 1.基于babel-preset-react-app 把JSX变为React.createElement(...)
// 第一项：标签名(或者函数组件/类组件)
// 第二项：给标签设置的属性对象(一个都不设为null)
// 第三项或者更多项：标签的子节点(文本节点或者元素节点)
// =>所有的元素节点都会重新变成React.createElement
/*#__PURE__*/
// let JSXOBJ = React.createElement("div", {
//   className: "box",
//   style: {
//     fontSize: '20px'
//   },
//   index: 0
// }, "hello world", /*#__PURE__*/React.createElement("a", null));

// console.log(JSXOBJ);

// 2.执行React.createElement()创建JSX虚拟DOM对象
/* {
  type: 标签名或者组件
  props: {
    className: 'xxx' 我们传递的属性
    children: 子节点内容(特点：没有子节点则没有这个属性，否则是一个或者一个数组)
  }
} */

// 3.ReactDOM.render把虚拟DOM对象变成真实的DOM对象(渲染到页面中)

// 4.Vue-loader把tempalate语法解析为虚拟DOM对象(_vnode)
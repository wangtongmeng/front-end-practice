# react笔记
- React-MVC 和 Vue-MVVM 的本质区别
- react官方脚手架：create-react-app
- 两大框架中jsx语法的应用
- react底层核心：虚拟dom的渲染机制
- react中三大组件创建机制的区别


## React-MVC 和 Vue-MVVM 的本质区别

MVC VS MVVM：react单向数据绑定，数据影响视图model->view，反之只能通过合成事件来做；vue双向数据绑定model<->view，主要是针对表单元素的v-model，其他的也是单向数据流。
## react官方脚手架：create-react-app
```bash
npm i -g create-react-app 安装脚手架
create-react-app xxx(数字+小写字母) 基于脚手架创建项目
yarn start 启动项目 / build 打包项目
yarn eject 暴露webpackk配置项
```
> vscode右下角调成javascriptreact格式

### 删减代码
- /public中只留index.html文件
- /src中只留入口文件 index.js
```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
```js 
// index.js
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<div>
  hello world
</div>, document.getElementById('root'))
```
启动项目：进入项目目录，yarn start

### 修改脚手架配置
默认配置项并一定能满足项目需求，需要修改脚手架配置，yarn eject，暴露webpack配置项
```bash
yarn eject
yarn start
```
脚手架创建的项目默认会创建git仓库，防止 yarn eject导致项目无法恢复

yarn eject之后，执行yarn start/build可能提示少模块，可能是缺以下依赖：
- @babel/plugin-transform-react-jsx
- @babel/plugin-transform-react-jsx-source
- @babel/plugin-transform-react-jsx-self

eject之后多出来 /config /script，package.json中依赖项增多
### 添加less并使用
```bash
yarn add less less-loader
```

修改webpack配置项
```js
// config/webpack.config.js

// const cssRegex = /\.css$/;
const cssRegex = /\.(css|less)$/;
// const cssModuleRegex = /\.module\.css$/;
const cssModuleRegex = /\.module\.(css|less)$/;
//...
{
  test: cssRegex,
  exclude: cssModuleRegex,
  use: getStyleLoaders({
    importLoaders: 1,
    sourceMap: isEnvProduction && shouldUseSourceMap,
  }, "less-loader"),
  sideEffects: true,
},
{
  test: cssModuleRegex,
  use: getStyleLoaders({
    importLoaders: 1,
    sourceMap: isEnvProduction && shouldUseSourceMap,
    modules: {
      getLocalIdent: getCSSModuleLocalIdent,
    },
  }, "less-loader"),
},
```
在项目中使用less
1.创建less文件
```less
// /src/index.less
@C: red;
body {
  color: @C;
}
```
2.在入口文件中引入
```js
// /src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'

ReactDOM.render(<div>
  hello world
</div>, document.getElementById('root'))
```


## 两大框架中jsx语法的应用
- ReactDOM.render([jsx],[container],[callback])
- 一个根节点：<></>
- {}绑定动态数据值或者js表达式(对象和数组的特殊性)
- className 和 style
- 循环和判断

### ReactDOM.render([jsx],[container],[callback])
- react的核心：基础语法、属性、状态、生命周期、组件等
- ReactDOM把虚拟dom渲染成真是的dom
- ReactDOM.render(jsx语法,容器,渲染完触发的回调函数)
- react中的JSX(JAVASCRIPT AND XML[HTML])语法 相当于vue中的template语法
```js
// index.js
import React from 'react'
// react的核心：基础语法、属性、状态、生命周期、组件等
import ReactDOM from 'react-dom'
// ReactDOM把虚拟dom渲染成真是的dom
import './index.less'

// ReactDOM.render(jsx语法,容器,渲染完触发的回调函数)
ReactDOM.render(<div>hello world</div>, document.getElementById('root'))
```
### 一个根节点：<></>
最外层只能有一个根节点，如果不想增加层级可以使用空的节点<></>
```js
// ReactDOM.render(<div>hello world</div>, document.getElementById('root'))
ReactDOM.render(<>hello world</>, document.getElementById('root'))
```
### 其他react语法
- {}存放的是js表达式
  - 不能放入对象(除数组和几种特殊情况外：style必须设置成为对象才可以、虚拟DOM对象没问题)
- 样式类名 className
- style 必须设置成为对象才可以
- null、undefined代表空元素
- 循环和判断
## react底层核心：虚拟dom的渲染机制
- https:www.babeljs.cn/repl
- babel-preset-react-app / vue-loader
- React.createElement(type, props, children)
- ReactDOM.render(...)
虚拟DOM(JSX) => 真实DOM(渲染在页面)
### 过程
- 1.基于babel-preset-react-app 把JSX变为React.createElement(...)
  - 第一项：标签名(或者函数组件/类组件)
  - 第二项：给标签设置的属性对象(一个都不设为null)
  - 第三项或者更多项：标签的子节点(文本节点或者元素节点)
  - =>所有的元素节点都会重新变成React.createElement
- 2.执行React.createElement()创建JSX虚拟DOM对象
- 3.ReactDOM.render把虚拟DOM对象变成真实的DOM对象(渲染到页面中)
- 4.Vue-loader把tempalate语法解析为虚拟DOM对象(_vnode)

第一步：基于babel-preset-react-app 把JSX变为React.createElement(...)
```js
import React from 'react'
// react的核心：基础语法、属性、状态、生命周期、组件等
import ReactDOM from 'react-dom'
// ReactDOM把虚拟dom渲染成真是的dom
ReactDOM.render(<div className='box' style={{
  fontSize: '20px'
}} index={0}>
  hello world
  <a></a>
</div>, document.getElementById('root'))
```
=>
```js
React.createElement("div", {
  className: "box",
  style: {
    fontSize: '20px'
  },
  index: 0
}, "hello world", /*#__PURE__*/React.createElement("a", null));
```

第二步：执行React.createElement()创建JSX虚拟DOM对象
```js
{
  type: 标签名或者组件
  props: {
    className: 'xxx' 我们传递的属性
    children: 子节点内容(特点：没有子节点则没有这个属性，否则是一个或者一个数组)
  }
}
```
### 实现createElement和render函数
```js
// src/selfJSX.js
export function createElement(type, props, ...childs) {
  let obj = {}
  obj.type = type
  obj.props = props || {}
  if (childs.length > 0) {
    obj.props.children = childs.length === 1 ? childs[0] : childs
  }
  return obj
}

export function render(jsxOBJ, container, callback) {
  let { type, props } = jsxOBJ
  let element = document.createElement(type)
  for (let key in props) {
    if (!props.hasOwnProperty(key)) break
    // className
    if (key === 'className') {
      element.className = props['className']
      continue
    }
    // style
    if (key === 'style') {
      let sty = props['style']
      for (let attr in sty) {
        if (!sty.hasOwnProperty(attr)) break
        element['style'][attr] = sty[attr]
      }
      continue
    }
    // children
    if (key === 'children') {
      let children = props['children']
      children = Array.isArray(children) ? children : [children]
      children.forEach(item => {
        if (typeof item === 'string') {
          element.appendChild(document.createTextNode(item))
          return
        }
        // 递归
        render(item, element)
      })
      continue
    }
    element.setAttribute(key, props[key])
  }
  container.appendChild(element)
  callback && callback()
}
```
在入口文件引入
```js
// src/index.js
import { createElement, render } from './selfJSX'
// https://www.babeljs.cn/repl
// <div className='box' style={{
//   fontSize: '20px'
// }} index={0}>
//   hello world
// </div>
render(createElement("div", {
  className: "box",
  style: {
    fontSize: '20px'
  },
  index: 0
}, "hello world"), document.getElementById('root'))
```
## react中三大组件创建机制的区别
## react的组件化开发
- 函数式组件
  - 基本语法和特点
  - 属性只读
  - children的处理
- 类组件
  - 属性处理
  - 状态管理
  - refs
  - 生命周期
  - PureComponent
- react hooks
  - useState
  - useEffect
  - useRef
  - useReducer
  - ...
- 案例：投票管理
> 创建组件后缀名用jsx，这样语法自动式javascriptReact，不需要手动改了，jsx文件会通过webpack进行解析。

babel解析jsx时，遇到标签会解析成标签，遇到函数式组件，则会调用函数式组件，并传递属性。
### 函数式组件

函数式组件的特点
- 静态组件
- 每一次调用组件，都会重新渲染和计算，把渲染后的结果呈现在页面中
- 渲染完成后，呈现的内容不会改变，除非重新调用该组件
 */
```jsx
<div>
 	<News index="1"></News>
</div> 
=>
/*#__PURE__*/
React.createElement("div", null, /*#__PURE__*/React.createElement(News, {
  index: "1"
}));
```

```jsx
// src/News.jsx

// babel会把jsx元素转换成React.createElement(...)，所以需要引入React
import React from 'react'
/**
 * 创建一个函数，只要函数中返回一个新的JSX元素，则为函数式组件。
 * =>传递进来的属性是只读的
 * =>调用组件可以是单闭合也可以是双闭合
 * =>项目中使用双闭合方式，可以把一些子节点当做属性(children)传递给组件，在组件中可以把传递的这些节点放到指定的位置 => vue 中的slot插槽机制
 */
function News(props) {
  console.log(props);
  return <div>
    <h3>新闻资讯</h3>
    <ul>
      <li>新闻1</li>
      <li>新闻2</li>
      <li>新闻3</li>
      <li>{props.index}</li>
    </ul>
    {/* {props.children} */}
    {React.Children.map(props.children, item => {
      return <div>
        @@ {item}
      </div>
    })}
  </div>
}

export default News

// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'

import News from './News'
ReactDOM.render(<>
 <News index="1">
   双闭合调用组件
   <button>按钮</button>
   </News>
 <News index="1" />
</>, document.getElementById('root'))
```
### 类组件及其状态管理
- 属性处理
- 状态管理
- refs
- 生命周期
- PureComponent
#### 状态管理
类组件：创建一个类，让其继承React.Component或者React.PureComponent，此类被称为类组件
- 动态组件
- react中基于状态来管理动态组件(类组件)
- 设置初始状态值
- 修改状态：setState修改组件状态及重新渲染
```jsx
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import Clock from './Clock'

ReactDOM.render(<>
  <Clock m={20} /> 
</>, document.getElementById('root'))

// src/Clock.jsx
import React from 'react'
/**
 * 函数式组件的特点
 * =>静态组件
 * =>每一次调用组件，都会重新渲染和计算，把渲染后的结果呈现在页面中
 * =>渲染完成后，呈现的内容不会改变，除非重新调用该组件
 */
// export default function Clock(){
//   return <div>
//     {new Date().toLocaleString()}
//   </div>
// }

/**
 * 类组件：创建一个类，让其继承React.Component或者React.PureComponent，此类被称为类组件
 * =>动态组件
 * =>react中基于状态来管理动态组件(类组件)
 *  =>设置初始状态值
 *  =>修改状态：setState修改组件状态及重新渲染
 */
export default class Clock extends React.Component {
  // constructor： 调用组件，创建类的一个实例，首先执行constructor 把属性、上下文等信息传递进来
  constructor(props){
    // 创建初始状态
    this.state = {
      time: new Date().toLocaleString(),
      n: 0
    }
  }
  // render：渲染组件的内容
  render(){
    console.log(this.props);
    return <div>
      {this.state.time}
      ===========
      {this.state.n}
    </div>
  }
  // componentDidMount：生命周期 第一次渲染完 
  componentDidMount(){
    setInterval(()=>{
      // 能改变数据，但不能同时组件重新渲染数据
      // this.state.time = new Date().toLocaleString()
      // 源码：node_modules/react/cjs/react.development 搜索Component.prototype.setState
      // 修改状态，并且通知组件重新渲染
      // partialState 部分状态
      // callback 回调函数(状态修改，组件重新渲染后，触发的回调函数)
      this.setState({
        time: new Date().toLocaleString()
      })
    }, 1000)
  }
}

```
#### 属性操作
- 属性只读：属性和函数式组件一样包含普通属性和子节点属性children，同样只读
- 属性的获取：constructor中通过this.props获取props，需要写super(props)，相当于React.Component.call(this, props)，render中可直接通过this.props访问属性(constructor先执行后，react内部会把props挂载到实例上)
- 属性规则：默认值、类型校验
```jsx
// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import Clock from './Clock'

ReactDOM.render(<>
  <Clock m={20} x='pass' /> 
</>, document.getElementById('root'))
// src/Clock.jsx
import React from 'react'
// 安装的第三方插件，设置属性的规则
import PropTypes from 'prop-types'
export default class Clock extends React.Component {
  // 属性设置规则 https://github.com/facebook/prop-types
  static defaultProps = {
    m: 100
  }
  static propTypes = {
    m: PropTypes.number,
    x: PropTypes.string.isRequired
  }
  constructor(props){
    super(props) // React.Component.call(this, props)
    console.log(this.props); // 为了能在construtor中通过this.props访问属性，采用super(props) 源码react.development.js 427行
    // 属性和函数式组件一样包含普通属性和子节点属性children，同样只读
    // 只有constructor执行完，才会把props挂载到实例上 
    this.state = {
      time: new Date().toLocaleString(),
      n: 0
    }
  }
  render(){
    console.log(this.props);
    return <div>
      {this.state.time}
      ===========
      {this.state.n}
    </div>
  }
}

```
#### refs
- 受控组件：受状态管控的组件=>数据驱动视图渲染
- 非受控组件：不受状态管控的组件(直接操作DOM => ref)
```jsx
// Input.jsx 渲染后自动获取焦点
import React from 'react'

export default class Clock extends React.Component {

  render() {
    return <div>
      {/* 方式一 */}
      {/* <input type="text" ref='inpBox' /> */}
      {/* 方式二(很多人喜欢) */}
      {/* <input type="text" ref={element => {
        // element：当前的元素对象
        this.INP = element
      }} /> */}
      {/* 方式二简化 */}
      <input type="text" ref={x => this.INP = x} />
    </div>
  }
  componentDidMount() {
    // console.log(this.refs); // {inpBox: input}
    {/* 方式一 */ }
    // this.refs.inpBox.focus()
    {/* 方式二 */ }
    this.INP.focus()
  }
}

```
#### 生命周期
========第一次调用组件渲染的周期流程
- 1.给属性设置默认值(设置默认规则)
- 2.constructor
  - =>设置初始的状态等
- 3.componentWillMount 第一次挂载之前
  -  =>向服务器发送数据请求
- 4.render 渲染
- 5.componentDidMount 第一次挂在之后
  - =>把虚拟DOM转换为真实DOM了，我们可以获取DOM元素进行操作

=======当组件状态发生改变 setState
- 1.shouldComponentUpdate 是否允许当前组件重新渲染(返回true则继续重新渲染，返回false则停止重新渲染)
- 2.componentWIllUpdate 重新渲染之前
- 3.render重新渲染
- 4.componentWillUpdate 重新渲染之后

=======当组件属性发生改变：父组件重新传递最新的属性信息
- 1.componentWillReceiveProps 在接收最新的属性之前
- 2.shouldComponentUpdate
- ...

componentWillUnmount 卸载组件之前

```jsx
import React from 'react'

//   constructor(props){
//     super(props)
//     console.log('constructor');
//     this.state = {
//       data: [],
//       n: 0
//     }

//   }
//   componentWillMount(){
//     console.log('componentWillMount');
//     setTimeout(()=>{
//       this.setState({
//         data: [100,200]
//       })
//     })
//   }

//   render(){
//     console.log('render');
//     let { data, n } = this.state
//     return <div>
//       {data}====={n}
//       <button onClick={()=>{
//         this.forceUpdate()
//       }}>强制更新</button>
//     </div>
//   }
//   componentDidMount(){
//     console.log('componentDidMount');
//   }

//   shouldComponentUpdate(nextProps, nextState){
//     console.log('shouldComponentUpdate', nextProps, nextState);
//     // nextProps nextState 最新要修改的属性和状态
//     // this.state / this.props 修改之前的
//     // this.forceUpdate() 不会执行这个周期函数，会强制更新当前组件
//     return true
//   }

//   componentWillUpdate(){
//     console.log('componentWillUpdate');
//   }
//   componentDidUpdate(){
//     console.log('componentDidUpdate');
//   }

// }

export default class Clock extends React.PureComponent {
  // export default class Clock extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      n: 0,
      x: [10]
    }

  }
  render(){
    console.log('render');
    let { n, x } = this.state
    return <div>
      {n} ========== {x}
      {/* 执行函数保持this，方式1 */}
      {/* <button onClick={this.handle.bind(this)}>+</button> */}
      {/* 执行函数保持this，方式2 */}
      <button onClick={this.handle}>+</button>
    </div>
  }
  // PureComponent相对于Component来说，内部给组件加了shouldComponentUpdate：把属性和状态进行"浅对比"，以此优化性能(自己设置了shouldComponentUpdate，以自己设置的为主)
  // shouldComponentUpdate(nextProps, nextState){
  //   // 拿当前的状态和最新修改的状态进行对比(浅对比)，如果一样则不渲染，不一样才进行渲染
  //   if (this.state.n === nextState.n) {
  //     return false
  //   }
  //   return true
  // }
  // 执行函数保持this，方式2
  handle = ev => {
    // console.log(this, ev);
    let arr = this.state.x
    arr.push(30)
    console.log(arr);
    this.setState({
      // 不管状态是否改变，都会控制render重新渲染
      // n: this.state.n + 1
      // x: arr // PureComponent浅比较，堆内存地址没变，所以不更新
      x: [...arr]
    })
  }
  //  执行函数保持this，方式1
  // handle(ev){
  //   // this是undefined(react中的事件是合成事件=>所有的事件都是进行事件代理的，而且事件对象也是合成的)
  //   ev.persist() // 把合成事件对象中的值暴露出来
  //   console.log(this, ev, ev.clientX);
  // }
}

```
#### setState中的同步异步

 setState本身在生命周期函数或者在合成事件中执行时异步的
 - =>保证react本身生命周期函数执行的顺序不紊乱
 - =>保证其实现渲染队列的机制 可以合并setState统一渲染

 在原生的事件绑定中和其他异步操作中的setState是同步的
 - =>没有渲染队列效果了

异步的情况
 ```jsx
 import React from 'react'

export default class Test1 extends React.Component {
  // this.state = x
  state = {
    n: 0,
    m: 0
  }
  render() {
    console.log('render');
    return <div>
      {this.state.n} ========= {this.state.m}
      <button onClick={this.handle}>+</button>
    </div>
  }
  componentDidMount() {
    this.setState({
      n: this.state.n + 1
    })
    console.log('ok')
  }
  handle = () => {
    this.setState({
      n: 10
    })
    this.setState({
      m: 20
    })
    this.setState({
      n: 30
    }, () => {
      // 本次更新完成后触发执行
    })
    console.log('ok');
  }
}
 ```

 同步的情况
 ```jsx
 import React from 'react'

export default class Test1 extends React.Component {
  // this.state = x
  state = {
    n: 0,
    m: 0
  }
  render() {
    console.log('render');
    return <div>
      {this.state.n} ========= {this.state.m}
      <button onClick={this.handle}>+</button>
      <button ref={x=>this.btn = x}>+</button>
    </div>
  }
  componentDidMount(){
    this.btn.addEventListener('click', ()=>{
      this.setState({
        n: 10
      })
      console.log('OK');
    })
  }
  handle = () => {
    setTimeout(()=>{
      this.setState({
        n: 10
      })
      this.setState({
        n: 20
      })
      console.log('OK');
    },1000)
  }
}
 ```

 ### react hooks
 - useState
 - useEffect
 - useRef
 - useReducer
 - ...
 ## redux公共状态管理

- 组件信息传递的方式
  - 属性传递
  - 上下文传递(createContext)
  - 发布订阅
- redux的基础应用和原理
- react-redux的基础应用和原理
- redux中间件
- antd
- 案例：TASK OA

## 路由管控

- hash路由和browser路由的原理
- react-router-dom的基础操作
  - 路由构建 
  - 路由跳转
  - 参数传递
  - withRouter
- 权限校验
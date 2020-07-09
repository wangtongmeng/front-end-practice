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

## react中三大组件创建机制的区别
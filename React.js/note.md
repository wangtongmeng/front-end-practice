# react笔记
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



## 两大框架中jsx语法的应用
## react底层核心：虚拟dom的渲染机制
## react中三大组件创建机制的区别
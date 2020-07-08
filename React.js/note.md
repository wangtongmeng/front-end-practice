# react笔记
## vue和react的区别
MVC VS MVVM：react单向数据绑定，数据影响视图；vue双向数据绑定，主要是针对表单元素的v-model，其他的也是单向数据流。
## react官方脚手架：create-react-app
```bash
npm i -g create-react-app 安装脚手架
create-react-app xxx(数字+小写字母) 基于脚手架创建项目
yarn start 启动项目 / build 打包项目
yarn eject 暴露webpackk配置项
```
> vscode右下角调成javascriptreact格式
初始化删减版本

默认配置项并一定能满足项目需求，需要修改脚手架配置，yarn eject
  eject安装之后会少安装依赖
  - @babel/plugin-transform-react-jsx
  - @babel/plugin-transform-react-jsx-source
  - @babel/plugin-transform-react-jsx-self

脚手架创建的项目默认会创建git仓库，防止 yarn eject导致项目无法恢复
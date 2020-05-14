## 安装vue-cli
```bash
npm install @vue/cli -g
```

## 快速原型工具（可以帮我们直接解析.vue文件）
在当前项目目录，使用vue serve命令，默认找到main.js作为项目入口文件
```bash
npm install @vue/cli-service-global -g
```
## 传递方法
- props + emit / 同步数据 v-model/.sync
- provide、inject 但是会造成单向数据流混乱，子组件不要直接去改祖先数据，而是通过祖先组件提供的方法去改 自己实现工具库的话 需要采用这个方式
- $parent $children 当前组件的父子 可以直接触发儿子的事件或者父亲的事件
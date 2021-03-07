npm install tpescript -g --force




npm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D

rollup 打包的
typescript 编译ts文件的
rollup-plugin-typescript2 让rollup识别ts
@rollup/plugin-node-resolve 支持第三方包，通过node的方式解析包
rollup-plugin-serve 服务


rollup天生支持treeshaking

最后引入脚本 <script src="/dist/bundle.js"></script>

```js
"scripts": {
    "dev": "rollup -cw" // 使用配置文件 并观测文件变化
  },
```
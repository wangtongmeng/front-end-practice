# Node.js 第 4 天课堂笔记

## 知识点

-   Expressss
-   基于文件做一套 CRUD

## 复习

-   jQuery 的 each 和 原生的 JavaScript 方法 forEach
-   301 和 302 的区别
-   模块中导出单个成员和多个成员的方式
    -   `module.exports = xxx`
    -   通过多次 `exports.xxx = xxx`
    -   导出多个也可以：`module.exports = {多个成员}`
-   module.exports 和 exports 的区别
    -   exports 知识 module.exports 的一个引用，目的只是为了简化写法
    -   每个模块最终 return 的是 module.exports
-   require 方法加载规则
    -   优先从缓存加载
    -   核心模块
    -   路径形式的模块
        -   `./xxx`
        -   `../xxx`
        -   `/xxx` / 在这里表示磁盘跟路径
        -   `c:/xxx`
        *   第三方模块
        -   第三方模块的标识就是第三方模块的名称（不可能有第三方模块和核心模块的名字一致）
        -   npm
            -   开发人员可以把写好的框架、库发布到 npm 上
            -   使用者在使用的时候可以很方便的通过 npm 来下载
        -   使用方式： `var 名字 = require('npm install 的那个包名字')`
        -   node_modules
        -   node_modules/express
        -   node_modules/express/package.json
        -   node_modules/express/package.json main
        -   如果 packge.json 或 package.json main 不成立，则查找备选项：index.js
        -   如果以上条件都不成立，则继续进入上级目录中的 node_modules 按照上面的规则继续查找
        -   如果直到当前文件模块所属磁盘根目录都找不到，最后报错 `can not find module xxx`
-   npm 常用命令
    -   install
    -   uninstall
-   Express 基本使用

*   使用 Express 改造留言本案例

## 上午总结

-   文件路径中的 `/` 和模块标识中的 `/`
-   nodemon
-   Express
    -   art-template 模板引擎的配置
    -   body-parser 解析表单 POST 请求体
-   详解 express 静态服务 API

*   app.use('/public/', express.static('./public'))

-   crud

## 下午总结

## 目标

-   文件路径中的 `/` 和模块标识中的 `/`
-   Express 中配置使用 art-template 模板引擎
-   Express 中配置使用 body-parser
-   Express 中配置处理静态资源
-   CRUD 案例中单独提取路由模块

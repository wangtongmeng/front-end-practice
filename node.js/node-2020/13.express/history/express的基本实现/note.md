## Koa和Express的区别
- express 内部是通过回调函数来实现的，koa es6语法 内部使用了promise
- 都是基于http模块进行封装的
- Koa 内部比较小巧(use listen) koa-static koa-router koa-view，express内部包含了很多中间件
- 都可以按照自己的规则 通过 express koa 实现mvc(没有约束) 同一拨人开发的
- Koa 底层使用了上下文对象，express 内部使用的就是原生req和res进行了封装
- Koa 和 express 都有中间件的概念 express 内部不支持promise
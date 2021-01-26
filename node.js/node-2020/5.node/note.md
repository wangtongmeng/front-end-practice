## 异步
- 高阶函数 AOP 装饰模式（熟练使用回调的方式）
- 发布订阅 观察者模式 区分这两种模式
- promise(手写程度) all race finally allSettled promise链中断(返回空的promise)，让当前promise变成失败可以借助race的包裹 (优点和缺点)
- generator (生成器、迭代器) - 指针+switch case来实现
- co库 执行generator 异步迭代(递归迭代)
- async + await 语法糖

## 事件环(事件触发线程)
- 运行时主线程是单线程的 (可以开辟其他现成)
- 浏览器内核 运行js ui渲染 浏览器事件循环图
- 宏任务(宿主环境提供的) 微任务(语言本身提供的)
- 先执行执行栈中的代码 -> 清空所有微任务 -> 重新渲染页面(不是每次都执行) -> 宏任务队列中拿出一个放到执行栈中执行 无线循环
- MessageChannel setTimeout i/o 脚本 ui requestFrameAnimation ajax...
- Promise.then MutationObserver nextTick...

## Node概念
- 适合i/o密集型 异步非阻塞，通过事件通知 libuv 用多线程来模拟异步(不适合做cpu密集型)
- 全局变量 require/exports/module/__dirname/__filename 不是全局的但是可以直接访问
- process env/argv/cwd()/nextTick
// 事件环（代码执行顺序）

// 计算机里调度任务和分配任务的单位是进程，进程中包含很多线程
// 浏览器是一个多进程模型
//  每个页签都是一个进程 
//  主进程 => 用户界面
//  渲染进程 => 浏览器内核 js、ui渲染
//  处理请求 网络进程 绘图进程 GPU渲染进程 插件独立的进程

// 渲染进程 - 线程
// js的“主”线程是单线程的 ui渲染和js共用线程 互斥的 从上到下执行
// 事件、定时器、ajax 都包含在进程中
// webworker 工作线程和主线程是不平等的（主线程能操作dom）

// 所有的异步方法 宏任务（宿主环境提供的异步方法都是宏任务）、微任务（语言本身提供的是微任务 promise.then MutationObserver）

// 整个微任务和宏任务的调度顺序是怎样的？
// 默认先执行宏任务（script脚本），会清空所有的微任务（全部执行完毕），微任务执行后开始页面渲染（不是每次都渲染），取出一个宏任务执行，执行过程中可能再次产生宏任务、微任务。。。不停地循环

// 常见的宏任务微任务
// 常见的宏任务 setTimeout setImmediate(IE支持)性能会高于setTimeout messageChannel requestFramAnimation script脚本渲染 ui渲染 i/o 事件 ajax...
// 常见的微任务(浏览器 mutationObserver promise.then，node process.nextTick (queueMicrotask基于promise的))


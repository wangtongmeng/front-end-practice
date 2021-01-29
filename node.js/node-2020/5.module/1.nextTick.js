/**
 * node事件环
 */
// 1.node 基于v8引擎的 libuv库提供的(非阻塞i/o)
// 同步代码执行完毕后 再执行异步代码

// node中也有一个自己的事件环 包含了i/o操作.. 从node10以上都和浏览器的执行顺序一致
// 事件轮询图 https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/
// -> timers setInterval 定时器
// -> poll 阶段 轮询 会在特定的时候进行阻塞 执行i/o回调
// -> check setImmediate (每个宏任务执行完毕后都会清空微任务)

// setTimeout(() => {
//     console.log('timeout')
// }, 0);
// Promise.resolve().then(()=>{
//     console.log('promise')
// })
// process.nextTick(()=>{ // 当前执行栈中执行完毕后 立即调用的 (可以认为nextTick单独有一个队列，执行完再执行其他微任务)
//     console.log('nextTick')
// })


// 根据性能影响 执行的顺序会有所不同
// setTimeout(() => {
//     console.log('timeout') // 执行栈中代码执行完毕后，先清空nextTick和其他微任务后，如果time到时间了会把回调放入timers队列，这里的0实际还是会有几毫秒延迟，所以不一定会放入
// }, 0);

// setImmediate(()=>{
//     console.log('immediate') // 轮询达到poll后，如果check中有setImmediate回调就会走check，如果没有则会等一会儿重新轮询
// })


// const fs = require('fs')
// // poll之后才会走check
// fs.readFile('./note.md', function () { // I/O 轮询时会执行i/o回调 如果没有定义setImmediate会等待剩下的i/o完成 或者定时器到达时间
//     setTimeout(() => {
//         console.log('timeout') 
//     }, 0);
//     setImmediate(()=>{ // 不是特别重要的任务 可以放到setImmediate
//         console.log('immediate')
//     })
    
// })


// setTimeout(() => {
//     console.log('timeout1')
//     process.nextTick(()=>{
//         console.log('nextTick1')
//     })
// }, 0);
// setTimeout(() => {
//     console.log('timeout2')
//     process.nextTick(()=>{
//         console.log('nextTick2')
//     })
// }, 0);
// timeout1 nextTick1 timeout2 nextTick2

// timer和setImmediate 调用时机不同
// process.nextTick 当前同步代码执行完毕后 立即调用的 微任务
// i/o 文件读写自动回放到poll阶段中处理
// setImmediate 用的非常少

// poll里面 有很多回调 node中有执行的最大个数，超过最大个数会被延迟到下一轮循环执行

// node中的微任务 promise.then / nextTick
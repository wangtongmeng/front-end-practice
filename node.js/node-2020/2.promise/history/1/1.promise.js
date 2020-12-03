// promise 目前只有ie版本可能不支持

// 1.用法 2.生态 3.原理

// 1.解决了哪些问题 
//   1）异步并发问题（Promise.all）
//   2）解决回调地狱问题（异步串行，上一个的输出是下一个的输入）=> 链式操作
//   3）错误处理非常方便 catch方法
// 2.缺陷 依旧是基于回调函数的 => generator + async + await

// https://promisesaplus.com/ 

// 1.Promise是一个类，类中的构造函数需要传入一个executor 默认会执行
// 2.executor 中有两个参数 分别是 resolve, reject

// 3.默认创建一个promise 状态就是 pending fulfilled rejected promise有三个状态
// 4.调用成功和失败时 需要传递一个成功的原因和失败的原因
// 5.如果已经成功了就不能失败了
// 6.每个promise实例都有一个then方法
// 7.如果抛出异常安装失败来处理
const Promise = require('./promise.js')
let p = new Promise((resolve, reject) => {
    console.log(1)
    throw new Error('')
    reject('失败了')
    resolve('成功')
})
p.then(data => { // 成功的回调
console.log('success', data)
}, (reason) => { // 失败的回调
    console.log('fail', reason)
})
console.log(2)
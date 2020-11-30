// promise 目前只有ie版本可能不支持

// 1.用法 2.生态 3.原理

// 1.解决了哪些问题 
//   1）异步并发问题（Promise.all）
//   2）解决回调地狱问题（异步串行，上一个的输出是下一个的输入）=> 链式操作
//   3）错误处理非常方便 catch方法
// 2.缺陷 依旧是基于回调函数的 => generator + async + await

// https://promisesaplus.com/ 

// Promise是一个类，类中的构造函数需要传入一个executor 默认会执行
// executor 中有两个参数 分别是 resolve, reject
let p = new Promise((resolve, reject) => {
    console.log(1)
})
console.log(2)
console.log(p)
/* 
defer延迟对象的使用 减少套用
staic方法实现 Promise.resolve() Promise.reject() catch
*/
// const Promise = require('./promise')
// const fs = require('fs')
// function read(...args) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(...args, function (err, data) {
//             if (err) return reject(err)
//             resolve(data)
//         })
//     })
// }


// function read(...args) {
//     // $.deferred Q.defer() 减少套用
//     let dfd = Promise.defer()
//     fs.readFile(...args, function (err, data) {
//         if (err) return dfd.reject(err)
//         dfd.resolve(data)
//     })
//     return dfd.promise
// }

// read('./name.txt', 'utf8').then(data => {
//     console.log(data)
// })

// static 方法来实现

const Promise = require('./promise')

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000);
})

// Promise.resolve 可以等待一个promise执行完毕
// Promise.resolve(p).then(data => {
//     console.log(data)
// })

// reject没有等待效果
Promise.reject(p).catch(data => {
    console.log(data)
})
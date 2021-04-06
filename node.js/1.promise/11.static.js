let Promise = require('./source/3.promise')


// Promise.resolve() 这个方法  会创造一个成功的promise
// Promise.resolve(1).then(value => {
//     console.log(value)
// })
// Promise.resolve(new Promise((resolve,reject) => {
//     setTimeout(() => {
//         // resolve(1)
//         reject(1)
//     }, 1000);
// })).then(value => {
//     console.log('success', value)
// }).catch(err => {
//     console.log('err', err)
// })

// Promise.reject() 这个方法  会创造一个失败的promise
// Promise.reject(1).then((data) => {
//     console.log(data)
// }).catch(err => { // catch方法就是没有成功的失败
//     console.log(err, 'err')
// });

// Promise.reject(new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(200);
//     }, 1000);
// })).then((data) => {
//     console.log(data)
// }).catch(err => { // catch方法就是没有成功的失败
//     console.log(err, 'err')
// });


// Promise.all 并发请求 全部成功才成功，一个失败则失败
// 多个promise全部完成后获取结果，但是其中的某个如果失败了 那么这个promise就失败了
// 同步（同一时刻拿到） 多个异步请求的结果
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    }, 2000);
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    }, 1000);
})
Promise.all([p1, p2, 1, 2, 3]).then(data => {
    console.log(data)
}).catch(err => {
    console.log('err', err)
})

// Promise.race 有一个成功或失败就采用他的结果  应用：超时处理
// Promise.prototype.finally 最终的 不是 try catch finally


Promise.prototype.finally = function (callback) {
    return this.then(data => {
        // 让函数执行 内部会调用方法，如果方法是promise 需要等待他完成
        return Promise.resolve(callback()).then(() => data)
    }, err => {
        return Promise.resolve(callback()).then(() => {
            throw err
        })
    })
}

// Promise.resolve(123).finally(() => { // 做中间处理的 这里传入的函数 无论如何都会执行
//     console.log('finally')
//     return new Promise((resolve, reject) => { 
//         setTimeout(() => {
//             // resolve('ok') // 如果promise结果是成功的，不影响下一个then的结果，但是有等待效果，5000后把上一个then的结果给下一个then
//             reject('ok') // promise结果是异常的， 5s后会走到下一个then的失败处理
//         }, 5000);
//     })
// }).then(data => {
//     console.log('s: ' +data)
// }, err => {
//     console.log('e: ' + err)
// })

Promise.reject(123).finally(() => { // 做中间处理的 这里传入的函数 无论如何都会执行
    console.log('finally')
    return new Promise((resolve, reject) => { 
        setTimeout(() => {
            // resolve('ok') // 如果promise结果是成功的，不影响下一个then的结果，但是有等待效果，5000后把上一个then的结果给下一个then
            reject('ok') // promise结果是异常的， 5s后会走到下一个then的失败处理
        }, 5000);
    })
}).then(data => {
    console.log('s: ' +data)
}, err => {
    console.log('e: ' + err)
})

// Promise.reject(123).finally(() => {
//     console.log('finally')
// }).then(data => {
//     console.log(data)
// }, err => {
//     console.log('err', err)
// })
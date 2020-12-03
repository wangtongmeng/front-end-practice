// Promise.prototype.finally 最终的 不是 try catch finally

const { reject } = require("./history/6/promise")

Promise.resolve(123).finally(() => { // 做中间处理的 这里传入的函数 无论如何都会执行
    console.log('finally')
}).then(data => {
    console.log(data)
})

Promise.reject(123).finally(() => {
    console.log('finally')
}).then(data => {
    console.log(data)
}, err => {
    console.log('err', err)
})
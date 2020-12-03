const Promise = require('./promise.js')
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
        reject('失败')
    }, 1000)
})
p.then(data => { // 成功的回调
    console.log('success', data)
}, (reason) => { // 失败的回调
    console.log('fail', reason)
})
p.then(data => { // 成功的回调
    console.log('success', data)
}, (reason) => { // 失败的回调
    console.log('fail', reason)
})
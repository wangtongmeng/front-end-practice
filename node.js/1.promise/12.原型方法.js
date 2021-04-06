// Promise.prototype.finally 无论如何都会执行，但是可以继续向下执行


let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('成功')
        reject('失败')
    }, 3000);
}).finally(() => { // = then  无论状态如何都会执行
    console.log('finally') // 3s
    return new Promise((resolve, reject) => { // 不会使用promise的成功结果
        setTimeout(() => {
            resolve(1000)
        }, 1000);
    })
}).then(data => {
    console.log(data) // 成功  4s
}).catch(e => {
    console.log('catch', e) // 失败 4s
})
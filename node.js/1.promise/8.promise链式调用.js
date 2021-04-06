// promise的特点 解决了什么问题 1.链式调用解决嵌套回调的问题 和 2.同步并发问题 3. 多个异步处理错误问题

// 1.链式调用解决嵌套回调的问题
// 1.promise的链式调用  当调用then方法后会返回一个新的promise
// 情况1： then中方法返回的是一个（普通值 不是promise）的情况, 会作为外层下一次then的成功结果
// 情况2： then中方法 执行出错 会走到外层下一次then的失败结果
// 清空3： 如果then中方法返回的是一个promise对象， 此时会根据promise的结果来处理是走成功还是失败 （传入的是成功或者失败的内容）
// 无论上一次then走是成功还是失败，只要返回的是普通值 都会执行下一次then的成功

// 总结： 如果返回一个普通值 （除了promise） 就会传递给下一个then的成功，如果返回一个失败的promise或者抛出异常，会走下一个then的失败
let Promise = require('./source/3.promise')

// const fs = require('fs')
// let p = new Promise((resolve,reject)=>{
//     resolve(1)
// }).then(data=> {
//     return new Promise((resolve,reject)=>{ // x 可能是一个promise
//         setTimeout(() => {
//             resolve('ok')
//         }, 1000);
//     })
// }, err => {
//     return 111
// })

// p.then(data => {
//     console.log(data) //一秒后 ok
// }, err => {
//     console.log('error', err)
// })


const fs = require('fs')
function readFile(filePath,encoding) {
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath,encoding, (err,data)=>{ // nodeApi 转化成promise
            if (err) return reject(err)
            resolve(data)
        })
    })
}

// readFile('./a.txt1', 'utf8').then(value=>{
readFile('./a.txt', 'utf8').then(value=>{
    return readFile(value, 'utf8')
    // return readFile(value+'1', 'utf8')
},err=>{
    return new Error() // 这里返回一个错误对象，不是抛出错误，所有走下一个then的成功回调
})
.then(data => {
    console.log('success', data)
}, () => {
    console.log('fail')
})

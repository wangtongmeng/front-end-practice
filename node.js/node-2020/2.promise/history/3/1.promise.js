// 链式调用
// 1.获取name文件读取结果 把结果继续读取

const fs = require('fs')

// // 超过三层阅读性很差
// fs.readFile('./name.txt', 'utf8', (err, data) => {
//     if (err) {

//     }
//     fs.readFile(data, 'utf8', (err, data) => {
//         if (err) {

//         }
//         console.log(data)
//     })
// })

function read(...args) {
    return new Promise((resolve, reject) => {
        // fs.readFile(...args, function (err, data) {
        //     if (err) return reject(err)
        //     resolve(data)
        // })
        resolve()
        // reject()
    })
}

// promise的链式调用问题
// 1.如果then方法中（成功或者失败）返回的不是一个promise，会将这个值传递给外层下一次then的成功结果
// 2.如果执行then方法中出错了 抛出异常 会走到下一个then的失败
// 3.如果返回的是一个promise 会用这个promise的结果作为下一次then的成功或失败

// 什么时候会走到失败？1.出错会失败 2.返回的promise会出错

// catch 就是then的别名 没有成功只有失败（找最近的优先处理，处理不了找下一层）
// then方法为什么可以链式调用 每次调用then都返回一个新的promise
// read('./name.txt', 'utf8').then(data => {
//     // 1. console.log(data)
//     // 2. throw new Error('err')

//     // 3
//     // return read(data, 'utf8')
//     return read(data+'1', 'utf8')
// }, err => {
//     console.log(err)
// }).then(data => {
//     console.log('s:' + data)
// },err=>{
//     console.log('f:' + err)
// })


// 就近处理错误
// read('./nam111e.txt', 'utf8').then(data => {
//     return read(data+'1', 'utf8')
// }, err => {
//     console.log(err) // 走这，返回undefined，走下一个then的成功
// }).then(data => {
//     console.log('s:' + data)
// },err=>{
//     console.log('f:' + err)
// }).catch(err => { // 没走catch
//     console.log(err)
// })

// read('./nam111e.txt', 'utf8').then(data => {
//     return read(data+'1', 'utf8')
// }).then(data => {
//     console.log('s:' + data)
// },err=>{
//     console.log('f:' + err) // 第一个then没有错误处理，回去下一个then里找错误处理
// }).catch(err => { // 没走catch
//     console.log(err)
// })

// read('./nam111e.txt', 'utf8').then(data => {
//     return read(data+'1', 'utf8')
// }).then(data => {
//     console.log('s:' + data)
// }).catch(err => { // 第一个then没有错误处理，回去下一个then里找错误处理，catch 就是then的别名 没有成功
//     console.log(err)
// }).then(data => {
//     console.log(data) // undefined
// })

const Promise = require('./promise')
let p = read('./name.txt','utf8')

let promise2 = p.then(data=>{
    throw new Error()
    return 100
}, err => {
    return 200
})
promise2.then(data=>{
    console.log(data)
},err => {
    console.log('err', err)
})
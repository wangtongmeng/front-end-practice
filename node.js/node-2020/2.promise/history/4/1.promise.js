// 1.获取name文件读取结果 把结果继续读取

const fs = require('fs')
// const Promise = require('./promise')

function read(...args) {
    return new Promise((resolve, reject) => {
        // fs.readFile(...args, function (err, data) {
        //     if (err) return reject(err)
        //     resolve(data)
        // })
        resolve('ok')
    })
}
// promise的链式调用问题
// 1.如果then方法中（成功或失败） 返回的不是一个promise，会将这个值传递给外层下一次then的成功结果
// 2.如果执行then方法中的方法出错了 抛出异常 则会走到下一次then的失败中
// 3.如果返回的是一个promise 会用这个promise的结果作为下一次then的成功或失败

// 1.什么会走下一次then的失败？ 1.出错会失败 2.返回的promise会出错
// catch 就是then的别名 没有成功只有失败 （找最近的优先处理，处理不了找下一层）
// then方法为什么可以链式调用 每次调用then都返回一个新的promise

const Promise = require('./promise')
let p = read('./name.txt', 'utf8')

// 判断返回值 和 promise2的关系
let promise2 = p.then(data => {
    // return promise2 // 超出类型错误，我等着我完成，我又没动所以就卡死了
    // return new Promise((resolve, reject) => {
    //     resolve(new Promise((resolve, reject) => {
    //         resolve(new Promise((resolve, reject) => {
    //             resolve(new Promise((resolve, reject) => {
    //                 resolve(100)
    //             }))
    //         }))
    //     }))
    // })
}, err => {
    return 200
})
promise2.then(data => {
    console.log('then2', data)
}, err => {
    console.log('err', err)
})


// read('./name.txt', 'utf8').then(data => {
// read('./name.txt1', 'utf8').then(data => {
//     // return 100
//     // throw new Error('err')
//     // return read('./age.txt1', 'utf8')
//     return read('./age.txt', 'utf8')
// }, err => {
//     console.log('e1' + err)
// }).then(data => {
//     console.log('s1: ' + data)
// }, err => {
//     console.log('e2: ' + err)
// })
// // read('./name.txt', 'utf8').then(data => {
//     // return 100
//     // throw new Error('err')
//     return read('./age.txt1', 'utf8')
//     // return read('./age.txt', 'utf8')
// }).then(data => {
//     console.log('s: ' + data)
// }).catch(err => {
//     console.log('catch: ' + err)
// }).then(data => {
//     console.log('catch之后的then：' + data)
// })

// fs.readFile('./name.txt', 'utf8', (err, data) => {
//     console.log(data) 
//     fs.readFile('./age.txt', 'utf8', (err, data) => {
//         console.log(data)
//     })
// })
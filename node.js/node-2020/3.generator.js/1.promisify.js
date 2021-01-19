/**
 * 把一些异步的api 转化成了promise的方式（只针对node 写法）
 */

/* fs也内置了promise写法的api */
// const fs = require('fs').promises

// // './note.md' 找的是vscode启动的项目根目录
// fs.readFile('./note.md', 'utf8').then(data => {
//     console.log(data)
// })

// ---------------------------
// bluebird 里的promisify promisifyAll
// const fs = require('fs')
// const bluebird = require('bluebird')
// // bluebird promise库提供了promisify promisifyAll
// let obj = bluebird.promisifyAll(fs)
// obj.readFileAsync('note.md', 'utf8').then(data => {
//     console.log(data)
// })

// ---------------------------

/* 怎么将node的api转化成promise api */

// const fs = require('fs')


// function promisify(fn) { // 高阶函数
//     return function (...args) {
//         return new Promise((resolve, reject) => {
//             fn(...args, function (err, data) {
//                 if (err) return reject(err)
//                 resolve(data)
//             })
//         })
//     }
// }

// function promisifyAll(target) {
//     // Reflect.ownKeys <=> Object.keys Reflect.defineProperty <=> Reflect.defineProperty
//     Reflect.ownKeys(target).forEach(key => {
//         if (typeof target[key] === 'function') {
//             target[key + 'Async'] = util.promisify(target[key])
//         }
//     })
//     return target
// }


// const readFile = promisify(fs.readFile)
// readFile('note.md', 'utf8').then(data => {
//     console.log(data)
// })
// ---------------------------

/* node提供的promisify方法 */

const fs = require('fs')
const util = require('util') // 内置模块 util中内置了promisify，但是没有提供promisifyAll


// ---------------------------
function promisifyAll(target) {
    Reflect.ownKeys(target).forEach(key => {
        if (typeof target[key] === 'function') {
            target[key + 'Async'] = util.promisify(target[key])
        }
    })
    return target
}
let obj = promisifyAll(fs)
obj.readFileAsync('note.md', 'utf8').then(data => {
    console.log(data)
})
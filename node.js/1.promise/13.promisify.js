// promisify 主要的功能是将一个异步的方法转化成promise的形式  主要是给node来使用的
// 回调函数的参数 永远第一个是error  error-first

const fs = require('fs')

function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }
}

// let readFile = promisify(fs.readFile)
// readFile('./a.txt', 'utf8').then(data => console.log(data))



function promisifyAll(obj) {
    let o = {}
    for(let key in obj) {
        if (typeof obj[key] === 'function') {
            o[key + 'Promise'] = promisify(obj[key])
        }
    }
    return o
}

let newFs = promisifyAll(fs)
newFs.readFilePromise('./a.txt', 'utf8').then(data => console.log(data))
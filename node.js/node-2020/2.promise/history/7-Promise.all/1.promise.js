/* 
    Promise.all
*/
let fs = require('fs').promises

// fs.readFile('./name.txt', 'utf8').then(data => {
//     console.log(data)
// })
// fs.readFile('./age.txt', 'utf8').then(data => {
//     console.log(data)
// })

let getName = fs.readFile('./name.txt', 'utf8')
let getAge = fs.readFile('./age.txt', 'utf8')

function isPromise(val) {
    return val && (typeof val.then == 'function')
}

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let result = []
        let times = 0

        function processData(index, val) {
            result[index] = val
            if (++times === promises.length) { // 不要用result[index] === promise.length，如果最后一个结束，前面就是空的了
                resolve(result)
            }
        }

        for (let i = 0; i < promises.length; i++) {
            let p = promises[i];
            if (isPromise(p)) {
                p.then(data => {
                    processData(i, p) // 普通值
                }, reject)
            } else {
                processData(i, p) // 普通值
            }

        }
    })
}

// Promise.all方法返回的是一个promise，并发执行，其中一个失败就真的失败了
Promise.all([1, getName, getAge, 2]).then(data => {
    console.log(data)
})

// fetch 是不能中断的
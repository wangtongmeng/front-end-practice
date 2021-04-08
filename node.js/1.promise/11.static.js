let Promise = require('./source/3.promise')


// 1.Promise.resolve() 这个方法  会创造一个成功的promise
// Promise.resolve(1).then(value => {
//     console.log(value)
// })
// Promise.resolve(new Promise((resolve,reject) => {
//     setTimeout(() => {
//         // resolve(1)
//         reject(1)
//     }, 1000);
// })).then(value => {
//     console.log('success', value)
// }).catch(err => {
//     console.log('err', err)
// })

// 2.Promise.reject() 这个方法  会创造一个失败的promise
Promise.reject(1).then((data) => {
    console.log(data)
}).catch(err => { // catch方法就是没有成功的失败
    console.log(err, 'err')
});

Promise.reject(new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(200);
    }, 1000);
})).then((data) => {
    console.log(data)
}).catch(err => { // catch方法就是没有成功的失败
    console.log(err, 'err')
});


// 3.Promise.all 并发请求 全部成功才成功，一个失败则失败
// 多个promise全部完成后获取结果，但是其中的某个如果失败了 那么这个promise就失败了
// 同步（同一时刻拿到） 多个异步请求的结果
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('成功')
//     }, 2000);
// })
// let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('成功')
//     }, 1000);
// })
// Promise.all([p1, p2, 1, 2, 3]).then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log('err', err)
// })

// 4.Promise.race 有一个成功或失败就采用他的结果  应用：超时处理
// 赛跑 采用最快的那一个  race 方法如果其中一个完成了 其他的还是会执行的，并没有采用他的结果
// let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('成功')
//     }, 500);
// })
// let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('失败')
//     }, 1000);
// })

// Promise.race([p1,p2]).then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log(err)
// })

// 图片加载 请求的加载  造成超时（不采用成功的结果了）
// var abort
// let p1 = new Promise((resolve, reject) => {
//     abort = reject
//     setTimeout(() => {
//         resolve('成功')
//     }, 3000);
// })
// p1.abort = abort
// setTimeout(() => {
//     p1.abort()
// }, 2000);
// 构造一个自己的promise和 p1 放在一起，暴露一个中断方法
// function wrap(p1) { // 图片加载失败问题 ， 脚本加载超时问题 
//     let abort
//     let p = new Promise((resolve, reject) => {
//         abort = reject //  这是自己构造的promise，暴露一个中断方法
//     })
//     let p2 = Promise.race(p, p1)
//     p2.abort = abort // 如果用户调用abort方法 这个p就失败了 = p2 就失败了
//     return p2
// }
// let p2 = wrap(p1)
// p2.then(data => {
//     console.log(data)
// }, err => {
//     console.log(err)
// })
// setTimeout(() => {
//     p2.abort('超时')
// }, 2000);

// 5. Promise.allSettled([p1,p2])   但是会获得所有的结果， 不会走catch方法
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    }, 1000);
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('失败')
    }, 500);
})
Promise.allSettled([p1,2,p2]).then(data => {
    console.log(data)
})

// 6.Promise.any([p1,p2])  如果其中一个成功了 就会走成功 取出的是第一个成功的值， 都失败了 才会走失败
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('成功')
        reject('失败1')
    }, 1000);
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('失败2')
    }, 500);
})
Promise.any([p1,p2]).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
// all(一个失败全失败) race(赛跑 采用跑的快的作为结果) allSettled(纪要成功也要失败，类似于finally)

/* Promise.allSettled的使用 */
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('fail')
    }, 3000);
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000);
})
console.log(Reflect.ownKeys(Promise))
Promise.allSettled([p1, p2]).then(values => {
    console.log(values) // [{status: "rejected", reason: "fail"}, {status: "fulfilled", value: "ok"}] 有顺序
})
// Promise.allSettled().then(values => {
//     console.log(values)
// }).catch(err => {
//     console.log('---', err) // 不能迭代报错
// })

/* 实现allSettled 无论成功和失败 都收集起来 最终把结果拿到(可以利用Promise.all) */

/* 实现Promise.race */

Promise.race = function (promises) {
    return new Promise((resolve, reject)=>{
        
    })
}

Promise.race([p1, p2]).then(data=>{

}).catch(err=>{

})

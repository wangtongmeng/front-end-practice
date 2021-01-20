/* 中断Promise=>abort方法就是不要promise这次成功的结果了 */

// 超时处理

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功')
    }, 3000);
})

function wrap(p1) { // p1是用户的，再内部再构建一个promise和用户传入的组成一队
    let abort
    let p2 = new Promise((resolve, reject) => {
        abort = reject
    })
    let newP = Promise.race([p1,p2])
    newP.abort = abort
    return newP
    
}

let p2 = wrap(p1)
p2.then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

setTimeout(() => {
    // 如果超过就让这个promise失败掉
    p2.abort('错误信息')
}, 2000);
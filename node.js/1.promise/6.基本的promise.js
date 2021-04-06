
let Promise = requrie('./source/1.promise.js')
let p = new Promise((resolve, reject) => {
    console.log('promise')
    // resolve('value')
    // reject('reason')
    throw new Error('失败了')
})
p.then(value => {
    console.log('success', value)
}, reason => {
    console.log('err', reason)
})

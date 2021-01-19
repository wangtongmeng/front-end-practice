// 2.2 2.2.1 可选参数
// 测试

const Promise = require('./promise')
const p = new Promise((resolve, reject) => {
    resolve('ok')
    // reject('err')
}).then().then().then().then(data => {
    console.log(data)
}, err => {
    console.log(err)
})
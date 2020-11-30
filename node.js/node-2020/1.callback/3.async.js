// 异步数据处理
const fs = require('fs') // node中的自带模块
// ---------------------------
// code runner 执行 默认以vscode打开的文件夹为基准
// 异步处理都是基于回调的，异步不能通过 try catch捕获异常，node中的回调参数第一个就是err属性s
// fs.readFile('./age.txt', 'utf8', function (err, data) {
//     console.log(data)
// })
// fs.readFile('./name.txt', 'utf8', function (err, data) {
//     console.log(data)
// })
// ---------------------------


// 获取最终结果 渲染模板


// ---------------------------
// 异步串行 性能不好 => 解决异步问题 核心就是回调函数
// let obj = {}
// fs.readFile('./name.txt', 'utf8', function (err, data) {
//     obj.name = data
//     fs.readFile('./name.txt', 'utf8', function (err, data) {
//         obj.age = data
//     })
// })

let obj = {}
function after(times, callback) {
    return function () {
        --times == 0 && callback()
    }
}
let fn = after(2, () => { // lodash after
    console.log(obj)
})
fs.readFile('./age.txt', 'utf8', function (err, data) {
    if (err) return console.log(err)
    obj.age = data
    fn()
})
fs.readFile('./name.txt', 'utf8', function (err, data) {
    if (err) return console.log(err)
    obj.name = data
    fn()
})
// ---------------------------


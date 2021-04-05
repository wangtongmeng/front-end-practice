const fs = require('fs')


// let arr = []
// function out(data) { // 不关心顺序
//     arr.push(data)
//     if (arr.length == 2) {
//         // ...
//         console.log(arr) // [ 'b.txt', 'b' ]
//     }
// }
// fs.readFile('./a.txt', 'UTF8', function (err,data) {
//     out(data)
// })
// fs.readFile('./b.txt', 'UTF8', function (err,data) {
//     out(data)
// })



function after(times, callback) {
    let arr = []
    return (data,index)=>{
        arr[index] = data // 保存顺序 采用索引
        if(--times === 0) { // 多个请求并发 需要靠计数器来实现
            callback(arr)
        }
    }
}
let out = after(2, arr => {
    // ...
    console.log(arr) // [ 'b.txt', 'b' ]
})
fs.readFile('./a.txt', 'UTF8', function (err,data) {
    out(data, 0)
})
fs.readFile('./b.txt', 'UTF8', function (err,data) {
    out(data, 1)
})
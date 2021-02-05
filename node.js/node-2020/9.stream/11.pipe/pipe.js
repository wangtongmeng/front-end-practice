const ReadStream = require('../3.可读流的实现原理/ReadStream')
const WriteStream = require('../10.使用Queue优化可写流/writeStream')


let rs = new ReadStream('./test.txt', {
    highWaterMark: 4
})
let ws = new WriteStream('./copy.txt', {
    highWaterMark: 1
})
// rs.on('data',function (chunk) {
//     let flag = ws.write(chunk)
//     if(!flag){
//         rs.pause()
//     }
// })
// ws.on('drain', function () {
//     rs.resume()
// })

// 拷贝功能是异步的 内部用的是发布订阅模式
rs.pipe(ws)

// 可读流的读取操作 和 可写流的写入的操作方法 需要


// 可读流 可写流 双攻流(能读也能写 既继承了可读流也继承了可写流(读和写可以没有关系))


// const {
//     Duplex
// } = require('stream')

// class MyDuplex extends Duplex {
//     _read() {
//         this.push('xxx')
//         this.push(null)
//     }
//     _write(chunk, encoding, cb) {
//         console.log(chunk)
//         cb()
//     }
// }
// let md = new MyDuplex()
// md.on('data', function (chunk) {
//     console.log(chunk)
// })

// md.write('ok')


// 转化流 可以用于加密 压缩 可以把可写流转换成可读流
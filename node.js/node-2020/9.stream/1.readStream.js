/**
 * stream使用用法
 */


// 文件基于流进行了封装 封装了基于文件的可读流和可写流


const fs = require('fs')
const path = require('path')

// 内部继承了stream模块 并且基于 fs.open fs.read fs.close方法
let rs = fs.createReadStream(path.resolve(__dirname, 'test.txt'),{
    flags: 'r', //创建可读流的标识是r 读取文件
    encoding: null, // 编码默认null buffer
    autoClose: true, // 读取完毕后自动关闭
    start: 0, // 包前又包后 字节数
    // end:4,
    highWaterMark: 2 // 如果不写默认是64*1024
})
rs.on('error', function (err) { // 比如文件不存在 test1.txt
    console.log(err)
})
rs.on('open', function (fd) {
    console.log(fd)
})

// 通过拼接字符串的方式，问题：当数据有汉字的时候，这里采用每2个字节读取，所以会乱码
// let str = ''
// rs.on('data', function (chunk) { // UTF8 当只有一个字节时使用的还是ASCII  <Buffer 31 32> 31对应十进制49对应ASCII 1
//     str += chunk
//     console.log(chunk)
// })
// rs.on('end', function () {
//     console.log(str)
// })

// 拼接buffer的方式，防止乱码
let arr = []
rs.on('data', function (chunk) {
    // rs.pause() // 默认一旦监听了on('data')方法会不停的触发data方法
    console.log(chunk)
    arr.push(chunk)
})
rs.on('end', function () { // 文件的开始到结束都读取完毕了
    console.log(Buffer.concat(arr).toString())
})
rs.on('close',function () {
    console.log('close')
})

// 发布订阅中输出异常 on('error')
// 可读流对象 必须有on('data') on('end') 如果是文件流会再提供两个方法 open/close
// 控制读取速率 rs.pause rs.resume

// setInterval(() => {
//     rs.resume()
// }, 500);


// http://zhufengpeixun.com/grow/html/11.Stream-4.html
// 1.内部会 new ReadStream 继承于Readable接口
// 2.内部会先进行格式化
// 3.内部会默认打开文件 ReadStream.prototype.read
// 4.ReadStream.prototype.read -> ReadStream.prototype._read


// 如果想基于Readable接口实现自己的可读流 你需要自己去实现一个_read方法，默认当我们开始读取时会调用此方法
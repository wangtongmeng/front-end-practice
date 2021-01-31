/**
 * buffer的基本使用
 */
// 服务器中可以操作二进制 Buffer 可以和字符串随便转化

// 1.buffer的声明方式3种固定长度/固定字符串/固定数组 固定大小 声明出来后不能随意改变(数据结构中 动态数组 前端数组时可以自动扩容的)

// 固定长度
var buffer = Buffer.alloc(6) // 字节数 默认后端声明大小的数量 都是字节数
console.log(buffer) // <Buffer 00 00 00 00 00 00>
// 固定字符串
var buffer = Buffer.from('你好') // buffer的长度是字节数目长度
console.log(buffer, buffer.length) // <Buffer e4 bd a0 e5 a5 bd> 6
console.log(buffer.toString('utf8')) // 你好 默认是utf8  常用的两种 utf8 base64
// 固定数组
var buffer = Buffer.from([1, 2, 3, 4, 100])
console.log(buffer) // <Buffer 01 02 03 04 64>
// 二进制是以0b开头 八进制0o 十六进制 0x
var buffer = Buffer.from([0x1, 2, 3, 4, 0x64])
console.log(buffer) // <Buffer 01 02 03 04 64>


// 修改buffer 可以通过索引更改

buffer[1] = 100
buffer[100] = 100 // 超出固定大小无效
console.log(buffer) // <Buffer 01 64 03 04 64>

// 扩容：想更改buffer的大小是不行的 可以再声明一个空间将结果拷贝进去
var buf = Buffer.alloc(12)
var buffer1 = Buffer.from('你好')
var buffer2 = Buffer.from('张三')

// copy原理
Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
    for (let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[targetStart++] = this[i]
    }
}

buffer1.copy(buf, 0, 0, 6)
buffer2.copy(buf, 6, 0, 6)
console.log(buf)

// buffer的concat slice 方法
Buffer.concat = function (bufferList, length = bufferList.reduce((a, b) => a + b.length, 0)) {
    let buf = Buffer.alloc(length)
    let offset = 0
    bufferList.forEach(bufItem => {
        bufItem.copy(buf, offset)
        offset += bufItem.length
    })
    return buf.slice(0,offset) // 没用的截取掉  原生的会保留
}


// 拼接
var newBuffer = Buffer.concat([buffer1, buffer2])
console.log(newBuffer) // <Buffer e4 bd a0 e5 a5 bd e5 bc a0 e4 b8 89>
var newBuffer = Buffer.concat([buffer1, buffer2], 100)
console.log(newBuffer)
console.log(Buffer.isBuffer(newBuffer))


// 常用方法：length toString concat Buffer.isBuffer
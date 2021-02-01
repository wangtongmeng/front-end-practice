/**
 * 可读流的应用
 */
const fs = require('fs')
const path = require('path')

const ws = fs.createWriteStream(path.resolve(__dirname, 'test.txt'),{
    flags: 'w', // w a
    encoding: 'utf8',
    autoClose:true,
    highWaterMark: 2 // 默认写的水位线是16k
})
ws.on('open',function (fd) {
    console.log(fd)
})

// ws 可写流 ws.write() ws.end() ws.on('open') on('close')

// ws.write('123', function () {
//     console.log('write ok')
// }) // 只能写入 string 或者buffer类型 内部调的fs.write

// 可以不写回调  会返回一个标识
// let flag = ws.write('123124154')
// console.log(flag) // false 标识是否超过了水位线

let flag = ws.write('1')
ws.write('2')
ws.write('3')
ws.write('4')
console.log(flag) // 这里写入的顺序不会变 1234    将多个异步任务进行排队依次来执行

ws.end('ok') // 等价于ws.write之后调用ws.close
// ws.end('ok') // write after end 已经关闭不能再写入 特殊情况 ws.end()如果不传参数是可以的
// 为什么要采用链表
// 常用的数据结构：数组、栈、队列、链表、树
// 用链表可以来实现栈或者队列 性能(取头部性能会高一些)


// 第一次写入操作是真的向文件中写入 后续的操作都缓存到链表中了
// flag 主要是用来限制是否继续读取 保证不过多的占用内存 
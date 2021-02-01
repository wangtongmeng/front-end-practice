// 极端情况：只有一个字节的空间，来进行写操作

const fs = require('fs')
const path = require('path')
const ws = fs.createWriteStream(path.resolve(__dirname, 'test.txt'),{
    highWaterMark:1
})

let i = 0
function write() {
    let flag = true
    while (i < 10 && flag) {
        flag = ws.write('' + i++)
    }
}
write()
// 抽干事件 当我们的内容到达预期后，或者超过预期时会触发此方法(必须等内容都写到文件中才执行)
ws.on('drain', function () {
    console.log('清空')
    write()
})


// 缓存的概念 周日：可写流的实现原理 pipe 链表 树结构 遍历n中遍历方式 文件操作 http

// 可读流和可写流主要的四个方法 on('data) on('end') write() end()
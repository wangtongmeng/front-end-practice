const fs = require('fs')
const path = require('path')
const WriteStream = require('./writeStream')
// const ws = fs.createWriteStream(path.resolve(__dirname, 'test.txt'),{
const ws = new WriteStream(path.resolve(__dirname, 'test.txt'), {
    flags: 'w',
    encoding: 'utf8',
    autoClose: true,
    highWaterMark: 2
})
ws.on('open', function (fd) {
    console.log(fd)
})

let flag = ws.write('w')
console.log(flag)
flag = ws.write('a')
console.log(flag)

ws.on('drain', function () { // 必须达到预期 并且消耗掉
    console.log('干了')
})


setTimeout(() => {
    flag = ws.write('a')
    console.log(flag)
}, 1000);

// 1.格式化转入的数据 默认需要打开文件
// 2.用户会调用write方法 Writable接口实现了write方法内部会调用_write方法 fs.write方法
// 3.区分是第一次写入 还是后续写入  
// fs fileSystem 和文件相关的方法 文件 文件夹

// 里面的方法一般有两种类型 1) 同步 sync 2) 异步 没有sync

const fs = require('fs')
const path = require('path')
// 1.如果我们读的是文件 读取到的结果默认都是buffer类型
// 2.写入的时候 会清空文件内容，并且以utf8格式类型写入


// 运行时如果用相对路径 会以process.cwd()来切换路径 可能会导致不同路径下运行结果不同
// fs.readFile(path.resolve(__dirname, 'note.md'), function (err,data) {
// fs.readFile(path.resolve(__dirname, 'liukanshan1.jpg'), 'utf8', function (err,data) {
fs.readFile(path.resolve(__dirname, 'liukanshan1.jpg'), function (err,data) {
    // 执行图片时 采用utf8格式会乱码
    fs.writeFile(path.resolve(__dirname, 'test.jpg'), data, function (err,data) {
        console.log('copy')
    })
})

fs.readFile(path.resolve(__dirname, 'note.md'), function (err,data) {
    // 追加内容 flag:r => read w=>write a=>append
    // fs.writeFile(path.resolve(__dirname, 'note1.md'), data, {flag: 'a'}, function (err,data) {
    //     console.log('copy')
    // })
    // 简写 appendFile 内部调用的writeFile+flag: 'a'
    fs.appendFile(path.resolve(__dirname, 'note1.md'), data, function (err,data) {
        console.log('copy')
    })
})

// readFile/writeFile 1)读取的内容都会放到内存中 2) 如果文件过大会浪费内存 3)淹没可用内存 大型文件不能采用这种方式来进行操作 64k以上的文件做拷贝操作就尽量不要使用readFile来实现

// 大文件读写
// 手动读写文件 fs.open fs.read fs.write fs.close
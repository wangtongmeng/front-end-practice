const fs = require('fs')
const path = require('path')

// fs.open fs.read fs.write fs.close 实现读取一点写入一点

// 参照物 内存
// 要将一个文件的内容 读取到内存 => 其实做了写的操作
// 向文件中写入 => 其实做了读操作

// const buffer = Buffer.alloc(3)
// fs.open(path.resolve(__dirname, '3.fs.js'), 'r', function (err, fd) {
//     // fs file discriptor 类型是数字
//     // 文件描述符 写入到的buffer 从buffer的那个位置开始写 写入的个数 从文件的哪个文字开始读
//     fs.read(fd,buffer,0,3,0, function (err, bytesRead) { // bytesRead 真实的读取到的个数
//         console.log(bytesRead, buffer.toString())
//         fs.close(fd, () => {
//             console.log('完成')
//         })
//     })
// })

// 权限 chmod -R 777 二爷一直4读书 r 4 w 2 x 1

// const buffer = Buffer.from('你好')
// // fs.open(path.resolve(__dirname, '3.fs.js'), 'w', 0o666) // 默认 0o666 表示能读能写 0o666 === 438
// fs.open(path.resolve(__dirname, 'test.js'), 'w', function (err, fd) {
//     fs.write(fd,buffer,0,3,0, function (err, written) { // 写入的个数

//     })
// })

function copy(source, target, cb) {
    const BUFFER_LENGTH = 3
    let read_position = 0
    let write_position = 0
    const buffer = Buffer.alloc(BUFFER_LENGTH)
    fs.open(source, 'r', function (err, rfd) {
        fs.open(target, 'w', function (err, wfd) {
            function next() {
                fs.read(rfd, buffer, 0, BUFFER_LENGTH, read_position, function (err, bytesRead) { // 读取到的实际个数
                    if (err) return cb(err)
                    if (bytesRead) {
                        // 读出来再写进去
                        fs.write(wfd, buffer, 0, bytesRead, write_position, function (err, written) {
                            read_position += bytesRead
                            write_position += bytesRead
                            next()
                        })
                    } else {
                        fs.close(rfd,()=>{})
                        fs.close(wfd,()=>{})
                        cb()
                    }
                })
            }
            next()
        })
    })

}

let sourceFile = path.resolve(__dirname, '3.fs.js')
let targetFile = path.resolve(__dirname, 'test.js')
copy(sourceFile, targetFile, function () {
    console.log('copy success')
})
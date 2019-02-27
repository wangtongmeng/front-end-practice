// 浏览器中的 JavaScript 是没有文件操作能力的
// Node 中的 JavaScript 具有文件操作能力

// fs 是 file-system 的简写，即文件系统
// 在 Node 中，进行文件操作必须引入 fs 核心模块
// fs 核心模块提供了文件操作相关 API
// 如，fs.readFile 可以读取文件

// 1. 使用 require 方法加载 fs 核心模块
var fs = require('fs')

// 2. 读取文件
//    第一个参数，读取的文件路径
//    第二个参数，回调函数
//
//      成功
//          data 数据
//          error null
//      失败
//          data null
//          error 错误对象
fs.readFile('./data/hello.txt', function (error, data) {
  // <Buffer 68 65 6c 6c 6f>
  // 文件存储的是二进制数据 0 1
  // 这里二进制转为 16进制了
  // 可以通过 toString 方法 将其转为我们认识的字符
  console.log(data.toString())
})
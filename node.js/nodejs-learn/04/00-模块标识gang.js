var fs = require('fs')

// 咱们所使用的所有文件操作的 API 都是异步的，就像 ajax 请求一样， 文件操作中相对路径可以省略 ./
fs.readFile('data/a.txt', function (err, data) {
  if (err) {
    return console.log('读取失败')
  }
  console.log(data.toString());
})
const http = require('http')
const fs = require('fs')
const zlib = require('zlib') // 引入包

http.createServer(function (request, response) {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html') // 这里不加 utf8，加了返回的就是字符串格式了
  response.writeHead(200, {
    'Content-Type': 'text/html',
    // 'X-Content-Options': 'nosniff'
    'Content-Encoding': 'gzip'
  })
  response.end(zlib.gzipSync(html)) // 压缩
}).listen(8888)

console.log('server listening on 8888')
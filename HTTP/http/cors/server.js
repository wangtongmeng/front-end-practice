const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html', 'utf8') // 注意设置 utf8，这样读取的是字符串，否则是二进制的数据
  response.writeHead(200, {
    'Content-Type': 'text/html' // 不设置的话，浏览器会直接显示，不解析；默认浏览器会加上
  })
  response.end(html)
}).listen(8888)

console.log('server listening on 8888')
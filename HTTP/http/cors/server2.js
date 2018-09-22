const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  response.writeHead(200, { // 不设置这个头，浏览器还是会发送请求，并接收内容，浏览器检查head头，如果没有'Access-Control-Allow-Origin'，并且设置为允许，浏览器会把本次请求返回的内容会略掉，并且报错。
    'Access-Control-Allow-Origin': '*', // 允许 8888 的域名访问，*也可以
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE',
    'Access-Control-Max-Age': '1000'
  })
  response.end('123')
}).listen(8887)

console.log('server listening on 8887')
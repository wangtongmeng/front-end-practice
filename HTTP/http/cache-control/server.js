const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

  if (request.url === '/script.js') {
    console.log(request.headers)
    const etag = request.headers['if-none-match']
    if(etag === '777') {
      response.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000000, no-store',
        'Last-Modified': '123',
        'Etag': '777'
      })
      response.end('') // 这里不传任何内容，即使有内容，浏览器也不会读取
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=2000000, no-store', // 通过 no-cache，即使没过期浏览器也要向服务器验证，不会从缓存读取。
        'Last-Modified': '123', // 随便设的值
        'Etag': '777'
      })
      response.end('console.log("script loaded twice")')
    } 
  }
}).listen(8888)

console.log('server listening on 8888')
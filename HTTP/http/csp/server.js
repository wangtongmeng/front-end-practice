const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Security-Policy': 'connect-src \'self\'; form-action \'self\'; report-uri / report' 
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'application/javascript'
    })
    response.end('console.log("loaded script")')
  }
}).listen(8888)

console.log('server listening on 8888')
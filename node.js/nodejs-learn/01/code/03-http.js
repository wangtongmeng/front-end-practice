var http = require('http')
var server = http.createServer()
server.on('request', (req, res) => {
  var path = req.url
  if (path === '/') {
    res.end('index page')
  } else if (path === '/login') {
    res.end('login page')
  } else {
    res.end('404 Not Found.')
  }
})
server.listen(3000, () => {
  console.log('服务器启动成功');
})
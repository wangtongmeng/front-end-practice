var http = require('http')
var server = http.createServer()
server.on('request', function (req, res) {
  res.end('hello 你好')
})
server.listen(3000, function () {
  console.log('Server is running...')
})

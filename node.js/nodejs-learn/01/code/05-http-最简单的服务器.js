// 使用 Node 构建一个 Web 服务器
// 在 Node 中专门提供了一个核心模块： http
// http 的职责就是创建编写服务器

// 1. 加载 http 核心模块
var http = require('http')

// 2. 使用 http.createServer() 方法创建一个服务器
//    返回一个 Server 实例
var server = http.createServer()

// 3.服务器做的事情，提供对数据的服务
//     包括接收请求、处理请求、发送响应

// 注册 request 请求事件
// 当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调函数
server.on('request', function () {
  console.log('收到客户端请求了')
})

// 4. 绑定端口号，启动服务器
server.listen(3000, function () {
  console.log('服务器启动成功，可通过 http://127.0.0.1:3000/ 来进行访问')
})
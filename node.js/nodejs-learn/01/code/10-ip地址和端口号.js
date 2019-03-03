// ip地址用来定位计算机
// 端口号用来定位具体的应用程序
// 所有需要联网通信的应用程序都会占用一个端口号

var http = require('http')

// 1. 创建 Server
var server = http.createServer()

// 2. 监听 request 请求事件，设置请求函数
server.on('request', function (req, res) {
  var url = req.url
  console.log('请求我的客户端的端口号是：', req.socket.remoteAddress, req.socket.remotePort);
  
  if (url === '/') {
    res.end('index page')
  } else if (url === 'login') {
    res.end('login page')
  } else if (url === '/products') {
    var products = [
      {
        name: '手机1',
        price: '111'
      },
      {
        name: '手机2',
        price: '222'
      },
      {
        name: '手机3',
        price: '333'
      }
    ]

    // 响应内容只能是二进制数据或字符串
    //    数字、对象、数组、布尔值都不行
    res.end(JSON.stringify(products))
    
  } else {
    res.end('404 Not Found.')
  }
})

// 3. 绑定端口号，启动服务
server.listen(3000, function () {
  console.log('服务器启动成功，可以通过 http://127.0.0.1:3000/ 进行访问了');
})
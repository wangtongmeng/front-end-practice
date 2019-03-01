var http = require('http')

// 1. 创建 Server
var server = http.createServer()

// 2. 监听 request 请求事件，设置请求函数
server.on('request', function (req, res) {
  // console.log('收到请求，请求路径是：' + req.url)

  // res.write('hello') // 发送多次响应
  // res.write(' world')
  // res.end() // 结束响应

  // 上述方式较麻烦，推荐使用更简单的方式，直接 end 的同时发送响应数据
  // res.end('hello world')

  // 根据不同的请求路径发送不同的响应结果
  // 1. 获取请求路径
  // req.url 获取到的是端口号之后的那一部分路径
  // 也就是说所有的 url 都是以 / 开头的
  // 2. 判断路径处理响应

  var url = req.url

  // if (url === '/') {
  //   res.end('index page')
  // } else if (url === 'login') {
  //   res.end('login page')
  // } else {
  //   res.end('404 Not Found.')
  // }
  if (url === '/products') {
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
  }
})

// 3. 绑定端口号，启动服务
server.listen(3000, function () {
  console.log('服务器启动成功，可以通过 http://127.0.0.1:3000/ 进行访问了');
})
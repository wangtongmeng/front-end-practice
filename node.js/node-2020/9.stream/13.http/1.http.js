/**
 * http的基本使用
 */
const http = require('http')
const url = require('url')
const querystring = require('querystring')

// uri(统一资源标识符 uniform resource identifier) url(统一资源定位符) urn
// 常用的 hostname 主机名 query 查询参数 pathname 请求路径
// console.log(url.parse('http://username:password@localhost:3000/resource?a=1#hash', true))


let server = http.createServer(function (req, res) {
    // 客户端数据获取
    // 请求部分
    console.log(req.method) // 默认是大写的
    console.log(req.url) // /后面的 #前面的   希望获取用户的参数 ？后面的参数 期望得到 query {a:1,b:2}
    let {
        pathname,
        query
    } = url.parse(req.url, true) // 把查询参数变成对象
    console.log(pathname, query)
    console.log(req.httpVersion)
    // console.log(req.headers) // 所有的请求头信息 所有的key都是小写

    // req是一个可读流
    let arr = [] // 前端传递的数据可能是二进制所以用buffer拼接是最合理的

    // 如果流中的数据为空 内部会调用 push(null) 只要调用了 push 一定会触发end事件
    req.on('data',function (chunk) {
        arr.push(chunk)
    })
    req.on('end', function () { // 如果没有数据也会触发end事件
        console.log(Buffer.concat(arr).toString())
    })

    // ---------------------------------------------------------
    // 服务端相关方法
    // 响应行 响应头 响应体 顺序不能发生变化
    // res是一个可写流 write end

    res.statusCode = 200
    // res.statusMessage = 'no status' 状态信息一般不用设 采用默认值即可
    res.setHeader('a', 1)
    // res.write('ok') // 分段响应  headers里会有 Transfer-Encoding: chunked
    res.end('ok') // 表示响应结束

    // 希望服务器每一秒钟都给客户端发送一个最新的价格 socket.io
    // 如果websocket不支持 一般情况会采用 前端定时器轮询
})

// 两种写法都行 一般会采用上面的写法
// server.on('request', function (req,res) {
//     console.log(2)
// })

let port = 4000 // 端口尽量使用3000以上
server.listen(port, function () {
    console.log(`server start ${port}`)
})

server.on('error', function (err) {
    if (err.errno === 'EADDRINUSE') {
        server.listen(++port) // 端口占用自动累加重启
    }
})

// 服务端代码改变后必须要重新执行
// nodemon (node monitor) npm install nodemon -g  运行：nodemon+文件名
// pm2



// let query = {}
    // req.url.replace(/([^&?=]+)=([^&?=]+)/g, function () {
    //     query[arguments[1]] = arguments[2]
    // })
    // console.log(query)


// curl -v -X POST -d a=1 http://localhost:4000
// curl -v 显示详细信息
// curl -X 指定方法
// curl -d 指定数据
// curl -h 指定头
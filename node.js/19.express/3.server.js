const express = require('./express')
const app = express() // 最终是一个函数 http.createServer(app)

// promise 可以直接catch  但是异步回调处理错误就不太容易了
// 对于回调而言，我们永远将回调的第一个参数作为错误参数
app.use(function (req,res,next) {
    let arr = []
    req.on('data', function (chunk) {
        arr.push(chunk)
    })
    req.on('end', function () {
        req.body = Buffer.concat(arr).toString()
        // next('出错');
        next()
    })
})
app.post('/', function (req,res) {
    res.end(req.body)
})
app.get('/user/add',function(req,res,next) {
    // 我在读取数据库的时候出错了 =》 mysql 
    next('路由出错了')
    //res.send({a:1,b:2}); // end 方法只能返回一个buffer或者string
})

// 错误处理中间件  （统一的处理） 如果出错会跳过所有的中间件和路由，进入错误处理中间件
app.use(function(err,req,res,next){ // 参数4个  function.length
    res.setHeader('Content-Type','text/plain;charset=utf8')
    res.end(err)
})


app.listen(3000)
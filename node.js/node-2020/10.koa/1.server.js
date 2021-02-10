// const Koa = require('koa')
const Koa = require('./koa')

const app = new Koa() // 创建一个Koa应用

app.use(function (req,res) { // handleRequest
    // ctx是koa中的上下文对象
    res.end('heloo')
})

app.listen(3000)

// 实例上比较核心的有三个 listen,use,on('error)

// use 注册函数
// ctx 上下文 这里对原生的req和res进行了封装 封装出了一个新的对象 request,response
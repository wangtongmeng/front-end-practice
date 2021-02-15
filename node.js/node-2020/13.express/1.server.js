const express = require('./express')

// 1.中间件可以对req和res进行扩展 扩展属性或者方法
// 2.中间件可以决定是否向下执行 公共逻辑的处理(权限)
// 3.针对某个路径做处理，中间件必须在真实的处理路由之前声明
// 4.错误处理中间件
const app = express()

// 路由要匹配路径和方法，但中间件不需要匹配方法，这个路径匹配规则和cookie的path一样
app.use('/', function (req,res,next) {
    req.a=1
    console.log(1)
    next()
})


app.use(function (req,res,next) { // 如果不写路径默认就是/
    console.log('a', req.a)
    console.log(2)
    next()
})
app.use('/user', function (req,res,next) { // /或者/user都可
    console.log(3)
    next()
})
app.use('/user', function (req,res,next) {
    console.log('中间件处理')
    res.end('ok')
})

app.listen(3000)
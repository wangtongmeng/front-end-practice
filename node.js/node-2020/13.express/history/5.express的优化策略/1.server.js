const express = require('./express') // let Koa = require('koa')

const app = express() // const app = new Koa()

// 1. 每个路由都是一个layer(path,dispatch)组成
// 2. 每个layer都有一个route 这个route中存放着真实的回调(layer 这里没有路径)，但是要给每个人增加一个方法get/post/delete (dispatch方法是每个route中都有这样的一个方法) 
// 3. 请求来的时候外层匹配路径 执行对应的route的dispatch方法，内部会迭代route中的方法
app.post('/', function (req, res, next) { // 我可以在函数中增加一些中间件 将一个功能拆分成若干个小功能
    setTimeout(() => {
        console.log(1)
        next()
    }, 1000);
}, function (req, res, next) {
    console.log(11)
    next()
}, function (req, res, next) {
    console.log(111)
    res.end('ok')
    // next()
})

// test: curl -X POST -v http://localhost:3000
app.get('/', function (req, res, next) {
    console.log(2)
    res.end('ok1')
    // next()
})

app.listen(3000)
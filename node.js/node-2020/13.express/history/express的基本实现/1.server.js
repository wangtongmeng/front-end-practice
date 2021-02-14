const express = require('./express') // let Koa = require('koa')

const app = express() // const app = new Koa()

app.get('/', function (req,res) { // 像koa-router koa-router参考了express自带的路由来实现的
    res.end('home')
})

app.get('/about', function (req,res) {
    res.end('about')
})
app.all('*',function (req,res) {
    res.end('all')
})
app.listen(3000, function () {
    console.log(`sever start 3000`)
})
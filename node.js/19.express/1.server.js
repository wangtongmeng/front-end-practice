// 不停的通过if else 来区分不同的路径， 返回不同的资源
// express 内置了路由功能 ，用起来非常方便 
// req.getCookie res.setCookie  node原生上的req,res 不够强大。 扩展他 
// express 扩展了 req和res
// express 可以通过中间件进行扩展
const express = require('./express') // express 返回的是一个函数
const app = express() // 创建了一个应用
app.get('/', function (req, res) {
    res.end('home')
})
app.get('/login', function (req,res) {
    res.end('login')
})
// app.all('*', function (req,res) {
//     res.end('404')
// })

app.listen(3000,()=>{
    console.log('server start');
})


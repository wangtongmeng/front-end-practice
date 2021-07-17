const express = require('express')
const app = express()

app.get('/', function (req,res) {
    res.end('首页')
})
app.get('/about', function (req,res) {
    res.end('about')
})
app.post('/login', function (req,res) {
    res.end('登录')
})

app.listen(3000, () => {
    console.log('启动3000服务');
})
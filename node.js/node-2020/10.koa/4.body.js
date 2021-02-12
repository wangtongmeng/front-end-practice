// 数据提交了 服务端应该接收数据 进行响应
// 获取用户数据进行操作

const Koa = require('koa')
const app = new Koa()
// koa-bodyparser koa-static
const bodyParser = require('./koa-bodyparser')
const static = require('./koa-static')
const path = require('path')

app.use(bodyParser(path.resolve(__dirname, 'upload'))) // 所有的插件都是函数 函数返回一个async函数
// 静态文件服务中间件 处理静态资源的
app.use(static(path.resolve(__dirname, 'koa'))) // 找到了就不往下找了
app.use(static(__dirname))

// 当用户访问/login时 get => 返回一个登录页
// app.use(async (ctx, next) => {
//     if (ctx.path === '/login' && ctx.method == 'GET') {
//         // 表单提交没有跨域 ajax才有跨域
//         ctx.body = `
//             <form action="/login" method="post">
//                 <input type="text" name="username" />
//                 <input type="text" name="password" />
//                 <button>提交</button>
//             </form>
//         `
//     } else {
//         await next()
//     }
// })
// 当用户访问/login时 post => 做登录操作

app.use(async (ctx, next) => {
    if (ctx.path === '/login' && ctx.method == 'POST') {
        // 读取用户传递的数据?
        ctx.set('Content-Type', 'text/html')
        ctx.body = ctx.request.body
    } else {
        await next()
    }
})

app.listen(3000)
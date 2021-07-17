const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const querystring = require('querystring')
// name  键值对
// value
// domain 针对某个域名生效 可以跨父域和子域  .baidu.com  a.baidu.com  b.baidu.com  默认当前域名 合理设置可以减少发送请求时携带的cookie
// path  当什么路径时可以访问cookie  可以设置cookie在哪里生效 ，默认是/ 都能被访问到
// expires/max-age cookie存活时间 
// httpOnly 表示浏览器无法通过代码来获取
// secure 只能在https下生效
// 典型的 jd.com


// app.use(async (ctx, next) => {
//     // 扩展一个设置cookie的方法
//     let cookieArr = [];
//     ctx.req.getCookie = function(key) {
//         let cookies = ctx.req.headers['cookie']; // name=zs; age=11   -> name=zs&age=11
//         let cookieObj = querystring.parse(cookies, '; ');
//         return cookieObj[key] || ''
//     }
//     ctx.res.setCookie = function(key, value, options = {}) {
//         let args = [];
//         if (options.domain) {
//             args.push(`domain=${options.domain}`)
//         }
//         if (options.httpOnly) {
//             args.push(`httpOnly=${options.httpOnly}`)
//         }
//         if (options.maxAge) {
//             args.push(`max-age=${options.maxAge}`)
//         }
//         // ....  
//         cookieArr.push(`${key}=${value}; ${args.join('; ')}`);
//         ctx.res.setHeader('Set-Cookie', cookieArr)
//     }
//     await next(); // 继续往下走
// })
router.get('/read', async (ctx, next) => {
    // koa用法
    ctx.body = ctx.cookies.get('name') || 'empty'

    // 自己封装的
    // ctx.body = ctx.req.getCookie('name') || 'empty'

    // 原生方法
    // ctx.body = ctx.req.headers['cookie'] || 'empty'
})
router.get('/write', async (ctx, next) => {
    // koa用法
    ctx.cookies.set('name', 'zs', { domain: '.zs.cn' }); // 域名.zs.cn 和子域都可以访问
    ctx.cookies.set('age', '11', { httpOnly: true });

    // 自己封装的
    // ctx.res.setCookie('name', 'zs', { domain: '.zs.cn' });
    // ctx.res.setCookie('age', '11', { httpOnly: true });

    // 原生方法
    // ctx.res.setHeader('Set-Cookie',['name=zs; domain=.zs.cn; max-age=10','age=11; path=/; max-age=100;httpOnly=true']) // 设置多个cookie，通过数组的形式
    ctx.body = 'write ok'
})
app.use(router.routes())
app.listen(3000);
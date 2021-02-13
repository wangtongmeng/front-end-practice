/**
 * cookie的使用
 */
const http = require('http')
const querystring = require('querystring')


// 服务端设置的是set-cookie 客户端设置的是 cookie字段
// cookie 存活时间 max-age/Expires
const server = http.createServer((req,res)=>{
    let arr = []
    res.setCookie = function (key,value,options={}) {
        let args = []
        if (options.maxAge){
            args.push(`max-age=${options.maxAge}`)
        }
        if (options.domain){
            args.push(`domain=${options.domain}`)
        }
        if (options.path){
            args.push(`path=${options.path}`)
        }
        if(options.httpOnly){
            args.push(`httpOnly=${options.httpOnly}`)

        }
        arr.push(`${key}=${value};${args.join(';')}`)
        res.setHeader('Set-Cookie', arr)
    }

    // 当用户访问 /read 表示读取 cookie
    if (req.url === '/read'){ // cookie是由多个 由分号隔开的字段 Cookie: name=tm; age=18
        let result = querystring.parse(req.headers.cookie, '; ', '=')
        res.end(JSON.stringify(result))
    } else if (req.url == '/write') {
        // max-age(多少秒生效)/Expires(绝对时间)
        // domain 针对哪个域名生效 (二级域名 a.tm.com b.tm.com) .tm.com 例子 jd.com
            // res.setHeader('Set-Cookie', ['name=tm;max-age=10',`age=18;expires=${new Date(Date.now()+10*1000*1000).toGMTString()}`])
        // path 限制只能在某个路径下访问的cookie
        // httpOnly可以实现相对安全一些 防止浏览器随便更改

        // 设置cookie要避免重名
        // C:\Windows\System32\drivers\etc\hosts 映射表 默认访问浏览器路径是会先去hosts里查找
        // 127.0.0.1 a.tm.cn 当访问 a.tm.cn 会走对应ip
        // 127.0.0.1 b.tm.cn
        res.setCookie('name', 'tm', {
            maxAge:100, // 100秒
            path: '/write', // 在write路径开头下才能访问
            domain: '.tm.cn', // 增加domain 可以设置二级域名 a.tm.cn b.tm.cn 共用cookie  减少cookie的发送 (www.tm.com 一级域名 .tm.com 二级三级都可以)
            httpOnly: true // 表示只能服务端操作cookie
        })
        res.setCookie('age', 18)
        res.end('write ok')
    }
    // /write时写入cookie
})

server.listen(3000)
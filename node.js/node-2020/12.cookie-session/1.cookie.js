const http = require('http')
const querystring = require('querystring')


// 服务端设置的是set-cookie 客户端设置的是 cookie字段
// cookie 存活时间 max-age/Expires
const server = http.createServer((req,res)=>{
    // 当用户访问 /read 表示读取 cookie
    if (req.url === '/read'){ // cookie是由多个 由分号隔开的字段 Cookie: name=tm; age=18
        let result = querystring.parse(req.headers.cookie, '; ', '=')
        res.end(JSON.stringify(result))
    } else if (req.url == '/write') {
        // max-age(多少秒生效)/Expires(绝对时间)
        // domain 针对哪个域名生效 (二级域名 a.tm.com b.tm.com) .tm.com 例子 jd.com
        res.setHeader('Set-Cookie', ['name=tm;max-age=10',`age=18;expires=${new Date(Date.now()+10*1000*1000).toGMTString()}`])
        res.end('write ok')
    }

    // /write时写入cookie
})

server.listen(3000)
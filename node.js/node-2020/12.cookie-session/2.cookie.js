/**
 * 给cookie加签名
 */
const http = require('http')
const querystring = require('querystring')
const crypto = require('crypto')
function sign(value) {
    // 加盐算法 放入不同的秘钥 产生不同的结果 不可逆的 盐值
    // base64 传输的过程中 + = / 都转换成空字符串

    // https 里面的签名
    return crypto.createHmac('sha256','tmpx').update(value).digest('base64').replace(/\+|\=|\//g, '') // base64一般用来传输
}

// 服务端设置的是set-cookie 客户端设置的是 cookie字段
// cookie 存活时间 max-age/Expires
const server = http.createServer((req, res) => {
    let arr = []
    res.setCookie = function (key, value, options = {}) {
        let args = []
        if (options.maxAge) {
            args.push(`max-age=${options.maxAge}`)
        }
        if (options.domain) {
            args.push(`domain=${options.domain}`)
        }
        if (options.path) {
            args.push(`path=${options.path}`)
        }
        if (options.httpOnly) {
            args.push(`httpOnly=${options.httpOnly}`)

        }
        if(options.signed){
            // 值.签名
            value = value + '.' + sign(value)
        }
        arr.push(`${key}=${value};${args.join(';')}`)
        res.setHeader('Set-Cookie', arr)
    }
    res.getCookie = function (key, options ={}) {
        console.log(req.headers.cookie)
        let result = querystring.parse(req.headers.cookie, '; ', '=') // +号会被转成' '
        console.log('result[key]', result[key])
        let [value,s] = (result[key] || '').split('.')
        if (options.signed) { // 要校验签名
            console.log(s, sign(value))
            if( s == sign(value)){
                console.log(1)
                return value
            } else {
                return undefined
            }
        } else {
            return value
        }
        
    }

    if (req.url === '/read') {
        // let result = querystring.parse(req.headers.cookie, '; ', '=')
        // res.end(JSON.stringify(result))

        let ret = res.getCookie('name', { // 将name对应的值解析出来
            signed: true
        })
        res.end(ret)


    } else if (req.url == '/write') {
        res.setCookie('name', 'tm', {
            maxAge: 100,
            httpOnly: true,
            signed: true
        })
        res.setCookie('age', 18)
        res.end('write ok')
    }
    // /write时写入cookie
})

server.listen(3000)
/**
 * 统计请求次数
 * base64传输丢失问题
 */
const http = require('http')
const querystring = require('querystring')
const crypto = require('crypto')
function sign(value) {
    // 加盐算法 放入不同的秘钥 产生不同的结果 不可逆的 盐值
    // 在传输中(http请求中携带的base64才会去掉)  base64时需要转化 + = /   /转化成_  +变成- =变成空

    // https 里面的签名
    return crypto.createHmac('sha256','tmpx').update(value+'').digest('base64').replace(/\+|\=|\//g, '') // base64一般用来传输
}

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

    // 每次访问服务器 统计客户端 访问的次数

    if(req.url === '/visit'){
        let visit = res.getCookie('visit',{signed:true})
        if(visit){
            visit++
        }else{
            visit=1
        }
        res.setCookie('visit',visit, {signed:true})
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end(`当前用户第${visit}次访问我`)
    }

})

server.listen(3000)
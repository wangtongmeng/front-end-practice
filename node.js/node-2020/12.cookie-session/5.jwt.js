// json web token 令牌

const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('jwt-simple') // jsonwebtoken
const crypto = require('crypto')
const router = new Router()
const app = new Koa()


const jwt1 = {
    toBase64Url(content){
        return content.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    },
    toBase64(content){
        return this.toBase64Url(Buffer.from(JSON.stringify(content)).toString('base64'))
    },
    base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    },
    sign(content,secret){
        return this.toBase64Url(crypto.createHmac('sha256', secret).update(content).digest('base64'))
    },

    encode(payload, secret) { // payload 不能放敏感信息
        let header = this.toBase64({
            typ: 'JWT',
            alg: 'HS256'
        })
        let content = this.toBase64(payload)
        let sign = this.sign(header + '.' + content, secret)

        return header + '.' + content + '.' + sign
    },
    decode(token,secret){
        let [header,content,sign] = token.split('.')
        let newSign = this.sign(header + '.' + content, secret)
        console.log('2222', sign, newSign)
        if (sign == newSign) {
            return JSON.parse(Buffer.from(this.base64urlUnescape(content), 'base64').toString())
        } else {
            throw new Error('令牌出错')
        }
    }
}

router.get('/login', async ctx => {
    // 访问login时 我就给你生成一个令牌 返回给你
    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwaXJlcyI6IjEwMCJ9.BC7RmrMUPo_mE_bwqdfs41OlRxH-A3QDUdNUmOLzNmo"
    let token = jwt.encode({
        username: 'admin',
        // expires: new Date(Date.now() + 20 * 1000 * 1000).toGMTString()
        expires: '100' // 这里用来验证自己写的jwt和依赖包是不是一致
    }, 'tm')

    ctx.body = {
        token
    }
})

router.get('/validate', async ctx => {
    let authorization = ctx.headers['authorization']
    if (authorization){
        let r = {}
        try {
            // let r = jwt.decode(authorization) // r 里面存放着过期时间
            console.log(authorization)
            r = jwt1.decode(authorization.split(' ')[1], 'tm') // r 里面存放着过期时间
        } catch (e) {
            r.message = '令牌失效'
        }
        ctx.body = {
            ...r
        }
    }
})


app.use(router.routes())
app.listen(3000)
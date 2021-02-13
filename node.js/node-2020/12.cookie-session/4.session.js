const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')
const router = new Router()
const crypto = require('crypto')

// koa 是专门用了一个字段来描述签名 xxx.sig = 4Xv310qj_ToQ7mXUefTmu5cS0mM
// console.log(crypto.createHmac('sha1', 'tmpx').update('`visit=9').digest('base64'))

app.keys = ['tmpx']
const session = {} // 用来记录映射关系的 如果刷新会丢失数据，可以用redis或者mongo存储session


const CardName = 'connect.sid' // 卡的名字
router.get('/visit', (ctx, next) => {
    let cardId = ctx.cookies.get(CardName)
    if(cardId && session[cardId]){
        session[cardId].mny -=10
        ctx.body = `您有${session[cardId].mny}元充值卡`
    }else {
        let cardId = Math.random()+Date.now().toString()
        ctx.cookies.set(CardName,cardId)
        session[cardId]= {mny:100}
        ctx.body = '您有100元充值卡'
    }


    // cookie签名 不安全 用户还是可以更改导致签名不对应计数错误
    // let visit = ctx.cookies.get('visit', {
    //     signed: true
    // })
    // if (visit) {
    //     visit++
    // } else {
    //     visit = 1
    // }
    // ctx.cookies.set('visit', visit, {
    //     signed: true
    // })
    // ctx.body = `当前第${visit}次访问`
})

app.use(router.routes())

app.listen(3000)
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.keys = ['zs']

const session = {}; // 用来存储用户和信息的映射关系（可以用数据库做持久化）,浏览器拿不到
const cardName = 'connect.sid'; // 卡的名字
const uuid = require('uuid')
router.get('/wash', async (ctx, next) => {
    // 洗澡的例子 
    // 第一次来洗澡 需要办一张卡 冲上钱，把卡号告诉你
    // 下次你自动带上卡 就ok
    let id = ctx.cookies.get(cardName,{signed:true});
    if (id && session[id]) {
        session[id].mny -= 20;
        ctx.body = `mny ` + session[id].mny;

    } else {
        let cardId = uuid.v4();
        session[cardId] = { mny: 500 };
        ctx.cookies.set(cardName, cardId, { httpOnly: true, signed: true });
        ctx.body = `mny 500`;
    }
})
app.use(router.routes())
app.listen(3000);
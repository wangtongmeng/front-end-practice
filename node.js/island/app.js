const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
	console.log(ctx.path)
	console.log(ctx.method)
})


app.listen(3000)

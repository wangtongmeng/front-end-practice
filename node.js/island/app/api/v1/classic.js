const Router = require('koa-router')
const router= new Router() 


router.post('/v1/:id/classic/latest', (ctx, next) => {
	// url 路径
	// 查询参数
	// header
	// body
	const path = ctx.params
	const query = ctx.request.query
	const headers = ctx.request.header
	const body = ctx.request.body
	ctx.body = { 
		key: 'classic' 
	}
})

module.exports = router
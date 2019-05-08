const Koa = require('koa')

const app = new Koa()

// app 称为应用程序对象，它有很多中间件

// // 函数
// function test () {
//   console.log('skjdflsdjf')
// }

// // 注册中间件

// app.use(test)

// 注册中间件，推荐匿名写法
app.use((ctx, next) => {
	// 洋葱模型
	console.log(1);
	
	next()
	console.log(2);
	
})
app.use((ctx, next) => {
	console.log(3);
	next()
	console.log(4);
})

// 前端发送 HTTP，KOA 接收 HTTP

app.listen(3000)

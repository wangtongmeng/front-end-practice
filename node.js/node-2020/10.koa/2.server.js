/**
 * 中间件的使用 next前面一定加await否则会显示意想不到的结果
 */
const Koa = require('koa')

const app = new Koa()


// 1.可以决定是否向下执行 例如，做权限，可以统一拦截。如果不合法不必向下执行
// 2.默认可以在中间件中扩展属性和方法。从上到下
// 3.分割逻辑 可以基于中间件 写一些插件


// 1.koa中所有的 use中传入的方法 都会包装成promise
// 2.会把所有的promise变成一个promise链(前提：内部next前面必须加await或者return)
// 3.所有的异步逻辑都必须包装成promise
const sleep = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve()
            console.log('sleep')
        }, 1000);
    })
}

// 如果加了 await next() 上一个人会等待下一个人的执行完毕
// 没有加await 第二个人中如果有异步逻辑，第一个人不用等待第二个逻辑执行完成
app.use(async function (ctx,next) { // 专门处理 /getUser
    // 开始执行
    console.log(1)
    next()
    console.log(2)
    // 结束执行
})
app.use(async function (ctx,next) { // 专门处理 /getUser
    console.log(3)
    await sleep()
    next()
    console.log(4)
})
app.use(async function (ctx,next) { // 专门处理 /getUser
    console.log(5)
    next()
    console.log(6)
})

// 132 sleep 564 =>1 3 遇到sleep卡死，但第一个next不需要等所以执行2 到时间执行sleep，之后继续 564

// 下一个中间件 /addUser

app.listen(3000)
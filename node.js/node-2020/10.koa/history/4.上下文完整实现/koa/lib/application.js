const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application {
    constructor(){
        // 我们不能直接把request赋值给context,因为有可能其中一个应用会改变request和response(例如扩展属性)
        this.context = Object.create(context) // 此方法一般用于继承 可以继承原本的属性，用户扩展，扩展到新对象 不会影响原来的对象
        this.request = Object.create(request)
        this.response = Object.create(response)
    }
    use(fn){
        this.fn = fn // 将use方法中的函数保存到实例上
    }
    createContext(req,res){
        // 每次都创建一个全新的上下文 保证每次请求之间互不干扰
        let ctx = Object.create(this.context)
        let request = Object.create(this.request)
        let response = Object.create(this.response)

        // request和response就是我们koa自己的对象
        // req,res就是原生的对象
        ctx.request = request
        ctx.response = response
        ctx.request.req = ctx.req = req
        ctx.response.res = ctx.res = res
        return ctx
    }
    handleRequest(req,res){
        let ctx = this.createContext(req,res)
        this.fn(ctx)
    }
    listen(...args){
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)

    }
}

module.exports = Application

// 1.koa基础版
// 2.koa中request和response实现
// 3.koa中的代理 request中的代理 context中的代理
// 4.上下文完整实现
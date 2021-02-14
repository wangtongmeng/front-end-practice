const http = require('http')
const Router = require('./router')
const methods = require('methods') // 第三方的 安装了express 就会安装

// 应用系统和路由系统的拆分
function Application() { // 创建应用时 会赠送一个路由系统，路由只有在用到的时候再创建

}

Application.prototype.lazy_route = function () {
    if (!this._router) {
        this._router = new Router()
    }
}

methods.forEach(method=>{
    // 用户调用的get方法
    Application.prototype[method] = function(path, ...handlers) {
        this.lazy_route()
        // 交给路由保存配置
        this._router[method](path, handlers)
    }

})
// 监听启动服务
Application.prototype.listen = function(...args) {
    const server = http.createServer((req, res) => {
        // 有可能由系统无法处理，就让应用自己来处理
        function done() {
            res.end(`Cannot ${req.method} ${req.url}`)
        }
        // 交给路由来匹配规则
        this.lazy_route()
        this._router.handle(req,res, done)
    })
    server.listen(...args)
}

module.exports = Application

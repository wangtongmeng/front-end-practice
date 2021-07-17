const http = require('http');
const Router = require('./router');

const methods = require('methods');

// 默认的规则  , 所有的应用都应该是分离的路由

// 延迟创建路径

function Application() { // 每次创建一个应用 就送给你一个路由系统
   
}
Application.prototype.lazy_route = function () {
    if(!this._router) this._router = new Router();
}
methods.forEach(method=>{
    Application.prototype[method] = function(path, ...handlers) {
        this.lazy_route();
        this._router[method](path,handlers); // 交给路由系统保存 我们的应用不参与我们的路由管理
    }
})

Application.prototype.listen = function(...args) {
    const server = http.createServer((req, res) => {
        this.lazy_route();
        function done(){ // 如果路由系统处理不了，就交给应用系统来处理
            res.end(`Cannot ${req.method} ${req.url}`);
        }
        this._router.handle(req,res,done);
    });
    server.listen(...args);
}
module.exports = Application;
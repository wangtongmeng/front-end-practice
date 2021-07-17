const url = require('url');
const Layer  = require('./layer');
const Route = require('./route');
const methods = require('methods');
function Router(){
    this.stack = []
}
// 外层的layer 考虑路径   里层的layer考虑方法 = 同一个类
Router.prototype.route = function(path){
    let route = new Route();
    let layer = new Layer(path,route.dispatch.bind(route)); // 每次调用get方法， 都会产生一个layer实例和一个route实例

    // 这个关联目的是可以在layer获取route的信息
    layer.route = route; // 路由中的layer 都有一个route属性 和 我们的route关联起来
    this.stack.push(layer)
    return route;
}
// app.get
methods.forEach(method=>{
    Router.prototype[method] = function (path,handlers) { // handlers 是用户定义get时传递过来的所有执行函数  （数组）
        let route = this.route(path); // 创建一个route实例
        // 创建一个layer  还要创建一个route，将handlers 传递给route
        route[method](handlers);
    
    }
})

Router.prototype.handle = function (req,res,done) {
    let {pathname} = url.parse(req.url);
    let method = req.method.toLowerCase()
    let idx = 0;
    const next =()=>{
        if(idx >= this.stack.length) return done(); // 路由处理不了 传递给应用层
        let layer = this.stack[idx++];

        if(layer.match(pathname) && layer.route.methods[method]){ // 这个next可以让路由层扫描下一个layer
            layer.handle_request(req,res,next); // route.dispatch
        }else{ // 如果路径不匹配执行下一层逻辑
            next();
        }
    }
    next(); // 请求来了取出第一个执行

}
module.exports = Router;



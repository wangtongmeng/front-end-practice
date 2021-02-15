const url = require('url')
const Layer = require('./layer')
const Route = require('./route')
const methods = require('methods')


function Router() {
    this.stack = []
}

// 1.创建route和layer layer上要有一个route属性
Router.prototype.route = function (path) {
    let route = new Route()
    // 每次调用get方法时 都产生一个layer(路径，对应route的dispatch方法)
    let layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route

    this.stack.push(layer) // 将这一层放到stack中
    return route
}

methods.forEach(method => {
    Router.prototype[method] = function (path, handlers) {
        console.log(method)
        let route = this.route(path) // 产生route
        route[method](handlers) // 将用户传入的真实回调 全部传到route中
    }
    
});

Router.prototype.use = function (path,handler) {
    if (typeof path === 'object') { // 如果只传递一个参数是函数
        handler = path // handler就是这个函数
        path = '/' // 路径默认是 /

    }
    let layer = new Layer(path,handler)
    layer.route = undefined // 只是提示 中间件没有route属性
    this.stack.push(layer)
}

// 请求到来时 会触发此方法
Router.prototype.handle = function (req, res, done) {
    let { 
        pathname
    } = url.parse(req.url)
    let requestMethod = req.method.toLowerCase()

    // 先遍历外层数组
    let idx = 0
    const next = () => {
        if(this.stack.length === idx) return done()
        let layer = this.stack[idx++]

        if(layer.match(pathname)){ // 无论是中间件还是路由 都要匹配路径
            if (layer.route){
                // 路由
                if(layer.route.match_method(req.method)){
                    layer.handle_request(req,res,next) // dispatch 里面处理完毕了 调用next方法
                }else {
                    next()
                }
            } else {
                // 中间件 路由匹配方法，中间件不匹配方法
                layer.handle_request(req,res,next)
            }
        } else {
            next()
        }


    }

    next()
}

module.exports = Router
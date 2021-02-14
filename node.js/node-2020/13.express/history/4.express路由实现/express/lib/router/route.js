const {
    Router
} = require('express')
const Layer = require('./layer')

function Route() {
    this.stack = []
}
Route.prototype.dispatch = function (req,res,out) {
    // 循环当前route中的layer 依次执行
    let idx = 0
    const next = () => {

        if(idx === this.stack.length) return out()
        let layer = this.stack[idx++]
        // 外层layer匹配路径 里层layer匹配方法
        // 匹配方法 可以直接写判断 不用封装了  因为method属性是自定义的
        if (layer.method === req.method.toLowerCase()) {
            layer.handle_request(req,res,next)
        } else {
            next()
        }
    }
    next()
}
Route.prototype.get = function (handlers) {
    handlers.forEach(handler => {
        const layer = new Layer('', handler)
        layer.method = 'get' // 给每一层增加了自定义属性 用来标识方法
        this.stack.push(layer)
    })
}

module.exports = Route
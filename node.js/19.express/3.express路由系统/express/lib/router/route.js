const Layer = require('./layer')

function Route() {
    this.stack = []
}

Route.prototype.get = function (handlers) { // handlers 为用户真实的所有的回调
    handlers.forEach(handler => {
        // 里层不考虑路径 所以是什么都无所谓
        const layer = new Layer('/', handler)
        layer.method = 'get' // 先写死
        this.stack.push(layer)
    })
}
Route.prototype.dispatch = function (req, res, out) { // 让用户定义的函数 依次执行
    // 等会请求来了 依次让this.stack 中的方法执行即可
    let requestMethod = req.method.toLowerCase()
    let idx = 0
    const next = () => {
        if (idx >= this.stack.length) return out()
        let layer = this.stack[idx++]
        if (layer.method === requestMethod) {
            layer.handler(res, res, next)
        } else {
            next()
        }
    }
    next()
}

module.exports = Route
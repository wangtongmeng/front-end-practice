function Layer(path, handler) {
    this.path = path
    this.handler = handler
}
Layer.prototype.match = function (pathname) {
    // 匹配路径时 需要看一下是路由还是中间件，中间件需要匹配 是否以他开头

    // /    /
    // /    如果是/表示都匹配
    // /use user/a

    if (this.path = pathname) {
        return true
    }
    if(!this.route) {
        // 中间件
        if (this.path == '/') {
            return true
        }
        return pathname.startsWith(this.path + '/')
    }
    return false
}
Layer.prototype.handle_request = function (req, res, next) {
    console.log('this.handler', this.handler)
    this.handler(req, res, next)
}

module.exports = Layer
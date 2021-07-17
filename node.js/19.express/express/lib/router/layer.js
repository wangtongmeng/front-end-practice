function Layer(path,handler) {
    this.path = path;
    this.handler = handler;
}
Layer.prototype.match = function (pathname) {
    if(this.path == pathname){
        return true
    }
    // 中间件只有开头就可以
    if (!this.route){
        if (this.path === '/'){ // / 可以匹配任何路径
            return true
        }
        // /user/add /user
        return pathname.startsWith(this.path + '/')
    }
    return false
}
Layer.prototype.handle_request = function (req,res,next) {
    this.handler(req,res,next)
}
module.exports = Layer;
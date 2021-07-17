const url = require('url')

function Router() {
    this.stack = []
}

Router.prototype.get = function (path, handler) {
    this.stack.push({
        path,
        handler,
        method: 'get'
    })
}

Router.prototype.handle = function (req, res, done) {
    let { pathname } = url.parse(req.url)
    let requestMethod = req.method.toLocaleLowerCase()
    for (let i = 0; i < this.stack.length; i++) { // 改成从0开始
        let { path, method, handler } = this.stack[i]
        if (path === pathname && requestMethod === method) {
            return handler(req, res)
        }
    }
    done()
}


module.exports = Router
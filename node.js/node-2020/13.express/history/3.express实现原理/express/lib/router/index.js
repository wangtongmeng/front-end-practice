const url = require('url')

function Router() {
    this.stack = [{
        path: '*',
        method: '*',
        handler: (req, res) => {
            res.end(`Cannot ${req.method} ${req.url}`)
        }
    }]
}

Router.prototype.get = function (path, callback) {
    this.stack.push({
        path,
        method: 'get',
        handler: callback
    })
}

Router.prototype.handle = function (req, res, done) {
    let {
        pathname
    } = url.parse(req.url)
    let requestMethod = req.method.toLowerCase()
    for (let i = 0; i < this.stack.length; i++) {
        let {
            path,
            method,
            handler
        } = this.stack[i]
        if (pathname == path && method == requestMethod) {
            return handler(req, res)
        }
    }
    this.stack[0].handler(req, res)
}

module.exports = Router
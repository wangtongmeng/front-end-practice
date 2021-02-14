const http = require('http')
const url = require('url')

const routes = [{
    path: '*',
    method: '*',
    handle: (req, res) => {
        res.end(`Cannot ${req.method} ${req.url}`)
    }
}]

const createApplication = function () {
    return {
        all(path, callback) {
            routes.push({
                path,
                method: 'all',
                handler: callback
            })
        },
        get(path, callback) {
            routes.push({
                path,
                method: 'get',
                handler: callback
            })
        },
        listen(...args) {
            const server = http.createServer((req, res) => {
                let {
                    pathname
                } = url.parse(req.url)
                let requestMethod = req.method.toLowerCase()
                for (let i = 0; i < routes.length; i++) {
                    let {
                        path,
                        method,
                        handler
                    } = routes[i]
                    if ((pathname == path || path == '*') && (method == requestMethod || method == 'all')) {
                        return handler(req, res)
                    }
                }
                routes[0].handler(req, res)
            })
            server.listen(...args)
        }
    }
}

module.exports = createApplication
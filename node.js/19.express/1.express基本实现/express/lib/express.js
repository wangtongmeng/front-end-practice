const http = require('http')
const url = require('url')

let routes = [{ // 默认的规则
    path: '*',
    method: 'all',
    handler(req, res) {
        res.end(`Cannot ${req.method} ${req.url}`)
    }
}]

function createApplication() {
    return {
        get(path, handler) {
            routes.push({
                path,
                method: 'get',
                handler
            })
        },
        listen(...args) {
            const server = http.createServer((req, res) => {
                let { pathname } = url.parse(req.url)
                let requestMethod = req.method.toLocaleLowerCase()
                for (let i = 1; i < routes.length; i++) {
                    let { path, method, handler } = routes[i]
                    if (path === pathname && requestMethod === method) {
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
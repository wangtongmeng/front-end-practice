const url = require('url')

// request对象是基于req进行的扩展
module.exports = {
    get path(){ // Object.defineProperty
        let {pathname} = url.parse(this.req.url)
        return pathname
    }
}
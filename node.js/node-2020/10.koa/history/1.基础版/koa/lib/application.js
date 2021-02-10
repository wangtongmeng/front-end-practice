const http = require('http')

class Application {
    use(fn){
        this.fn = fn // 将use方法中的函数保存到实例上
    }
    handleRequest(req,res){
        this.fn(req,res)
    }
    listen(...args){
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)

    }
}

module.exports = Application
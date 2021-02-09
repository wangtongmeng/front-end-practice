/**
 * 静态服务
 */

//  服务器 1) 返回静态文件 2) 返回数据


const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs').promises
const {
    createReadStream
} = require('fs')
const mime = require('mime')

// 写node代码 慢慢的就会放弃回调的方式 -> async + await + promise


// 解决this指向 可以采用箭头函数 / bind实现
class StaticServer {
    async handleRequest(req, res) {
        const {
            pathname
        } = url.parse(req.url, true) // 根据路径返回对应的资源
        let filePath = path.join(__dirname, pathname) // 因为pathname里含有/ 所以用join resolve遇到/会回到根路径

        try {
            // 需要你访问的是不是文件夹
            let statObj = await fs.stat(filePath)
            if (statObj.isFile()) { // mime 可以根据文件后缀来识别 是什么类型的  
                res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
                createReadStream(filePath).pipe(res) // res 是一个可写流 可读流.pipe(可写流)
                // let data = await fs.readFile(filePath)
                // res.end(data)
            } else {
                // 文件夹
                filePath = path.join(filePath, 'index.html')
                await fs.access(filePath) // 异步方法 不存在会报错 也可用 fs.exitSync
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                createReadStream(filePath).pipe(res)
            }
        } catch (e) {
            // 浏览器根据心情发的图标favicon.ico 
            this.sendError(e,req, res)
        }
    }
    start(...args) {
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
    sendError(e, req, res) {
        res.statusCode = 404
        res.end('Not Found')
    }
}

new StaticServer().start(3000, function () {
    console.log(`server start 3000`)
})
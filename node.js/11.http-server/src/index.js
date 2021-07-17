const http = require('http');
const url = require('url');
const path = require('path');
const util = require('./util');
const fs = require('fs').promises
const chalk = require('chalk'); // 第三方模块 颜色模块;
const mime = require('mime');
const { createReadStream ,readFileSync} = require('fs');
const ejs = require('ejs');
const template =readFileSync(path.resolve(__dirname,'template.html'),'utf8');
class Server {
    constructor(serverOptions) {
        this.port = serverOptions.port;
        this.directory = serverOptions.directory;
        this.cache = serverOptions.cache;
        this.gzip = serverOptions.gzip
        this.handleRequest = this.handleRequest.bind(this);
        this.template = template;
    }
    async handleRequest(req, res) {
        // 1.获取请求路径 以当前目录为基准查找文件，如果文件存在不是文件夹则直接返回
        let { pathname } = url.parse(req.url); // 获取解析的路径
        pathname = decodeURIComponent(pathname)
        let requestFile = path.join(this.directory, pathname);
        try {
            let statObj = await fs.stat(requestFile);
            if (statObj.isDirectory()) {
                const dirs = await fs.readdir(requestFile);
                // 根据数据和模板 渲染内容
                let fileContent = await ejs.render(this.template,{dirs:dirs.map((dir)=>({
                    name:dir,
                    url:path.join(pathname,dir)
                }))});
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(fileContent)
            } else {
                this.sendFile(req, res, requestFile)
            }
        } catch (e) {
            console.log(e)
            this.sendError(req, res, e);
        }
    }
    sendFile(req, res, requestFile) {
        // 我们返回文件 需要给浏览器提供内容类型 和 内容的编码格式
        res.setHeader('Content-Type', mime.getType(requestFile) + ';charset=utf-8');
        // 需要将文件读取出来并且返回

        // 如果你不结束，浏览器相当于没有接受完毕，
        createReadStream(requestFile).pipe(res); // 流. ws.write() ws.write() ws.end()
    }
    sendError(req, res, e) {
        res.statusCode = 404;
        res.end(`Not Found`)
    }
    start() {
        // 启动服务监听错误信息，如果端口占用 累加1
        const server = http.createServer(this.handleRequest);
        server.listen(this.port, () => { // 订阅方法 监听成功后会触发
            console.log(chalk.yellow('Starting up http-server, serving ./'))
            console.log(chalk.yellow('Available on:'));
            console.log(`http://` + util.getIp().address + `:${chalk.green(this.port)}`);
            console.log(`http://127.0.0.1:${chalk.green(this.port)}`);
        });
        server.on('error', (err) => {
            if (err.errno === 'EADDRINUSE') {
                server.listen(++this.port)
            }
        })
    }
}


module.exports = Server
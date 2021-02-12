// bodyparser实现
//   普通格式解析 form-data格式处理 文件上传解析
const querystring = require('querystring')
const uuid = require('uuid')
const fs = require('fs')
const path = require('path')

module.exports = function bodyParser(uploadDir) {
    return async (ctx, next) => {
        ctx.request.body = await body(ctx, uploadDir)
        return next() // 或者 await next()
    }
}

async function body(ctx, uploadDir) {
    return new Promise((resolve, reject) => {
        // 读请求体 一定是流的方式
        let arr = []
        ctx.req.on('data', function (chunk) {
            arr.push(chunk)
        })
        ctx.req.on('end', function () {
            // username=123&password=123

            // 客户端传来的格式 请求体时
            // 1.表单格式 a=1&b=2
            // 2.json格式 {a:1,b:2}
            // 3.文件格式

            // Content-Type: application/x-www-form-urlencoded
            let type = ctx.get('content-type') // req.headers
            let data = Buffer.concat(arr) // 用户传递的数据

            if (type === 'application/x-www-form-urlencoded') {
                // 表单格式  a=1&b=2
                resolve(querystring.parse(data.toString())) // 将字符串格式转换成对象
            } else if (type === 'application/json') {
                // json格式
                resolve(JSON.parse(data.toString()))
            } else if (type === 'text/plain') {
                // 文本类型
                resolve(data.toString())
            } else if (type.startsWith('multipart/form-data')) {
                // 二进制类型 form-data格式处理
                // 给我当前客户端提交的数据 和 一个分隔符multipart/form-data 后面会给
                let boundary = '--' + type.split('=')[1]
                let lines = data.split(boundary)
                lines = lines.slice(1, -1) // 需要的三行数据 (4个分隔符分成5份，要中间的三份)
                // 二进制数据 分割成 多个行
                let resultObj = {}
                lines.forEach(line => {
                    let [head, body] = line.split('\r\n\r\n')
                    if (head) {
                        // head
                        // Content-Disposition: form-data; name="username"

                        // Content-Disposition: form-data; name="password"

                        // Content-Disposition: form-data; name="avatar"; filename="a.txt"
                        // Content-Type: text/plain
                        let key = head.toString().match(/name="(.+?)"/)[1]
                        if (!head.includes('filename')) {
                            // 如果没有filename
                            resultObj[key] = body.slice(0, -2).toString() // 去掉换行回车
                        } else {
                            let originalName = head.toString().match(/filename="(.+?)"/)[1]
                            // 是文件 文件上传
                            let filename = uuid.v4() // 产生一个唯一的文件名

                            // 获取文件内容
                            let content = line.slice(head.length+4,-2) // 获取中间的内容部分

                            fs.writeFileSync(path.join(uploadDir, filename), content)
                            resultObj[key] = (resultObj[key] || [])
                            resultObj[key].push({
                                size: content.length,
                                name:originalName,
                                filename
                            })


                        }
                    }
                })
                resolve(resultObj)
            } {
                resolve()
            }
        })
    })
}

// 11&111&222&44 buffer.indexOf('字符串)
Buffer.prototype.split = function (boundary) { // 分割二进制
    let arr = []
    let offset = 0
    let currentPosition = 0
    // 找到当前分隔符的位置 只要能找到就一直查找
    while (-1 != (currentPosition = this.indexOf(boundary, offset))) {
        arr.push(this.slice(offset, currentPosition))
        offset = currentPosition + boundary.length
    }
    arr.push(this.slice(offset))
    return arr
}
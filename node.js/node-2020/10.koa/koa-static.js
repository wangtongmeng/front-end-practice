const path = require('path')
const fs = require('fs').promises
const mime = require('mime')
const {createReadStream} = require('fs')

module.exports = function koaStatic(dirname) {
    return async (ctx, next) => {
        let filePath = path.join(dirname, ctx.path)
        try {
            let statObj = await fs.stat(filePath) // 如果判断是目录还是文件用stat，如果只是单纯的判断是否找的到用access
            if (statObj.isFile()) {
                ctx.set('Content-Type', mime.getType(filePath)+';charset=utf-8')
                ctx.body = createReadStream(filePath) // rs.pipe(res)
            } else {
                await next()
            }
        } catch (e) {
            // 理论上找index.html...
            await next()

        }

    }
}
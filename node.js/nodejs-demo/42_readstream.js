// stream 有方向的数据
const fs = require('fs')

const rs = fs.createReadStream('./42_readstream.js')

rs.pipe(process.stdout) // 控制台
let path = require('path')

module.exports = {
  mode: 'development', // 模式， production/development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist') // 路径必须是绝对路径，通过 node 的核心模块 path 解析
  }
}
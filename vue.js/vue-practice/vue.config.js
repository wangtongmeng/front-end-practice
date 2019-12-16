const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}

module.exports = {
  chainWebpack: (config)=>{
    config.resolve.alias
      // 第一个参数：别名 第二个参数：路径
      .set('@c', resolve('./src/components'))
      .set('@css', resolve('./src/assets/css'))
      .set('@views', resolve('./src/views'))
  }
}
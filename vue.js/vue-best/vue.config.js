const path = require('path')

const port = 7070
const title = 'vue项目最佳实践'

// resolve定义一个绝对路径获取函数
function resolve (dir) { 
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/best-practice', // 部署应用包时的基本 URL
  devServer: {
    port: port
  },
  configureWebpack: {
    // 向index.html注入标题
    name: title
  },
  chainWebpack (config) {
    // 配置svg规则排除icons目录中svg文件处理
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    // 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" }) 
      .end();
  }
}


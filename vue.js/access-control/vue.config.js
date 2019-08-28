const path = require('path')

// resolve 定义一个绝对路径获取函数
function resolve(dir) {
  return path.join(__dirname, dir)
}

// commonjs nodejs
const port = 7071
const title = '权限控制demo'



module.exports = {
  publicPath: 'best-practice',
  devServer: {
    port
  },
  configureWebpack: {
    name: title
  },
  chainWebpack(config) {
    // svg 规则配置一下，排除 icons 目录
    config.module.rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // 新增 icons 规则，设置 svg-sprite-loader
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' }) // 使用图表名称
      .end()
  }
}

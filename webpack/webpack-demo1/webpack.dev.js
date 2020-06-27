const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


// webpack开发环境下配置
module.exports = {
  mode: 'development',
  devServer: {
    // 服务端口号
    port: 9999,
    // 自动在浏览器打开
    // open: true,
    // gzip压缩
    compress: true, // true 启动
    hot: true, // 整改页面热更新
    contentBase: 'aa', // aa目录下的静态资源文件可以直接访问
    before(app){ // after 以9999端口号创建一个服务，这样没有跨域问题
      app.get('/api/user', function (req, res) {
        console.log(res.json({
          name: 'lisi'
        }))

      })

    },
    // proxy: {
    //   "/api": { // 请求路径以/api开头
    //     target: 'http://localhost:6000', // 设置请求
    //     // secure: false, // 代理的服务器是https
    //     changeOrigin: true, // 把请求头里host的地址改成服务器地址
    //     pathRewrite: {"/api": ""}, // 重写路径
    //   }
    // }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 局部页面热更新，不用整改页面刷新了
    new BundleAnalyzerPlugin()
  ]
}
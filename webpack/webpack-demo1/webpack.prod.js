// webpack生产环境下配置
const TerserJSPlugin = require('terser-webpack-plugin'); // 压缩js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
module.exports = {
  mode: 'production',

  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
}
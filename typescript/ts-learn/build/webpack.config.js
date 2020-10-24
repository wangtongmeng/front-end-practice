const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 编译入口文件
  entry: "./src/index.ts",
  // 编译后的输出文件信息
  output: {
    filename: "main.js"
  },
  resolve: {
    //自动解析文件，如 import xxx from './index.js' 如果配置了extension，可以不写扩展名 import xxx from './index
    extensions: ['.ts', '.tsx', '.js'] // .tsx文件中会写一些包含jsx的代码
  },
  // 使用指定loader处理指定后缀文件
  module: {
    rules: [{
      test: /\.tsx?$/, // 后缀为.ts / .tsx
      use: 'ts-loader', // npm install ts-loader -D
      exclude: '/node_modules/'
    }],
  },
  // source-map 方便代码调试
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  // 本地开发服务器的配置
  devServer: {
    // 本地开发服务运行时，基于的文件目录
    contentBase: './dist',
    // 启动本地服务后，在控制台打印哪些信息
    stats: 'errors-only',
    // 不启动压缩
    compress: false,
    host: 'localhost',
    port: 8089
  },
  plugins: [
    // clean-webpack-plugin，清理指定的文件夹/文件
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['/.dist']
    }),
    // html-webpack-plugin，指定一个编译的html模板文件，此后的编译会基于此模板进行编译。webpack会自动在模板文件中引入js文件，不需要手动引入
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    })
  ]
}
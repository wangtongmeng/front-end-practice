// 遵循commonjs规范
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin'); // 压缩js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    // 出口文件名
    filename: 'bundle.js',
    // 绝对路径
    path: path.resolve(__dirname, 'dist') //返回绝对路径， __dirname：文件所在目录，与'dist'组成绝对路径
  },
  devServer: {
    // 服务端口号
    port: 9999,
    // 自动在浏览器打开
    open: true,
    // gzip压缩
    compress: true, // true 启动
    contentBase: 'aa', // aa目录下的静态资源文件可以直接访问
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniExtractPlugin({
      // 分离的css文件名
      filename: 'css/main.css'
    }),
    // 打包后js自动插入到html中
    new HtmlWebpackPlugin({
      // 根据模板生成新的html文件
      template: path.resolve(__dirname, './index.html'),
      // 生成的新的文件名
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    // 什么文件转换，怎么转换，需要哪些loader
    // use 的值可以是"" [] {}
    // loader执行顺序：从下往上，从右往左执行
    rules: [
      // { test: '/\.css$/', use: 'style-loader' },
      // { test: '/\.css$/', use: 'css-loader' },
      // {
      //   test: /\.css$/i,
      //   // use: ['style-loader', 'css-loader'],
      //   use: ['style-loader', {
      //     // css文件中less的情况
      //     loader: 'css-loader',
      //     options: {
      //       importLoaders: 2 // 用后面几个加载器来解析
      //     }
      //   }, 'postcss-loader', 'less-loader'],
      // },
      {
        test: /\.css$/i,
        // 由于要分离css，这里去掉style-loader
        use: [{
          loader: MiniExtractPlugin.loader
        }, {
          // css文件中less的情况
          loader: 'css-loader',
          options: {
            importLoaders: 2 // 用后面几个加载器来解析
          }
        }, 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ]
  }
}
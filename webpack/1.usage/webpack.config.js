const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//压缩JS
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // mode: process.env.NODE_ENV,
  mode: 'none', // 方便测试
  devtool: false, // 不生成任何sourcemap
  entry: './src/index.js',
  // entry: {
  //   entry1: './src/entry1.js',
  //   entry2: './src/entry2.js'
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    filename: '[chunkhash:8].js',
    // publicPath: '/'
  },
  optimization:{
    minimize:true,
    minimizer:[
      new TerserPlugin()
    ]
  },
  devServer: {
    compress: true, // 是否启动压缩 gzip
    port: 8080, // 服务器监听的端口号
    open: true, // 是否打开浏览器提供访问
    // proxy: {
    //   "/api": 'http://localhost:3000', // /api开头的会被代理到3000端口
    // },
    before(app) {
      app.get('/api/users', function (req, res) {
        res.json([{ id: 1, name: 'zhufeng' }])
      })
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', // es6 -> re5
                '@babel/preset-react', // react -> es5
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ['@babel/plugin-proposal-private-methods', { loose: true }],
              ],
            },
          },
        ],
      },
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader, // css转成js
          {
            loader: 'css-loader', // url @import 进行处理
            options: {
              // 在处理引入的别的CSS的文件，要先把别的CSS文件经过几个loader的处理结果 合并到当前文件中
              importLoaders: 1,
              modules: false,
            },
          },
          'postcss-loader', // css预处理器 处理厂商样式兼容
          {
            loader:'px2rem-loader',
            options:{
              remUnit:75,//规定一个REM单位是75px
              remPrecession:8 //计算REM的精度,保留几位小数
            }
          }
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // css转成JS 结果 一定是JS，因为它的结果就是给webpack用了
          {
            loader: 'css-loader', // url import 进行处理
            options: {
              importLoaders: 2, // 写1或者2都可以，因为less内部会把import处理成css
            },
          },
          'postcss-loader',
          'less-loader', // 把less编译成css  在这一步已经 把import 进行转换CSS了
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|bmp|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[hash:10].[ext]',
            limit: 8 * 1024,
            outputPath: 'images',
            publicPath: '/images'
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify:{
        removeComments:true,
        collapseWhitespace:true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css' // 也可以指定输出目录
    })
  ]
};
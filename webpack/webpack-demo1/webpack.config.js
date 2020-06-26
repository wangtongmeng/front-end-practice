// 遵循commonjs规范
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin'); // 压缩js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')
let htmlPlugins = ['index', 'other'].map(chunkName => {
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `./${chunkName}.html`),
    filename: `./${chunkName}.html`,
    chunks: [chunkName]
  })
})

module.exports = {
  devtool: "cheap-module-eval-source-map",
  // externals: {
  //   "jquery": "$" // 如果是第三方库jquery就不需要打包
  // },
  // 入口
  entry: './src/index.js',
  // 多入口
  // entry: {
  //   index: './src/index.js',
  //   other: './src/other.js'
  // },
  // 出口
  output: {
    // 出口文件名
    // filename: 'bundle.js',
    // 多出口
    filename: '[name].js',
    // 绝对路径
    path: path.resolve(__dirname, 'dist') //返回绝对路径， __dirname：文件所在目录，与'dist'组成绝对路径
  },
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
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 局部页面热更新，不用整改页面刷新了
    // new MiniExtractPlugin({
    //   // 分离的css文件名
    //   filename: 'css/main.css'
    // }),
    // 打包后js自动插入到html中
    new HtmlWebpackPlugin({
      // 根据模板生成新的html文件
      template: path.resolve(__dirname, './index.html'),
      // 生成的新的文件名
      filename: 'index.html', // 服务器默认会找到根目录下的index.html文件解析
      // minify: false
      // chunks: ['index', 'other'] // 配置indexhtml，引入多入口js
    }),
    // new HtmlWebpackPlugin({
    //   // 根据模板生成新的html文件
    //   template: path.resolve(__dirname, './index.html'),
    //   // 生成的新的文件名
    //   filename: 'index.html', // 服务器默认会找到根目录下的index.html文件解析
    //   // minify: false
    //   chunks: ['index'] // 配置index.html引入 index.js
    // }),
    // new HtmlWebpackPlugin({
    //   // 根据模板生成新的html文件
    //   template: path.resolve(__dirname, './other.html'),
    //   // 生成的新的文件名
    //   filename: 'other.html', // 服务器默认会找到根目录下的index.html文件解析
    //   // minify: false
    //   chunks: ['other'] // 配置ohter.html引入 ohter.js
    // }),
    // ...htmlPlugins,
    new CleanWebpackPlugin(),
    // 把引入模块的变量变成每个模块都能使用，但不是放在window上的
    // new webpack.ProvidePlugin({
    //   "$": "jquery" // 变量$来自于jquery
    // })
    // new BundleAnalyzerPlugin()
  ],
  module: {
    // 什么文件转换，怎么转换，需要哪些loader
    // use 的值可以是"" [] {}
    // loader执行顺序：从下往上，从右往左执行
    rules: [
      // {
      //   test: /\.js$/,
      //   use: 'eslint-loader',
      //   exclude: /node_modules/,
      //   // include: path.resolve(__dirname, 'src/**/*'),
      //   enforce: 'pre' // 在所有规则之前先校验代码
      // },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$'],
        },
      },
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
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
        use: [
        //   {
        //   loader: MiniExtractPlugin.loader
        // }, 
        {
          loader: 'style-loader'
        },
        {
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
      {
        test: /\.(png|jpe?g|gif)$/,
        // use: 'file-loader'
        // use: {
        //   loader: 'url-loader', // 10kb以内的通过url-loader转换成base64，大于10kb通过file-loader拷贝一份放在dist目录下
        //   options: {
        //     // 小于limit值得->base64
        //     limit: 10*1024, // 10kb
        //     esModule: false, // https://blog.csdn.net/weixin_43047070/article/details/104079940
        //     // 输出路径
        //     // name: `img/[name].[ext]`,
        //     outputPath: 'img', // dist/img/
        //     // 图片前缀，常用于将图片放在在线保存网站上，例如七牛
        //     // publicPath: 'http://www.baidu.com/img'
        //   }
        // }
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.js$/,
        loader: {
          loader: 'babel-loader',
          // 一般babel的配置项会写在配置文件.babelrc中，因为比较多
          // options: {
          //   presets: ["@babel/preset-env"], // 插件的集合
          //   plugins: [] // 单个插件
          // }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // async 异步代码 all 所有
      minSize: 30000, // 至少30kb才抽离
      // minRemainingSize: 0,
      // maxSize: 0,
      minChunks: 1, // 至少引用模块一次
      maxAsyncRequests: 6, // 请求最多不超过6次
      maxInitialRequests: 4, // 首屏请求次数不超过三次
      automaticNameDelimiter: '~', // 抽离模块名称的连接符
      name: true, // 可以更改模块名
      cacheGroups: { // 自己设置一些规则
        defaultVendors: {
          test: /[\\/]node_modules[\\/](jquery)/,
          priority: -2
        },
        default: {
          minChunks: 1,
          priority: -2,
          reuseExistingChunk: true
        }
      }
    }
  }
}
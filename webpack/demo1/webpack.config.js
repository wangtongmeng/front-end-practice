const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
module.exports = {
  entry: './src/index.js',
  // entry: {
  //   index: './src/index.js',
  //   login: './src/login.js'
  // },
  output: {
    filename: 'main.js',
    // filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'production',
  module: {
    // rules: [
    //   {
    //     test: /\.css$/,
    //     use: 'style-loader'
    //   }
    // ],
    rules: [
      {
        test: /\.(png|jpe?g|gif)/,
        use: {
          // loader: 'file-loader',
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
            outputPath: 'image/',
            // 小于 10k，才转换为base64
            limit: 1024 * 10
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my app',
      filename: 'app.html',
      template: './src/index.html'
    })
  ]
}
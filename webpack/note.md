# webpack

初始化项目 npm init -y

安装 webpack，npm install webpack webpack-cli -D

## 零配置打包

npm 版本 > 5.2，可以使用零配置打包命令，npx webpack

部分es6语法，webpack自身可以转换成es5，

会自动找到webpack命令进行打包，node_modules/.bin/webpack

## 使用配置文件

### 使用脚本执行webpack命令

打包命令是通过找到node_modules/.bin/webpack进行执行的

``` json
// package.json
{
  "scripts": {
    "dev": "webpack --mode development", // mode 模式名为development时，打包后代码不压缩
    "build": "webpack --mode production" // mode 模式名为production时，打包后代码压缩
  },
}
```

执行 npm run dev 执行打包命令

## 打包后js自动插入到html中，在浏览器中查看

npm i --save-dev html-webpack-plugin

## 配置开发服务

npm i webpack-dev-server -D，在本地起一个服务，并自动在浏览器打开

通过找到 /node_modules/.bin/webapck-dev-server命令进行执行，在package.json中配置

``` json
// package.json
{
  "scripts": {
    //...
    "dev:server": "webpack-dev-server"
  },
}
```

使用webpack-dev-server命令打包的内容是保存在内存中

## 引入css文件

使用loader加载器，对代码进行转换

css-loader解析css，style-loader将解析后的代码放在style标签中

npm i css-loader style-loader -D

预处理器
less: less(less核心模块) less-loader(解析less)
sass: node-sass sass-loader
stylus: stylus stylus-loader

npm i less less-loader -D

在js文件中引入css文件

在js文件中引入less文件

在css文件中引入less文件

## 浏览器兼容性处理

样式的兼容性处理，添加各个浏览器的私有前缀

使用postcss-loader样式处理工具，可以借助自定义的插件从而重新定义css

**安装加载器及插件**

npm install postcss-loader autoprefixer -D

**在postcss.config.js中进行配置自定义的插件**

加私有前缀的插件：autoprefixer，https://www.npmjs.com/package/autoprefixer

``` js
// postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
```

**在webpack配置中配置postcss**

``` js
// webpack.config.js
module.exports = {
    //...
    module: {
        rules: [{
            test: /\.css$/i,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    importLoaders: 2
                }
            }, 'postcss-loader', 'less-loader'],
        }, ]
    }
}
```

**配置postcss浏览器作用范围**

高版本浏览器会默认不加前缀，需要配一下浏览器范围，https://github.com/browserslist/browserslist

.browserslistrc

``` 
cover 99.5%
```

## 分离css文件

使用插件：mini-css-extract-plugin，https://www.npmjs.com/package/mini-css-extract-plugin

**安装**

npm install --save-dev mini-css-extract-plugin

**配置**

分离css，所以不是把css代码放在style标签中，而是通过link标签引入

* 使用MiniExtractPlugin.loader代替style-loader
* 使用插件
* css代码压缩
* 执行npm run build 后，css和js代码都是压缩的

如果配置了css压缩，js的压缩会失效，需要重新配置

生产环境下安装 npm i terser-webpack-plugin optimize-css-assets-webpack-plugin

``` js
// webpack.config.js
const MiniExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin'); // 压缩js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
module.exports = {
    //...
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new MiniExtractPlugin({
            // 分离的css文件名
            filename: 'css/main.css'
        }),
    ],
    module: {
        rules: [

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
```
## 打包自动清理输出的目录

clean-webpack-plugin，https://www.npmjs.com/package/clean-webpack-plugin

**安装**

npm install --save-dev clean-webpack-plugin

**使用**

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  //...
  plugins: [
    new CleanWebpackPlugin(),
  ]
}
```
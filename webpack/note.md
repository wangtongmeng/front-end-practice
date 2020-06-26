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

``` js
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
module.exports = {
    //...
    plugins: [
        new CleanWebpackPlugin(),
    ]
}
```

## 加载图片

file-loader，加载图片，并拷贝到dist目录下

url-loader，将图片解析成base64格式

**安装**

npm install file-loader url-loader -D

**图片不放在本地服务时**

图片不是放在本地服务器时，需要加前缀

http://www.baidu.com/img/14aa94b419fb8865bb8cb9fb704f2019.jpg

当css、js文件需要使用cdn时，也可以使用publicPath来设置

``` js
{
    test: /\.(png|jpe?g|gif)$/,
    // use: 'file-loader'
    use: {
        loader: 'url-loader', // 10kb以内的通过url-loader转换成base64，大于10kb通过file-loader拷贝一份放在dist目录下
        options: {
            // 小于limit值得->base64
            limit: 10 * 1024, // 10kb
            // 输出路径
            outputPath: 'img', // dist/img/
            // 图片前缀，常用于将图片放在在线保存网站上，例如七牛
            // publicPath: 'http://www.baidu.com/img'
        }
    }
},
```

**字体图标**只能用file-loader解析，不能使用url-loader

在iconfont网站选择两个图标，添加至项目，选择font class，下载至本地, 复制文件到项目

* iconfont.css
* iconfont.eot
* iconfont.svg
* iconfont.ttf
* iconfont.woff
* iconfont.woff2

使用file-loader解析

``` js
{
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    use: 'file-loader'
}
```

**解析通过img标签加载的图片(处理html中的图片)**

``` html
<!-- index.html -->
<img src="./src/img1.jpg" alt="">
```

打包完了还是<img src="./src/img1.jpg" alt="">，控制台：GET http://localhost:9999/src/img1.jpg 404 (Not Found)

html-withimg-loader: 处理html文件中的图片，npm i html-withimg-loader -D

``` js
module.exports = {
    module: {
        rules: [{
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.css$/i,
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
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    options: {
                        limit: 10 * 1024,
                        esModule: false, // 使用html-withimg-loader时，要设为false
                        outputPath: 'img',
                    }
                }
            },
        ]
    }
}
```

webpack4使用html-withimg-loader遇到问题 https://blog.csdn.net/weixin_43047070/article/details/104079940

## 打包js

webpack默认可以打包部分js代码，但不能打包所有

* 不能把es6中的 class 转换成es5
  + 使用babel
    - babel-loader babel和webpack的桥梁
    - @babel/core babel的核心模块
    - @babel/preset-env 把es6转换成es5，它是插件的集合
    - 依赖顺序：babel-loader -> @babel/core -> @babel/preset-env
    - 安装：npm i babel-loader @babel/core @babel/preset-env -D
* Promise转换
  + npm install --save core-js@3

``` js
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
```

配置.babelrc

``` js
{
    // 插件的集合
    "presets": [
        ["@babel/preset-env", {
            "useBuiltIns": "usage", // 按需加载，通过corejs查找到相应的插件
            "corejs": 3 // babel/polyfill，解析高标准的语法，例如 Promise
        }]
    ],
    // 单个插件
    "plugins": []
}
```

## 减少冗余代码，如多个class

每多一个class 都会定义一个classCallCheck，用来编译class

* npm i @babel/plugin-transform-runtime @babel/runtime -D

``` js
//.babelrc
{
    // 插件的集合
    "presets": [
        ["@babel/preset-env", {
            "useBuiltIns": "usage", // 按需加载，通过corejs查找到相应的插件
            "corejs": 3 // babel/polyfill，解析高标准的语法，例如 Promise
        }]
    ],
    // 单个插件
    "plugins": [
        "@babel/plugin-transform-runtime" // @babel/plugin-transform-runtime插件会调用@babel/runtime插件，减少代码冗余，如多次定义classCallCheck，用来编译class
    ]
}
```

## 草案语法

### 类私有属性写法

> https://babeljs.io/docs/en/babel-plugin-proposal-class-properties

* npm install --save-dev @babel/plugin-proposal-class-properties

``` js
{
    // 插件的集合
    "presets": [ // 从下往上加载
        ["@babel/preset-env", {
            "useBuiltIns": "usage", // 按需加载，通过corejs查找到相应的插件
            "corejs": 3 // babel/polyfill，解析高标准的语法，例如 Promise
        }]
    ],
    // 单个插件
    "plugins": [ // 从上往下加载
        ["@babel/plugin-proposal-decorators", {
            "legacy": true
        }],
    ]
}
```

### 装饰器(用来操作类的)

> https://babeljs.io/docs/en/babel-plugin-proposal-decorators

* npm install --save-dev @babel/plugin-proposal-decorators
* **装饰器插件**必须在**类插件**的前面，并且装饰器插件legacy: true时，类插件模式必须为loose

``` js
{
    // 插件的集合
    "presets": [ // 从下往上加载
        ["@babel/preset-env", {
            "useBuiltIns": "usage", // 按需加载，通过corejs查找到相应的插件
            "corejs": 3 // babel/polyfill，解析高标准的语法，例如 Promise
        }]
    ],
    // 单个插件
    "plugins": [ // 从上往下加载
        ["@babel/plugin-proposal-decorators", {
            "legacy": true
        }],
        ["@babel/plugin-proposal-class-properties", {
            "loose": true
        }]
    ]
}
```

## 跨域

安装express， npm install express -D

创建并启动服务，node server.js

``` js
// server.js
let express = require('express')
let app = express()
app.get('/user', function(req, res) {
    console.log(req.headers)
    res.json({
        name: 'zhangsan'
    })
})
app.listen(6000, () => {
    console.log('启动服务 port 6000')
})
```

请求这个接口

``` js
// index.js
let xhr = new XMLHttpRequest()
xhr.open('get', '/api/user', true)
xhr.onreadystatechange = function() {
    console.log(xhr.response)
}
xhr.send()
```

通过proxy设置跨域代理

``` js
module.exports = {
    devServer: {
        // 服务端口号
        port: 9999,
        // 自动在浏览器打开
        // open: true,
        // gzip压缩
        compress: true, // true 启动
        contentBase: 'aa', // aa目录下的静态资源文件可以直接访问
        proxy: {
            "/api": { // 请求路径以/api开头
                target: 'http://localhost:6000', // 设置请求
                // secure: false, // 代理的服务器是https
                changeOrigin: true, // 把请求头里host的地址改成服务器地址
                pathRewrite: {
                    "/api": ""
                }, // 重写路径
            }
        }
    },
}
```

## mock数据

``` js
module.exports = {
    devServer: {
        // 服务端口号
        port: 9999,
        // 自动在浏览器打开
        // open: true,
        // gzip压缩
        compress: true, // true 启动
        contentBase: 'aa', // aa目录下的静态资源文件可以直接访问
        before(app) { // after 以9999端口号创建一个服务，这样没有跨域问题
            app.get('/api/user', function(req, res) {
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
}
```

## webapck优化

### 暴露全局变量

* 直接使用cdn的方式
* providePlugin '$': 'jquery'
* 暴露的方式 expose-loader

**cdn的方式**

``` html
<!-- index.html -->

<body>
    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.js"></script>
</body>
```

``` js
// a.js
console.log('a', jQuery)
// index.js
import './a'
console.log('index', jQuery)
```

都可以拿到jQuery

**使用插件的形式**

* 安装jquery：npm i jquery -D

只在模块中引入

``` js
// a.js
import $ from 'jquery'
console.log('a', $)
// index.js
import './a'
import $ from 'jquery'
console.log('index', $)
```

存在的问题，在模块中引用了多少次，就会打包多少次，bundle.js  429KB

做处理，如果是第三方模块就不需要打包

``` js
module.exports = {
    externals: {
        "jquery": "$" // 如果是第三方库jquery就不需要打包
    },
}
```

npm run dev，bundle.js 110 KB

使用providePlugin

``` js
// webpack.config/js
const webpack = require('webpack')
module.exports = {
    plugins: [
        // 把引入模块的变量变成每个模块都能使用，但不是放在window上的
        new webpack.ProvidePlugin({
            "$": "jquery" // 变量$来自于jquery
        })
    ],
}
```

这样在模块中直接使用$即可，缺点是$从哪里来的不直观

**把变量暴露在window下**

expose-loader 把某个库的变量暴露在window下面，npm i expose-loader -D，https://www.npmjs.com/package/expose-loader

两种使用方式

行内式

``` js
// index.js
require('expose-loader?$!jquery')
console.log('index', $)
// a.js
require('expose-loader?$!jquery')
console.log('a', $)
```

全局配置

``` js
// webapck.config.js
module.exports = {
    module: {
        rules: [{
            test: require.resolve('jquery'),
            loader: 'expose-loader',
            options: {
                exposes: ['$'],
            },
        }, ]
    }
}
```

``` js
// index.js
import $ from 'jquery'
import './a' // a模块需要放在下面，这样只需要在全局引入一次即可
console.log('index', window.$)
// a.js
console.log('a', $)
```

### 添加eslint

1)手动的 2)自动的
安装 `eslint` 

``` bash
npm install eslint eslint-loader -D
npx eslint --init # 初始化配置文件
```

``` js
module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            use: 'eslint-loader',
            exclude: /node_modules/,
            // include: path.resolve(__dirname, 'src/**/*'),
            enforce: 'pre' // 在所有规则之前先校验代码
        }, ]
    }
}
```

> 配置 `eslint-loader` 可以实时校验js文件的正确性， `pre` 表示所有 `loader` 执行前执行

手动配置

https://eslint.org/demo，配置完下载.eslint.json(重命名文件，需要加个点)

2需要校验，0不需要校验

自动配置

npx eslint --init

### sourceMap(代码排查)

https://webpack.docschina.org/configuration/devtool/
https://www.cnblogs.com/wangyingblog/p/7027540.html

* eval 生成代码 每个模块都被eval执行，每一个打包后的模块后面都增加了包含sourceURL
* source-map 产生map文件
* inline 不会生成独立的 .map文件，会以dataURL形式插入
* cheap 忽略打包后的列信息，不使用loader中的sourcemap
* module 没有列信息，使用loader中的sourcemap(没有列信息)

开发环境推荐：
cheap-module-eval-source-map
生产环境推荐：
cheap-module-source-map(webpack4自带，不需要配置)

使用后，报错行会保持一致，方便定位

### 图片压缩

在不影响品质的前提下，进行一定的压缩

* image-webpack-loader，https://www.npmjs.com/package/image-webpack-loader
* npm i image-webpack-loader -D

``` js
// 主要修改品质参数即可
{
    test: /\.(png|jpe?g|gif)$/,
    use: [
        'file-loader',
        {
            loader: 'image-webpack-loader',
            options: {
                mozjpeg: {
                    progressive: true,
                    quality: 65
                },
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
```

### 根据Mode分离配置环境

### Tree-shaking(生产环境下)

去掉具有副作用的代码 sideEffects

``` js
// test.js
const minus = (a, b) => {
    return a - b
}

console.log('minus', minus(10, 5))

export default minus
// index.js
import minus from './test' // 副作用：test代码只在自己模块执行，在index模块没有使用
```

``` json
// package.json
  {
      "sideEffects": false,
  }

* 缺点会忽略css的打包，需要设置不忽略css

```json
// package.json
  {
      "sideEffects": ["**/*.css"],
  }
```

sideEffects只有在生成环境才生效，所以需要通过npm run build 打包确认

### Scope-Hoisting

webpack4后不用配，天生自带 减少作用域提升性能

### 热更新

热更新的功能是在style-loader中的，如果我们抽离了css代码，热更新就会失效

* hot:true
* HotModuleReplacementPlugin
* module.hot.accept

去掉分离css的样式即可，此时的更新是整改浏览器的刷新

``` js
// webpack.config.js
module.exports = {
    devServer: {
        port: 9999,
        compress: true, // true 启动
        hot: true,
        contentBase: 'aa', // aa目录下的静态资源文件可以直接访问
        before(app) { // after 以9999端口号创建一个服务，这样没有跨域问题
            app.get('/api/user', function(req, res) {
                console.log(res.json({
                    name: 'lisi'
                }))

            })

        },
    },
    plugins: [
        // new MiniExtractPlugin({
        //   // 分离的css文件名
        //   filename: 'css/main.css'
        // }),
    ],
    module: {
        rules: [
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
                }, 'postcss-loader', 'less-loader'
            ],
        },
    ]
}
}
```

### 懒加载(动态加载)

* webpackChunkName chunkFilename
* webpackPrefetch
* webpackPreload
* @babel/plugin-syntax-dynamic-import
* @babel/preset-react

### 打包文件分析工具(生产环境下使用)

默认会展示当前应用的分析图表
安装 webpack-bundle-analyzer插件

``` js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
}
```

### 多入口多出口

``` js
// 遵循commonjs规范
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin'); // 压缩js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')
let htmlPlugins = ['index', 'other'].map(chunkName => {
    return new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `./${chunkName}.html` ),
        filename: `./${chunkName}.html` ,
        chunks: [chunkName]
    })
})

module.exports = {
    // 入口
    // entry: './src/index.js',
    // 多入口
    entry: {
        index: './src/index.js',
        other: './src/other.js'
    },
    // 出口
    output: {
        // 出口文件名
        // filename: 'bundle.js',
        // 多出口
        filename: '[name].js',
        // 绝对路径
        path: path.resolve(__dirname, 'dist') //返回绝对路径， __dirname：文件所在目录，与'dist'组成绝对路径
    },
    // new HtmlWebpackPlugin({
    //   // 根据模板生成新的html文件
    //   template: path.resolve(__dirname, './index.html'),
    //   // 生成的新的文件名
    //   filename: 'index.html', // 服务器默认会找到根目录下的index.html文件解析
    //   // minify: false
    //   chunks: ['index', 'other'] // 配置indexhtml，引入多入口js
    // }),
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
    ...htmlPlugins,
],
}
```

### SplitChunks

编译时抽离第三方模块、公共模块

https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks

多文件多入口时，两个模块都引用了第三方模块
```js
// index.js
import $ from 'jquery'
console.log($)
// other.js
import $ from 'jquery'
console.log($)
```

``` js
module.exports = {
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
```

### happypack

多线程打包，可以将不同的逻辑交给不同的线程来处理

# webpack 4 课程学习

课程目标

- 彻底学会 Webpack 的配置
- 理解 Webpack 的作用及原理
- 上手项目的打包过程配置
- 拥有工程化的前端思维
- 步入高级前端工程师行里

## 第 2 章 webpack 初探

### webpack 是什么

模块打包工具

- 模块相关阅读

  - documentation-concepts-modules
  - documentation-api-modules

### 安装 webapck

#### webapck 环境搭建

安装 Node 和 npm

node 版本越新，webpack 越快，webpack 会调用 node 的一些新特性加快 webpack 打包性能。

安装后，查看 node 和 npm

```shell
node -v
npm -v
```

#### webapck 全局安装

**安装 webpack**

```shel
npm install webpack webpack-cli -g
```

**查看 webpack 版本号**

查看版本号，确定安装成功

```shell
webpack -v
```

**卸载全局 webpack**

```shell
npm uninstall webpack webpack-cli -g
```

此时，通过 `webpack -v`就无法查看了

>  全局安装的坏处：若两个项目一个是 webpack 4 一个是 webpack 3，那么在全局安装 webpack 4 的情况下，3 的项目就无法运行了。

#### webapck 局部安装

进入项目目录

```shell
npm install webapck webpack --save-dev
// 或
npm install webapck webpack -D
```

安装后，确定版本号 `webpack -v`无法查看版本号，因为此命令会去全局环境下找 webpack 命令，而我们没有安装全局 webpack

查看项目中的 webpack 版本

```shell
npx webpack -v
```

查看 wbepack 历史版本

```shell
npm info webpack
```

安装老版本 webpack

```shell
npm install webpack@4.16.5 webpack-cli -D
```

### 使用Webpack的配置文件

项目根目录创建 webpack.config.js

```js
// webpack.config.js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    // 改变输出路径需要使用 绝对路径，利用 node 的 path 模块的 resolve 方法，第一个参数 __dirname 指的是 index.js 所在目录 和 dist 结合，形成绝对路径。
    path: path.resolve(__dirname, 'dist')
  }
}
```

运行 `npx webpack` 即可。运行此命令，webpack 并不知道要如何打包，它回去找默认文件 `webpack.config.js` 获取配置信息。

**打包时，不使用默认配置文件**

```shell
npx webpack --config webpackconfig.js
```

## 第 3 章 Webpack 的核心概念

本章讲解 Webpack 中的一些核心概念，从 Loader 与 Plugin 开始，带你学明白 Webpack 的运行机制，然后逐步深入，扩展衍生出 SoureMap， HMR， WDS 等常见概念。本章课程学习过程中，额外增加了对 Webpack 官方文档的查阅方式讲解，帮助大家学会查阅文档。...

### 3-1 什么是loader

webpack 是什么？模块打包工具

模块是什么？不只是js、css和图片等其他任何内容。

webpack配置文件的作用是什么？答案在前面

使用 file-loader 做 jpg 文件的打包

打包流程：

- 命令行 `npm run bundle`，执行 package.json  中的 script ，运行 bundle 命令，实际上是运行 webpack。
- webpack 找它的配置，根据配置打包。
  - 遇到 js文件，默认可以处理 js文件。
  - 当遇到 jpg 图片文件，webpack 默认不知道如何打包，会去配置中找相应规则

### 3-2 使用 Loader 打包静态资源（图片篇）

使用 file-loader

- 图片名 + hash，通过占位符实现
- 更改输出位置
- 支持多种格式文件

```js
webpack.config.js
module: {
		rules: [{
		+ test: /\.(jpg|png|gif)$/,           // 支持多种格式文件
			use: {
				loader: 'file-loader',
				options: {
			+	name: '[name]_[hash].[ext]',    // 图片名 + hash
			+	outputPath: 'images/'           // 更改输出位置
				}
			} 
		}]
	},
```

url-loader 可以实现 file-loader 的一切功能。

url-loader 默认会把图片转换成base64格式，直接放入 bundle.js 中，而不是单独生成一个图像文件，需要配置文件小就base64，文件大还是单独存放，通过 limit 选项 2048，表示200个字节，204800表示200kb。

- 图片文件小转成 base64，图片文件大打包成图片名+hash。

```js
webpack.config.js
module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,       
			use: {
        
				loader: 'url-loader',            // 使用 url-loader
				options: {
					name: '[name]_[hash].[ext]',    
					outputPath: 'images/',    
				+	limit: 10240                   // 以 10kb 为限
				}
			} 
		}]
	},
```

###  3-3 使用 Loader 打包静态资源（样式篇 - 上）

安装 loader 

```shell
npm install style-loader css-loader -D
```

css-loader 会分析出几个 css 文件之间的关系，最终合并成一段 css。

style-loader 会把 css-loader 生成的内容挂载到页面的 head 部分。

sass-loader 把预处理器语言转化成 css。

loader 执行顺序：从下到上，从右到左。

css3 的厂商前缀，安装 postcss-loader。

postcss-loader 需要用到 autoprefixer 插件

```shell
npm install autoprefixer -D
```

```json
// postcss.config.js
module.exports = {
  plugins: [
  	require('autoprefixer')
  ]
}
```

### 3-4 使用 Loader 打包静态资源 (样式篇 - 下)

css-loader 常用配置项

当需要配置 loader 时，需要写成对象的形式，`importLoaders: 2`的作用是保证我们不管是在js 还是 css 中引入 scss 文件都可以保证打包成功。

```js
{
    test: /\.scss$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2，
                modules: true // css 模块化打包
            }
        },
        'sass-loader',
        'postcss-loader'
    ]
}
```

css 打包的模块化

通过设置 css-loader 的 `modules: true ` 

```js
import style from './index.scss'

var img = new Image()
img.src = avatar
img.classList.add(style.avatar) // css 模块化的使用
```

打包字体文件

### 使用 plugins 让打包更便捷

plugin 可以在webpack运行到某个时刻的时候，帮你做一些事情。



html-webpack-plugin，会在打包后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中。

配置模板文件 

clean-webpack-plugin，每次打包前，先删除之前的包。它是第三方 Plugin，不是官方推荐。

```shell
npm install clean-webpack-plugin -D
```


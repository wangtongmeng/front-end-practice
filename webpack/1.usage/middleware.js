let express = require('express');
let app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackOptions = require('./webpack.config');
//compiler就是一个webpack实例,代表整个编译的任务 compiler.run();
const compiler = webpack(webpackOptions);
app.use(webpackDevMiddleware(compiler,{}));
app.listen(3003);
/**
 * webpack-dev-server 自己启动了一个express的http服务器,而且 能实现打包的功能,并且可以提供产出文件的访问服务
 * webpack-dev-middleware只是一个中间件,它可以嵌入到现在的其它的express应用,提供打包功能,并且可以提供产出文件的访问服务
 * webpackDevMiddleware(compiler,{})
 *   1.会自动按配置文件的要求打包项目
 *   2.会提供打包后的文件的访问服务
 */
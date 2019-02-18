## 第1章 课程介绍

ES6作为最新的JavaScript核心语言标准，成为前端工程师必备的技能之一。本章首先介绍ES6的基本概念及历史背景让大家走近ES6，了解什么是ES6以及学习ES6的必要性；然后会为大家简明扼要的讲述ES6带来了哪些新特性以及这些特性有什么作用。...

**学 es6 的必要性**

源码 vue element D3

业务 vue react angular

**构建工具**

gulp babel webpack npm

**基础语法**

**实战**

express mockjs

**预备知识**

模块化概念

工程构建

编程经验

### 1-1 课程介绍

## 第2章 项目构建

工欲善其事必先利其器，本章重点讲述如何使用Gulp、Babel、Webpack做好ES6工程的构建；通过手把手编写gulp脚本完成ES6的自动编译、打包、文件监听、浏览器热更新、模板自动更新、服务热启动等，在本章大家不仅可以学到gulp、babel、webpack相关知识，还可以学习到工程架构思想及做法。...

### 2-1 项目构建介绍

ES6 项目构建

- 基础架构
- 任务自动化（gulp）
- 编译工具（babel、webpack）
- 代码实现

#### 基础架构

![1536973449110](C:\Users\WANGTO~1\AppData\Local\Temp\1536973449110.png)

编译 es5 es3（适用于ie8）

#### 任务自动化（gulp）

**什么是任务自动化**

减少人工操作，自动监听操作与响应。

**什么是gulp**

自动化构建工具。

**gulp的作用**

完工自动化，背后用 nodejs 做开发，提供了很多插件,完成不同任务。

**了解如何使用gulp完成任务自动化**

gulp中文文档、api、插件

#### **编译工具（babel、webpack）**

**什么是babel、webpack**

babel：js 的编译器

webpack：解决模块化的工具

**babel的核心用法**

解决兼容性问题、编译，如何和 gulp 结合。

**了解webpack及webpack-stream的作用**

webpack-stream 是 webpack 对 gulp 的支持，gulp 是通过 stream （二进制的流）的方式进行操作。

#### 代码实现

创建一个ES6前端工程

完成目录结构、自动构建、服务器搭建

### 2-2 项目目录创建

[代码地址](https://github.com/littlebirdflying/es6-lottery)

根目录 es6-lottery，创建3部分：前端、服务端、工具。

`app/` 前端代码

- `app/css/ `样式
- `app/js/`  js
  - `app/js/class/` 类
    - `app/js/class/test.js` 初始化类文件
    - `app/js/class/index.js` 入口文件
- `app/views/` 模板 html
- `app/views/error.ejs` 初始化模板文件，错误文件（ejs，服务器代码通过express做，其使用的模板引擎是 ejs 模板引擎）
- `app/views/index.ejs` 入口文件

`server/` 服务器

- server/下，命令行 `express -e .`  express脚手架在当前目录使用 ejs 模板引擎， `npm install`

`tasks/` 工具

`tasks/util/` 常见脚本

`tasks/util/args.js` 初始化脚本文件

`package.json` 命令行 `npm init` ，配置依赖包

`.babelrc`  babel 编译配置文件

`gulpfile.babel.js` gulp 配置文件，脚本使用了 es6 语法 需要加上 babel

### 2-3 命令行处理，创建JS编译任务脚本 

#### 命令行处理

命令行参数解析

```js
// tasks/util/args.js
import yargs from 'yargs'; // 处理命令行参数，识别命令行

const args = yargs  // 命令行参数处理

  .option('production',{ // 区分开发环境和正式环境
    boolean:true,
    default:false,
    describe:'min all scripts'
  })

  .option('watch',{ // 监听开发环境中的文件
    boolean:true,
    default:false,
    describe:'watch all files'
  })

  .option('verbose',{ // 详细输出命令行日志
    boolean:true,
    default:false,
    describe:'log'
  })

  .option('sourcemaps',{ // 资源映射，强制生成 sourcemaps
    describe:'force the creation of sroucemaps'
  })

  .option('port',{ // 服务器端口
    string:true,
    default:8080,
    describe:'server port'
  })

  .argv // 命令行以字符串进行解析

export default args;
```

#### js 处理脚本

创建 /tasks/script.js

```js
import gulp from 'gulp';
import gulpif from 'gulp-if'; // gulp if 判断
import concat from 'gulp-concat'; // gulp 文件拼接
import webpack from 'webpack'; // 打包
import gulpWebpack from 'webpack-stream'; // gulp 基于 stream
import named from 'vinyl-named'; // 文件重命名标志
import livereload from 'gulp-livereload'; // 热更新
import plumber from 'gulp-plumber'; // 处理文件信息流
import rename from 'gulp-rename'; // 文件重命名
import uglify from 'gulp-uglify'; // js,css 压缩
import {log,colors} from 'gulp-util'; // 命令行输出，log 和 color 的输出
import args from './util/args'; // 命令行参数解析

gulp.task('scripts',()=>{ // 创建脚本命令
  return gulp.src(['app/js/index.js']) // 打开文件
    .pipe(plumber({ 
      errorHandle:function(){ // 处理错误，结合 webpack

      }
    }))
    .pipe(named()) // 文件重命名
    .pipe(gulpWebpack({ // 编译，结合 webpack
      module:{
        loaders:[{
          test:/\.js$/,
          loader:'babel'
        }]
      }
    }),null,(err,stats)=>{ // 处理错误
      log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
        chunks:false
      }))
    })
    .pipe(gulp.dest('server/public/js')) // 输出路径
    .pipe(rename({ // 重命名
      basename:'cp',
      extname:'.min.js'
    }))
    .pipe(uglify({compress:{properties:false}, output:{'quote_keys':true}})) // 文件压缩
    .pipe(gulp.dest('server/public/js')) // 输出路径
    .pipe(gulpif(args.watch,livereload())) // 监听文件变化
})

```

### 2-4 创建模板、服务任务脚本

#### 模板处理脚本

创建 /tasks/pages.js

```js
import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('pages',()=>{ // 创建 pages 任务
  return gulp.src('app/**/*.ejs') // 打开文件，app 下的所有 ejs 文件
    .pipe(gulp.dest('server')) // 拷贝
    .pipe(gulpif(args.watch,livereload())) // 监听 热更新
})
```

#### css 处理脚本

创建 /tasks/css.js

```js
import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('css',()=>{
  return gulp.src('app/**/*.css')
    .pipe(gulp.dest('server/public'))
})

```

#### 服务器任务脚本

```js
// tasks/server.js
import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server'; // 启动脚本作为服务器
import args from './util/args';

gulp.task('serve',(cb)=>{ // 创建 serve 任务
  if(!args.watch) return cb(); // 如果不监听，返回 cb

  var server = liveserver.new(['--harmony','server/bin/www']); // 创建服务器
  server.start(); // 启动服务器

  gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],function(file){
    server.notify.apply(server,[file]); // 通知服务器做处理
  }) // 监听 server/ 下的 js 和 ejs 文件

  gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
    server.start.bind(server)() 
  }); // 监听路由和应用接口变化
})
```

### 2-5 文件自动监听，项目构建测试

#### 监听 js css ejs 变化，对应执行响应脚本文件

```js
// tasks/browser.js
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util'; // gulp 常用工具集合
import args from './util/args';

gulp.task('browser',(cb)=>{ // 创建任务
  if(!args.watch) return cb();
  gulp.watch('app/**/*.js',['scripts']); // app/中 js发生变化，执行 script 脚本
  gulp.watch('app/**/*.ejs',['pages']);
  gulp.watch('app/**/*.css',['css']);
});

```

#### 每次清空生成文件

```js
// tasks/clean.js
import gulp from 'gulp';
import del from 'del'; // 做删除处理
import args from './util/args';

gulp.task('clean',()=>{ // 创建任务
  return del(['server/public','server/views']) // 清空两个目录
})
```

#### 串联脚本

```js
// tasks/build.js
import gulp from 'gulp';
import gulpSequence from 'gulp-sequence'; // 处理包执行顺序

gulp.task('build',gulpSequence('clean','css','pages','scripts',['browser','serve'])); // 清目录->拷css->编译模板->执行脚本->数组browser->serve
```

#### 默认任务脚本

```js
// tasks/default.js
import gulp from 'gulp';

gulp.task('default',['build']); // 命令行 gulp，自动会找 default 任务
```

全局安装 gulp 后，命令行执行 `gulp` ，会依次执行脚本。

####  引入 tasks 目录文件

```js
// gulpfile.babel.js
import requireDir from 'require-dir';

requireDir('./tasks'); // 引入 tasks 目录文件，并执行
```

#### 配置 .babelrc

```js
{
  "presets":["es2015"],
  "plugins":["transform-decorators-legacy"]
}

```

#### 热更新

```js
// server/app.js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-livereload')()); // 接收热更新,添加这句话，注意顺序
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
```

#### 自动更新完成

命令行 `gulp --watch` 监听

localhost: 3000 打开

## 第3章 es6语法

本章通过语法介绍、实例演示、实用技巧三个维度来讲解ES6所有新特性，包括Let和Const、解构赋值、数组扩展、字符串扩展、函数扩展、正则扩展、数值扩展、对象扩展、类与对象、Set和Map数据结构、Symbol、Proxy和Reflect、Generator(async\wait)、遍历接口、Decorator修饰器、模块化，在本章可以系统的学习ES6相关的所有知识...

### 3-1 let 与 const命令

#### 作用域的概念

es5 两个作用域：全局作用域、函数作用域

es6 增加了块作用域

#### let

- let var 作用域不同，let 只在块级作用域有效
- 使用 es6 强制开启严格模式，未声明会报错；es5 中使用 "use strict"
- let 不能重复定义变量

```js
function test(){
  for(let i=1;i<3;i++){ // 块级作用域
    console.log(i);
  }
  console.log(i); // 报错：Uncaught ReferenceError: i is not defined
}()
```

```js
function test1(){
  for(var i=1;i<3;i++){ // 函数作用域
    console.log(i);
  }
  console.log(i); // 1 2 3 
}()
```

#### const 

- 声明常量，不能修改。
- const 也有块级作用域。
- 声明时必须赋值。
- 数值不允许修改；引用类型赋值，存的是指针，指针不能变，但是引用类型可以变。

```js
function last(){
  const PI=3.1415926; // const 声明常量
  const k={ // const 声明对象，指针没变，但可以改变对象内容
    a:1
  }
  k.b=3;
  console.log(PI,k);
}()
```

### 3-2 解构赋值

#### 什么是解构赋值

左右一一对应进行赋值。

#### 解构赋值的分类

- **数组解构赋值**，左右都是数组
- **对象解构赋值**，左右都是对象
- **字符串解构赋值**，左边是数组，右边是字符串
- **布尔值解构赋值**，对象解构赋值的一种
- **函数参数解构赋值**，数组解构赋值在函数参数的应用
- **数值解构赋值**，对象解构赋值的一种

#### 数组解构赋值

##### 基本使用方法

```js
{ 
  let a,b,rest;
  [a,b]=[1,2];
  console.log(a,b); // 1 2
}
```

```js
{ 
  let a,b,rest;
  [a,b,...rest]=[1,2,3,4,5,6];
  console.log(a,b,rest); // 1 2 [3,4,5,6]
}
```

##### 默认值

```js
{ 
  let a,b,c,rest;
  [a,b,c=3]=[1,2]; // 如果没成功配对，默认值 undefined
  console.log(a,b,c); // 1 2 3
}
```

##### 使用场景

###### 变量交换

```js
{ 
  let a=1;
  let b=2;
  [a,b]=[b,a];
  console.log(a,b); // 2 1
}
```

###### 接收函数返回的数组

```js
{ 
  function f(){
    return [1,2]
  }
  let a,b;
  [a,b]=f();
  console.log(a,b); // 1 2
}
```

###### 选择性接收函数返回的数组类型

```js
{ 
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,,,b]=f();
  console.log(a,b); // 1 4
}
```

###### 选择性接收函数返回的未知长度的数组

```js
{ 
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,,...b]=f();
  console.log(a,b); // 1 [3,4,5]
}
```

#### 对象解构赋值

##### 基本使用方法

```js
{ 
  let o={p:42,q:true};
  let {p,q}=o;
  console.log(p,q); // 42 true
}
```

##### 默认值

```js
{ 
  let {a=10,b=5}={a:3};
  console.log(a,b); // 3 5
}
```

##### 使用场景

###### 解析函数返回

###### 前后端通信，解析JSON对象

```js
{ 
  let metaData={
    title:'abc',
    test:[{
      title:'test',
      desc:'description'
    }]
  }
  let {title:esTitle,test:[{title:cnTitle}]}=metaData;
  console.log(esTitle,cnTitle); // abc test
}
```

### 3-3 正则扩展

正则新增特性

- 构造函数的变化
- 正则方法的扩展
- u修饰符
- y修饰符
- s修饰符

### 3-3-1 正则表达式

#### 定义

由以下两种字符组成的文字模式

1. 普通字符（如26个英文字母、数字等）
2. 特殊字符（有特殊含义的，如.\等）

说明：

该模式描述在查找文字主体时待匹配的一个或多个字符串。正则表达式作为一个模板，将某个字符模式与所搜索的字符串进行匹配。

#### 为什么使用

查找、替换、数据有效性验证

### 3-4 字符串扩展（上）

字符串新增特性

- Unicode表示法
- 遍历接口
- 模板字符串
- 新增方法

babel-polifill 兼容 es7

#### unicode表示法

```js
{
  console.log('a',`\u0061`); // a a
  console.log('s',`\u20BB7`); // s ₻7，当成了两个字符
  console.log('s',`\u{20BB7}`); // s 𠮷
}
```

#### 遍历接口

##### codePointAt()

取码值

es5 时

```js
{
  let s='𠮷';
  console.log('length',s.length); // 2，码值大于两个字节，处理成4个字节，每两个字节为一个长度
  console.log('0',s.charAt(0)); // 0 �，乱码，位置0的字符
  console.log('1',s.charAt(1)); // 1 �，乱码，位置1的字符
  console.log('at0',s.charCodeAt(0)); // at0 55362，unicode码值可以取出来
  console.log('at1',s.charCodeAt(1)); // at1 57271
}
```

es6

```js
{
  let s1='𠮷a';
  console.log('length',s1.length); // 3
  console.log('code0',s1.codePointAt(0)); // 134071，第一个字符
  console.log('code0',s1.codePointAt(0).toString(16)); // 20bb7，十六进制的第一个字符，这里取了4个字节
  console.log('code1',s1.codePointAt(1)); // 57271，这里取的是长度是2的字符的后两个字节，这样后面处理不会乱
  console.log('code2',s1.codePointAt(2)); // 97，对应 a
}
```
##### fromCodePoint()

根据码值取字符

```js
// 根据码值取字符
{
  // es5
  console.log(String.fromCharCode("0x20bb7")); // ஷ，乱码
  // es6，处理大于两个字节的 unicode 字符
  console.log(String.fromCodePoint("0x20bb7")); // 𠮷
}
```

字符串遍历器接口

let of

```js
// 字符串编译器接口
{
  let str='\u{20bb7}abc';
  for(let i=0;i<str.length;i++){
    console.log('es5',str[i]); // � � a b c，前两个是乱码
  }
  // 通过字符串遍历器接口，处理字符串中包含unicode编码大于0xFFFF的情况
  for(let code of str){
    console.log('es6',code); // 𠮷 a b c
  }
}
```

#### 模板字符串

```js
{
  let name="list";
  let info="hello world";
  let m=`i am ${name},${info}`;
  console.log(m); // 'i am list,hello world'
}
```

#### 其他 api

##### 判断是否包含

```js
{
  let str="string";
  // 字符串是否包含某些字符
  console.log('includes',str.includes("c")); // false，判断是否包含...
  // 字符串是否以某些字符起始
  console.log('start',str.startsWith('str')); // true，判断是否以...起始
  // 字符串是否以某些字符结尾
  console.log('end',str.endsWith('ng')); // true
} 
```

##### 字符串复制

```js
{
  let str="abc";
  console.log(str.repeat(2)); // 'abcabc'，字符串复制
}
```

##### 字符串补白

应用场景：日期补白，彩票补白。

注意：es7的未定稿方法，编译需要引入 polifill 包，npm 对应是 babel-polyfill。

```js
{
  // 向前补白
  console.log('1'.padStart(2,'0')); // 01，参数1为长度设置，参数2为补白内容
  // 向后补白
  console.log('1'.padEnd(2,'0')); // 10
}
```

##### 标签模板

应用场景：

- 过滤 html 字符串时，如防止 xss 攻击时
- 处理多语言转换时，通过函数返回不同的结果

```js
{
  let user={
    name:'list',
    info:'hello world'
  };
  console.log(abc`i am ${user.name},${user.info}`); // ["i am ", ",", "", raw: Array(3)] "list" "hello world"
  function abc(s,v1,v2){
    console.log(s,v1,v2); // i am ,,,listhello world
    return s+v1+v2
  }
}
```

##### 字符串不换行

```js
{
  console.log(String.raw`Hi\n${1+2}`); // Hi\n3，不换行
  console.log(`Hi\n${1+2}`); // Hi换行3，换行
}
```

### 3-5 字符串扩展（下）

### 3-6 数值扩展

数值处理新增特性

- 新增方法，如数学处理
- 方法调整，全局方法移植到 Number 对象上

#### 多进制表示方法 

```js
{
  // es6 2进制 0B 开头
  console.log('B',0B111110111); // 503
  console.log('B',0b111110111); // 相同，0B 和 0b 都可以
  // es6 8进制 0o 开头
  console.log(0o767); // 503
  console.log(0O767); // 相同，0o 和 0O 都可以
}
```

#### 是否有穷

使用频率不高

```js
{
  console.log('NaN',Number.isNaN(NaN)); // true
  console.log('0',Number.isNaN(0)); // false

}
```

#### 是不是 NaN

```js
{
  console.log('NaN',Number.isNaN(NaN)); // true
  console.log('0',Number.isNaN(0)); // false
}
```

#### 是不是整数

```js
{
  console.log('25',Number.isInteger(25)); // true
  console.log('25.0',Number.isInteger(25.0)); // ture
  console.log('25.1',Number.isInteger(25.1)); // false
  console.log('字符串的25',Number.isInteger('25')); // false，参数必须是数字
}
```

#### 数字的上限和下限 

两个常量

```js
{
  console.log(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER); // 9007199254740991 -9007199254740991
}
```

#### 是否是安全数

判断数字是否在有效范围内，是否是安全数

```js
{
  console.log('10',Number.isSafeInteger(10)); // true
  console.log('a',Number.isSafeInteger('a')); // false，参数不是数字
}
```

#### 返回小数的整数部分

```js
{
  console.log(4.1,Math.trunc(4.1)); // 4
  console.log(4.9,Math.trunc(4.9)); // 4
  console.log(4,Math.trunc(4)) // 4
}
```

#### 判断数字是正数、负数、0

4种情况：1、-1、0、NaN

```js
{
  console.log('-5',Math.sign(-5)); // -1
  console.log('0',Math.sign(0)); // 0
  console.log('5',Math.sign(5)); // 1
  console.log('字符串的50',Math.sign('50')); // 1，转换成了数字
  console.log('foo',Math.sign('foo')); // NaN
} 
```

#### 立方根的计算 

```js
{
  console.log('-1',Math.cbrt(-1)); // -1
  console.log('8',Math.cbrt(8)); // 2
}
```

#### 三角函数方法

#### 对数方法

### 3-7 数组扩展

数组新增特性

- Array.from
- Array.of
- copyWithin
- find\findIndex
- fill
- entries\keys\values
- includes

#### Array.from

集合转数组

```js
{
  let p=document.querySelectorAll('p');
  let pArr=Array.from(p); // 集合转数组
  pArr.forEach(function(item){
    console.log(item.textContent);
  });
}
```

实现类似 map() 的遍历

```js
{ // Array.from()第二个参数，接收一个函数，进行遍历
  console.log(Array.from([1,3,5],function(item){return item*2})); // [2, 6, 10]，参数2是函数，类似 map()
}
```

#### Array.of

```js
{
  let arr = Array.of(3,4,7,9,11);
  console.log('arr=',arr); // [3, 4, 7, 9, 11]

  let empty=Array.of();
  console.log('empty',empty); //  []
}
```

#### 填充数组

fill

```js
{
  console.log('fill-7',[1,'a',undefined].fill(7)); // [7, 7, 7]
  console.log('fill,pos',['a','b','c'].fill(7,1,3)); // ["a", 7, 7],参数1，替换数，参数2和参数3，起始和截止位置
}
```

#### 遍历

keys，数组元素的位置

```js
{
  for(let index of ['1','c','ks'].keys()){
    console.log('keys',index); // 0 1 2
  }
}
```

values，数组元素的值

注意，需要 babel-polifill 兼容

```js
{
  for(let value of ['1','c','ks'].values()){
    console.log('values',value); // 1 c ks
  }
}
```

entries，数组元素的位置和值

```js
{
  for(let [index,value] of ['1','c','ks'].entries()){
    console.log('values',index,value); // 0 1换行1 c换行2 ks
  }
}
```

#### 用数组本身元素进行替换

```js
{
  console.log([1,2,3,4,5].copyWithin(0,3,4)); // [4, 2, 3, 4, 5]，参数1，替换起始位置，参数2，读取数据起始位置，参数3，读取截止位置（不包括）
}
```

#### 查找

find，第一个符合条件的元素

findeIndex，第一个符合条件的元素的位置

```js
{
  console.log([1,2,3,4,5,6].find(function(item){return item>3})); // 4，第一个符合条件的元素
  console.log([1,2,3,4,5,6].findIndex(function(item){return item>3})); // 3，第一个符合条件的元素的位置
}
```

#### 是否包含

```js
{
  console.log('number',[1,2,NaN].includes(1)); // true
  console.log('number',[1,2,NaN].includes(NaN)); // true，能识别 NaN
}
```

### 3-8 函数扩展

函数新增特性

- 参数默认值
- rest参数
- 扩展运算符
- 箭头函数
- this绑定
- 尾调用

#### 参数默认值

**注意**：默认值后面必须都是带默认值的变量

```js
{
  function test(x, y = 'world'){ // 默认值后面必须都是带默认值的变量
    console.log('默认值',x,y);
  }
  test('hello'); // hello world
  test('hello','kill'); // hello kill
}
```

##### 参数默认值的作用域问题

```js
{
  let x='test';
  function test2(x,y=x){
    console.log('作用域',x,y); 
  }
  test2('kill'); // kill kill
  test2() // undefined undefined，形参x只声明未赋值

  function testTwo(c,y=x){
    console.log('作用域',c,y); 
  }
  testTwo('kill') // kill test，这里取到外级作用域了
}
```

#### rest参数

```js
{
  function test3(...arg){ // ...把参数转成数组，和es5中的arguments相似，但不会有arguments[0]的问题
    for(let v of arg){ // rest参数后不能有其他参数，会报错
      console.log('rest',v); 
    }
  }
  test3(1,2,3,4,'a'); // 1 2 3 4 a
}
```

#### 扩展运算符

rest 参数逆运算

```js
{
  console.log(...[1,2,4]); // 1 2 4，把数组转成离散的值
  console.log('a',...[1,2,4]); // a 1 2 4
}
```

#### 箭头函数

```js
{
  let arrow = v => v*2;
  let arrow2 = () => 5;
  console.log('arrow',arrow(3)); // 6
  console.log(arrow2()); // 5
}
```

注意 this 绑定的问题

#### 尾调用

尾调用，函数的最后一句话是函数
作用，提升性能
场景，函数嵌套时

```js
{
  function tail(x){
    console.log('tail',x);
  }
  function fx(x){
    return tail(x)
  }
  fx(123) // 123
}
```

### 3-9 对象扩展

函数新增特性

- 简洁表示法
- 属性表达式
- 扩展运算符
- Object新增方法

#### 简介表示法

##### 属性简写

```js
{
  // 简洁表示法
  let o=1;
  let k=2;
  let es5={
    o:o, 
    k:k
  };
  let es6={
    o, // 属性简写
    k
  };
  console.log(es5,es6); // {o: 1, k: 2} {o: 1, k: 2}
}
```

##### 方法简写

```js
{
 let es5_method={
    hello:function(){
      console.log('hello');
    }
  };
  let es6_method={
    hello(){ // 方法简写
      console.log('hello');
    }
  };
  console.log(es5_method.hello(),es6_method.hello()); // hello hello
}
```

#### 属性表达式

```js
{
  let a='b';
  let es5_obj={
    a:'c',
    b:'c'
  };

  let es6_obj={
    [a]:'c' // key 值，可以是表达式或变量
  }

  console.log(es5_obj,es6_obj); // {a: "c", b: "c"} {b: "c"}

}
```

#### 扩展运算符

babel 支持不友好，暂时没法用

```js
{
  let {a,b,...c}={a:'test',b:'kill',c:'ddd',d:'ccc'};
  c={ // c 的解析结果
    c:'ddd',
    d:'ccc'
  }
}
```

#### Object新增方法

##### 判断是否相等

`Object.is()` 与 === 一样

```js
{
  console.log('字符串',Object.is('abc','abc'),'abc'==='abc'); // true true， 
  console.log('数组',Object.is([],[]),[]===[]); // false false，引用地址不同
}
```

##### 拷贝

`Object.assign(target, ...sources)`，对象拷贝



**注意**：

- 拷贝属性有限制，浅拷贝
- 拷贝的只有自身对象的属性，不拷贝不可枚举的属性

```js
{
  console.log('拷贝',Object.assign({a:'a'},{b:'b'})); // {a: "a", b: "b"}
}
```

##### 遍历

`Object.entries()` 配合遍历使用

```js
{
  // Object.entries() 配合遍历使用
  let test={k:123,o:456};
  for(let [key,value] of Object.entries(test)){
    console.log([key,value]); // ["k", 123] ["o", 456]
  }
}
```

### 3-10 Symbol用法

#### Symbol的概念

Synmbol 数据类型提供一个独一无二的值

#### Symbol的声明

```js
{
  // 声明
  let a1=Symbol(); // 这里没有 new
  let a2=Symbol();
  console.log(a1===a2); // false
  let a3=Symbol.for('a3'); // 返回由给定的 key 找到的 symbol，否则就是返回新创建的 symbol
  let a4=Symbol.for('a3');
  console.log(a3, a4, a3===a4); // Symbol(a3) Symbol(a3) true
}
```

#### Symbol的使用

```js
{
  let a1=Symbol.for('abc');
  let obj={
    [a1]:'123', 
    'abc':345,
    'c':456
  };
  console.log('obj',obj); // {abc: 345, c: 456, Symbol(abc): "123"}
  // 注意：对象中，symbol 做属性值，通过 for in 和 for of 拿不到属性值
  for(let [key,value] of Object.entries(obj)){
    console.log('let of',key,value); // abc 345 // c 456
  }

  Object.getOwnPropertySymbols(obj).forEach(function(item){ // api 结果是数组
    console.log(obj[item]); // 123
  })

  Reflect.ownKeys(obj).forEach(function(item){ // api 返回数组包含symbol和非symbol
    console.log('ownkeys',item,obj[item]); // abc 345 c 456 Symbol(abc) 123
  })
}
```

### 3-11 set-map数据结构

#### Set

set集合中的元素不能重复

#### WeakSet

#### Map

Object 的 key 是字符串，Map 的 key 可以是任意数据类型

#### WeakMap

### 3-12 map-set与数组和对象的比较

### 3-13 Proxy和Reflect

### 3-14 类与对象

### 3-15 Promise

### 3-16 Iterator

### 3-17 Generator

### 3-18 Decorators

### 3-19 Module模块化

## 第4章 项目实战

本章重点是运用ES6语法去构建实际的项目（彩票电商），通过需求分析、项目架构思考、模块划分、服务端程序部署、前端代码编写、联调测试几个步骤，真实还原实际业务开发流程。大家在本章可以学习如何转变开发思维及设计代码的能力，举一反思将ES6强大的特性运用到实际业务中去...

### 4-1 需求分解和目录创建

### 4-2 创建倒计时模块

### 4-3 创建数据计算模块

### 4-4 创建接口模块（上）

### 4-5 创建接口模块（下）

### 4-6 创建彩票基础模块（上）

### 4-7 创建彩票基础模块（中）

### 4-8 创建彩票基础模块（下）

### 4-9 创建彩票业务模块

### 4-10 创建服务接口和模拟数据

### 4-11 前后端联调

## 第5章 课程总结

本章主要回顾ES6的知识点，帮大家梳理重点和难点；学会ES6语法不难，活学活用到项目才是关键，本章也会温习上个章节实战的思路和技巧，给大家提供一些学好ES6的建议和方法

### 5-1 课程总结
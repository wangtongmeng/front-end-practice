# 第1章 课程内容介绍

主要介绍为什么我们录制本次课程、课程包含的主要内容。

## 1-1 导学

## 1-2 课程介绍

# 第2章 NodeJS 是什么，为什么偏爱NodeJS？

在一切课程课程内容开始之前先了解一下 NodeJS 究竟是什么，NodeJS 有哪些核心特性。

## 2-1 NodeJS 是什 么

Node.js is a **JavaScript runtime** built on Chrome's V8，基于 chrome V8引擎的 JS 运行时。

Node.js uses an event-driven, **non-blockingI/O** model，事件驱动，非阻塞的 I/O 模型

### 非阻塞 I/O

I/O input output

阻塞：I/O 时进程休眠等待 I/O 完成后进行下一步

非阻塞：I/O 时函数立即返回，进程不等待 I/O 完成

### 事件驱动

I/O等异步操作结束后的通知

观察者模式

## 2-2 NodeJS 究竟好在哪里

### 为什么偏爱 NodeJS

前端职责范围变大，统一开发体验

在处理高并发、I/O密集场景性能优势明显，适合处理 web 场景

#### CPU 密集 vs I/O 密集

CPU 密集：压缩、解压、加密、解密

I/O 密集：文件操作、网络操作、数据库

##### web常见场景

静态资源读取

数据库操作，读取存取设备

渲染页面，读取模版

#### 高井发应对之道

增加机器数

增加每台机器的CPU数一多核

#### 进程

**进程**：是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位。

进行中的程序

**多进程**：启动多个进程，多个进程可以一块执行多个任务。

单核计算机也可以听音乐和上网，cpu 在极快的时间内快速进行切换，类似动画片。

#### NodeJS 工作模型 

![1537695873475](C:\Users\WANGTO~1\AppData\Local\Temp\1537695873475.png)

aphace 传统的 server 处理 web 请求。

一家饭店，每个厨师配一个服务员，大厨做菜，服务员点菜，点菜做菜完给客人，下一个客人。

web访问时，cpu 相关运算，相当于点菜，如访问页面，cpu 运算，速度极快。

读取文件，I/O 操作，相当于大厨做饭,很慢。

单台机器会面临 web 高并发问题。

增加大厨和服务员的数目，5+5，对应web，每一个请求，服务器开启一个进程处理请求，cpu计算用户想干什么，但在web场景，90%以上都是 I/O 操作，cpu 计算完，后续都是 I/O操作，I/O 使用的阻塞 I/O 模型，此时进程不能关掉，必须等 I/O 结束。多个用户请求就并发开启多进程。

这样一台机器能处理多个任务，到达极限后，可以增加物理机器，更换多核 cpu。

问题：不能没完没了雇佣厨师和服务员，服务员太悠闲了

apache在web时，也有类似的问题，cpu 分配的最大进程数是有限的，用户并发的一定数量就需要排队了，cpu 处理速度远远快于 I/O，在 web 场景，cpu 运算非常少，大部分都是 I/O，所以 cpu 在 I/O时只能等待，这个进程所用的 cpu 资源就会空转，极大地浪费了 cpu 资源。cpu 处理响应web，也需要做其他很多耗 cpu 的事情。

Node.js 很好的解决了这个问题

另一个饭店，几个厨师，但只有一个服务员，服务员接待所有客人，这样厨师一直在做菜，服务员一直在点菜。

对于客人，不需要排队，只需要点完菜等待，对应访问 web，就是网页转圈圈比访问连不上要好。

**Node.js 工作模型**

多个客户端发请求，到一个 Node.js 主进程 Event Loop(服务员)，并且一个 cpu 只开一个进程，一个进程中只开一个线程（single thread），这样 cpu 没有浪费，可以做其他的事情，而后续的 I/O 操作时多线程的

##### 线程

**线程**：进程内一个相对独立的、可调度的执行单元，与同属一个进程的线程共享进程的资源

**多线程**：启动一个进程，在一个进程内启动多个线程，这样，多个线程也可以一块执行多个任务

##### NodeJS的单线程

**单线程只是针对主进程，I/O操作系统底层多线程调度**

I/O 等异步操作和 node.js 没有关系，node.js 只是主进程发起请求，请求给 I/O 之后，是由操作系统底层多进程多线程进行调度，达到最佳性能。所以 node.js 是单线程，但很多事情不是，而是交给底层操作系统做的，node.js 只负责单进程的监听，至于如何处理 I/O 是操作系统的事情，这里就会有多进程多线程的操作。

**单线程并不是单进程**

node.js 有专门的模块 class 集群，cpu 有几个核，就启用几个进程。

明白了 node.js 工作原理，也就知道了为什么 node.js 受到 web 开发者的偏爱。

Nginx 相对于 aphace 的高性能原理也是类似的。

Node.js 性能好是有前提的

web场景性能才好，因为高并发且 I/O 密集

##### Node.js 常用场景

**Web Server**

**本地代码构建**，从性能考虑用 Node.js 不合适，因为是 cpu 密集，但是是在处理前端代码，有很多前端逻辑，前端比较熟悉。

**实用工具开发**，例如脚本，性能也不是最佳，但是前端熟悉。

# 第3章 环境 & 调试

NodeJs 的开发环境、运行环境、常用 IDE 以及集中常用的调试工具 & 方法

CommonJS 模块管理

global 全局方法

process 进程

## 3-1 环境 & 调试 ——CommonJS1

### CommonJS

每个文件是一个模块，有自己的作用域

在模块内部**module**变量代表模块本身

**module.exports**属性代表模块对外接口

### require规则

/表示绝对路径，./表示相对于当前文件的

支持js、json、node拓展名，不写依次尝试

不写路径则认为是 build-in 模块或者各级 node-modules内的第三方模块

### require特性

module被加载的时候执行，加载后缓存

一旦出现某个模块被循环加载，就只输出已经执行的部分，还未执行的部分不会输出



## 3-2 环境 & 调试 ——CommonJS2

## 3-3 环境 & 调试 ——CommonJS3

## 3-4 环境 & 调试——引用系统内置模块&引用第三方模块

内置模块 fs

第三方模块 chalk

node_modules

## 3-5 环境 & 调试——module.exports 与 exports 的区别

## 3-6 环境 & 调试——global变量

global

- CommonJS
- Buffer、process、console
- timer

Buffer 经常用 处理二进制

## 3-7 环境 & 调试——process进程

process 

argv 参数相关

env 环境相关

cwd

process timer nextTick

## 3-8 环境 & 调试——debug1

Inspector

--inspect 调试参数 -brk 入口时停下来

VSCode

条件调试

## 3-9 环境 & 调试——debug2

# 第4章 NodeJS 基础 API

介绍 NodeJS 最常用的基础 API，为后面项目开发做好准备path、Buffer、event、fs。

## 4-1 基础 API——path1

## 4-2 基础API——path2

path

dirname、—filename总是返回文件的绝对路径

process.cwd()总是返回执行node命令所在文件夹

./

在require方法中总是相对当前文件所在文件夹

在其它地方和process.cwd()一样，相对node启动文件夹

## 4-3 基础 API——Buffer1

Buffer

Buffer用于处理二进制数据流

实例类似整数数组，大小固定

C++代码在V8堆外分配物理内存

## 4-4 基础 API——buffer2

## 4-5 基础 API——buffer3

## 4-6 基础API—— event1

## 4-7 基础API——event2

## 4-8 基础API——fs1

## 4-9 基础API——fs2

## 4-10 基础API——fs3

## 4-11 基础API——fs4-解决回调地狱问题

# 第5章 项目初始化

项目开始之前了解一下项目初始化知识，做开实战项目开始准备 1.gitignore：只上传有必要的代码到 github 2.npmignore：只上传有用的内容到 npm 3.editconfig：统一代码风格

## 5-1 项目初始化 01--.gitignore

匹配模式前 / 代表项目根目录

匹配模式最后加 / 代表是目录

匹配模式前加 ！代表取反

*代表任意个字符

？匹配任意一个字符

**匹配多级目录

**.npmignore**

**.editorconfig**

## 5-2 项目初始化 02--ESlint

## 5-3 项目初始化 03--ESlint

# 第6章 案例项目--静态资源服务器

第一个实战项目，自己实现一个静态资源服务器，主要内容包括 1.HTTP 协议 2.基础API应用 3.回调地狱解决方案 npm 包版本 & 发布

## 6-1 静态资源服务器 01

supervisor 模块 npm i -g supervisor，不用 node 启动命令了，用这个模块 supervisor app.js

拼接字符串 handlebarsjs.com

## 6-2 静态资源服务器 02

## 6-3 静态资源服务器 03

## 6-4 静态资源服务器 04

## 6-5 静态资源服务器 05

## 6-6 静态资源服务器 06

## 6-7 静态资源服务器 07

## 6-8 静态资源服务器 08--压缩文件

## 6-9 静态资源服务器 09--range范围请求

## 6-10 静态资源服务器10--缓存

## 6-11 静态资源服务器 11--cli

## 6-12 静态资源服务器 12--cli & 版本

## 6-13 静态资源服务器 13--cli

# 第7章 本地构建

代码从本地书写到线上转换，主要介绍几个业界通用工具 1.gulp 2.babel 3.webpack

## 7-1 gulp 1

## 7-2 gulp 2

## 7-3 babel

## 7-4 webpack--简介

## 7-5 webpack--entry、output

## 7-6 webpack--module

## 7-7 webpack--plugins

# 第8章 单元测试 & UI 测试

测试线上质量的保障，主要介绍了单元测试常用的工具 1.mocha 2.chai 3.Istanbul 4.Benchmark

## 8-1 单元测试 mocha 1--断言assert

## 8-2 单元测试 mocha 2--Mocha

## 8-3 测试 覆盖率 istanbul

## 8-4 持续集成

## 8-5 benchmark

# 第9章 UI 测试常用工具

UI 测试常用工具 1.Jest 2.enzyme 3.selenium webdirver

## 9-1 UI 测试 1

## 9-2 UI 测试 2

## 9-3 UI 测试 3--sinon

## 9-4 UI 测试 4--webdriver

# 第10章 案例项目--headless 爬虫

最后一个实战小例子，通过一个使用 headless 实现的简单爬虫，体会 NodeJS 开发之趣。

## 10-1 爬虫与反爬虫简介

## 10-2 初使用puppeteer爬百度图片

## 10-3 Pupeteer API

## 10-4 爬虫任务分析

## 10-5 爬虫代码实现1

## 10-6 爬虫代码实现2

## 10-7 爬虫代码实现3

# 第11章 课程总结

1.回顾课程设计的主要知识点 2.简单介绍因为篇幅原因为介绍到有用的知识点 3.个人对 NodeJS 发展的看法

## 11-1 小结

**NodeJS 特性 & 开发准备**，Node.js 是什么，好在哪里，为什么性能高，前端为什么偏爱 Node.js，使用 Node.js 开发项目需要准备哪些环境、调试、IDE、代码格式化

**核心 API**，fs、buffer、http、path

**静态资源服务器 & HTTP 协议**

**发布模块到 npm**

**本地代码构建、打包**

**API 单元测试 & UI 自动化测试**

**爬虫实战**





NodeJS 关键技术

Stream，nodejs核心，fs 和 http 模块都是依赖 Stream

动态 Web framework

child_process & cluster



深入学习

through2

Express、koa、egg

SSR & 同构

NodeJS源码
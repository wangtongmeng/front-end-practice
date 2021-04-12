// 1.核心模块、内置模块   node中自带的
// 2.文件模块 引用都是相对路径
// (会判断路径是不是核心模块。是核心模块就不做这些事了) 看下是不是第三方 如果不是在继续，文件模块的查找规范： 最新：默认查找先查找同名文件，如果没找到尝试添加查找.js 和 .json文件，如果在没有就查找同名文件夹(当成了一个包)，先查找package.json，如果没有那就找index.js 如果还没有就报错了  老版本：会先查找包（有package.json) 如果没有package.json 会查找文件 （废弃了）
// 文件 -> 文件夹 -> index.js -> package.json

// const jquery1 = require('./jquery1');
// console.log(jquery1) // index.js的情况
// const jquery2 = require('./jquery2')
// console.log(jquery2) // 没有index.js 有package.json描述文件的情况
// const jquery3 = require('./jquery3')
// console.log(jquery3) //  package   index.js 和package.json都存在的情况
// const jquery4 = require('./jquery4')
// console.log(jquery4) // hello world

// 3.第三方模块 (安装的包都得有描述信息，否则无法上传的) （引用也是没有相对路径  1.全局模块 2.代码中的第三方模块 ）
// 默认会沿着当前目录向上查找，查找 node_modules 下的同名的文件夹, 根据（package.json 中的main） -> index.js 中查找， 如果没找到向上查找 查找上级的node_modules ，如果到根路径还没有找到就报错了
// let r = require('co')
// let r2 = require('co2')
// console.log(r,r2)

// console.log(module.paths) // 获取所有的node_modules的路径


// 1.包的安装 1） 全局模块 -> 安装到电脑中的npm下
// npm -> node package manager (不要使用cnpm 安装模块时 无法锁定版本，会出现很多的问题)
// 电脑在执行命令时会去查找环境变量中的path(电脑->属性->高级系统设置->环境变量->path) 可以直接在命令行中输入path查看

// 3n 模块 npm (nrm node registry manager 源管理 npm install nrm -g)  (nvm node version manager node版本管理) nvm-win
// nrm use taobao
// nrm use npm
// nrm use cnpm

// npm install mime -g 只能在命令行里使用
// npm默认在电脑的环境变量里 所以可以直接使用 ， 安装的全局模块都在npm下生成了一个快捷方式(只能在命令行里使用)
const r = require('mime')
console.log(r) // 找不到


// 查看全局npm包安装地址 npm root -g






// 全局安装只能在命令行里用：自己实现全局包 
// 1.需要配置bin命令
    //  package.json
    // {
    //     "name": "tm-module",
    //      // "bin": "./bin/wwww",  // 可执行的命令都放在bin下
    //     "bin": {
    //         "gm": "./bin/www" (命令行执行命令回去找bin require会找main)
    //     },
    // }
// 2.添加执行方式 bin/www文件 #! /usr/bin/env node   告诉命令行使用环境变量中的node 来执行文件
// 3.将此包放到npm下（可以全局安装）临时做一个npm link(把当前文件链接到全局node_modules下,调试方便)

// 工具类的使用全局包
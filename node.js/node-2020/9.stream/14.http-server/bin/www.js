#! /usr/bin/env node

const program = require('commander')
const config = require('./serverConfig')
const {forEachObj} = require('../util')

program.name('tm')
forEachObj(config, val => {
    program.option(val.option, val.descriptor)
})

// 发布订阅 用户调用 --help时会触发此函数

program.on('--help', function () {
    console.log('\r\nExamples:')
    forEachObj(config, val => {
        console.log('  ' + val.usage)
    })
})

// --port 3000 --directory d:  --cache
program.parse(process.argv)

const options = program.opts();


const finalConfig = {}
forEachObj(config, (value, key) => {
    finalConfig[key] = options[key] || value.default
})

// 1.解析用户参数
// 2.开启服务 文件和目录操作
const Server = require('../src/index')

let server = new Server(finalConfig)
server.start()
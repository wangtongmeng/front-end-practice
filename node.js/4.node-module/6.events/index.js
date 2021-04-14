// const EventEmitter = require('events')
const EventEmitter = require('./events')
const util = require('util')

function Girl() {}
util.inherits(Girl, EventEmitter) // 原型继承 需要通过实例来调用继承的方法 


let girl = new Girl()
const cry = () => {console.log('哭')}
const eat = () => {console.log('吃')}
const walking = () => {console.log('逛街')}
girl.on('失恋', cry)
girl.on('失恋', eat)
girl.once('失恋', walking)

girl.emit('失恋') // 哭 吃 逛街
console.log('------------------------')
girl.emit('失恋') // 哭 吃
console.log('------------------------')
girl.off('失恋', cry)
girl.emit('失恋') // 吃




// 发布订阅模式 redux vue express koa webpack
// 订阅一次
// 订阅方法 
// 发布方法
// 取消订阅
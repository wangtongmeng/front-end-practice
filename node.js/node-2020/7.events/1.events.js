/**
 * eventEmitter实现
 */
// node是基于事件的，内部自己实现了一个发布订阅模式

// const EventEmitter = require('events')
const EventEmitter = require('./events')
const util = require('util')

// let event = new EventEmitter()


function Girl() {
    
}

// 是让一个类继承EventEmitter原型上的方法
// `.Object.create() 2.Girl.prototype.__proto__ = EventEmitter.prototype 3.Object.setPrototypeOf 4.extends   2/3是等价的

// 1.每个实例都有一个__proto__指向所属类(构造函数)的原型
// 2.每个类都有一个prototype属性，上面有个constructor属性指向类的本身
// Girl.prototype = Object.create(EventEmitter.prototype)
// Girl.prototype.__proto__ = EventEmitter.prototype
// Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)
util.inherits(Girl, EventEmitter) // 类继承父类原型上的方法 原理：Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)
let girl = new Girl()
console.log(girl.on)

// {'女生失恋': [fn,fn]}
// 用来监听用户绑定了哪些事件
girl.on('newListener', function (type) { // newListener固定，每次绑定事件on/once，都会触发此函数
    console.log(type)
})
// girl.on('女生失恋',(a,b,c)=>{
girl.once('女生失恋',(a,b,c)=>{
    console.log('cry', a,b,c)
})
let eat = () => {
    console.log('eat')
}
girl.on('女生失恋',eat)
girl.off('女生失恋', eat)
girl.emit('女生失恋', 1,2,3) // 传参
girl.emit('女生失恋')


// 常用方法 on emit once只能触发一次的 off newListener
// 优点：解耦、通信、绑定回调、通知...
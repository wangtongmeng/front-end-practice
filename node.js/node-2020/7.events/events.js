const { eventNames } = require("cluster");

function EventEmitter() {
    this._events = {}
}
// 订阅
EventEmitter.prototype.on = function (eventName, callback) {
    if (!this._events){
        this._events = Object.create(null)
    }
    // 当前绑定的事件 不是newListener事件就触发newListener事件
    if (eventName !== 'newListener') {
        this.emit('newListener', eventName)
    }
    if (this._events[eventName]) {
        this._events[eventName].push(callback)
    } else {
        this._events[eventName] = [callback]
    }
}
// 绑定一次
EventEmitter.prototype.once = function (eventName, callback) {
    const once = (...args) => {
        callback(...args)
        // 回调执行后就自己移除
        this.off(eventName, once)
    }
    once.l = callback // 用来标识这个once是谁的
    this.on(eventName, once)
}
// 发布
EventEmitter.prototype.emit = function (eventName, ...args) {
    if (!this._events) return
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn=>fn(...args))
    }
}
// 删除
EventEmitter.prototype.off = function (eventName, callback) {
    if (!this._events) return
    this._events[eventName] = this._events[eventName].filter(fn => fn !== callback && fn.l!=callback)
}

module.exports = EventEmitter
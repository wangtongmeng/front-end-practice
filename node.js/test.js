// const EventEmitter = require('events')
// const util = require('util')

// function Gril () {

// }
// util.inherits(Gril, EventEmitter)

// let girl = new Gril()
// const cry = () => {console.log('哭')}
// const eat = () => {console.log('吃')}
// const walking = () => {console.log('逛街')}

// girl.on('失恋', cry)
// girl.on('失恋', eat)
// girl.once('失恋', walking)

// girl.emit('失恋')
// girl.emit('失恋')
// girl.off('失恋', eat)
// girl.emit('失恋')


function EventEmitter(){
    this._event = {}
}
EventEmitter.prototype.on = function (eventName, callback) {
    if (!this.event) {
        this._event = {}
    }
    if (this._event[eventName]) {
        this._event[eventName].push(callback)
    } else {
        this._event[eventName] = [callback]
    }
}
EventEmitter.prototype.off = function (eventName, callback) {
    if (this._event && this._event[eventName]) {
        this._event[eventName] = this._event[eventName].filter(fn => fn !== callback && fn.l !== callback)
    }
}
EventEmitter.prototype.once = function (eventName, callback) {
    const one = () => {
        callback()
        this.off(eventName, one)
    }
    one.l = callback
    this.on(eventName, one)
}

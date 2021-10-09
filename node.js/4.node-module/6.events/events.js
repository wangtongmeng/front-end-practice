function EventEmitter() {
    this._event = {}
}
EventEmitter.prototype.on = function (eventName, callback) {
    if (!this._event) { // 子类只通过原型继承时没有
        this._event = {}
    }
    if (this._event[eventName]) {
        this._event[eventName].push(callback)
    } else {
        this._event[eventName] = [callback]
    }
}
EventEmitter.prototype.emit = function (eventName, ...args) {
    this._event[eventName].forEach(fn => {
        fn(...args)
    })
}
EventEmitter.prototype.off = function (eventName, callback) {
    if (this._event && this._event[eventName]) {
        this._event[eventName] = this._event[eventName].filter(fn => fn !== callback && fn.l !== callback) // fn.l !== callback once的情况
    }
}
EventEmitter.prototype.once = function (eventName, callback) {
    const one = () => { // 绑定执行完毕后移除
        callback() // 切片编程 增加逻辑
        this.off(eventName, one)
    }
    one.l = callback // 关联one 和 callback，当执行 xx.off('xx', callback) 可以解绑 one
    this.on(eventName, one) // 这里绑定的是one函数 如果执行之前执行off方法 由于callback和one不是一个函数 所以删不掉 xx.once('xx', callback) xx.off('xx', callback)
}

module.exports = EventEmitter



class EventEmitter {
    constructor(){
        this._event = {}
    }
    on (eventName, cb) {
        if (!this._event) {
            this._event = {}
        }
        if ((this._event[eventName])) {
            this._event[eventName].push(cb)
        } else {
            this._event = [cb]
        }
    }
    emit(eventName, ...args) {
        if (this._event[eventName]) {
            this._event[eventName].forEach(fn => {
                fn(...args)
            })
        }
    }
    // off(eventName, cb){
    //     if (this._event && this._event[eventName] {
    //         this._event[eventName] = this._event[eventName].filter(fn => fn !== cb && fn.l !== cb)
    //     }
    // }
    off(eventName, cb) {
        if (this._event && this._event[eventName]) {
            this._event[eventName] = this._event[eventName].filter(fn !== cb && fn.l !== cb)
        }
    }
    once(eventName, cb){

    }
}
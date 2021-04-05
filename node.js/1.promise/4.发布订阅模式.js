// 发布订阅模式 核心就是把多个方法先暂存起来，最后一次执行
// 解耦合
const fs = require('fs')

let events = {
    _events: [],
    on(fn) {
        this._events.push(fn)
    },
    emit(data) {
        this._events.forEach(fn => fn(data))
    }
}

fs.readFile('./a.txt','UTF8',function (err,data) {
    events.emit(data);
})
fs.readFile('./b.txt','UTF8',function (err,data) {
    events.emit(data);
})

let arr = []
events.on(data => {
    arr.push(JSON.stringify(data))
})
events.on(()=>{
    if (arr.length === 2) { // 本质还是通过计数器
        console.log('读取完毕', arr) // [ '"b.txt"', '"b"' ]
    }
})

// 观察者模式 vue2  基于发布订阅的  (发布订阅之间是没有依赖关系的)
// 对于我们的观察者模式 观察者  被观察者  vue3 中没有使用class
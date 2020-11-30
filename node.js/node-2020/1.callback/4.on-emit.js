// 订阅 发布模式（面试：发布订阅和观察者的区别）
const fs = require('fs') // node中的自带模块

let eventObj = {
    arr: [], // 中介存放 订阅的事件
    on(fn){
        this.arr.push(fn)
    },
    emit(){
        this.arr.forEach(fn => fn())
    }
}

let obj = {}
fs.readFile('./age.txt', 'utf8', function (err, data) { // ajax
    if (err) return console.log(err)
    obj.age = data
    eventObj.emit() // 触发
})
fs.readFile('./name.txt', 'utf8', function (err, data) { // ajax
    if (err) return console.log(err)
    obj.name = data
    eventObj.emit()
})

eventObj.on(() => { // 注册方法
    if (Object.keys(obj).length == 2) {
        console.log('数据回来了', obj)
    }
})
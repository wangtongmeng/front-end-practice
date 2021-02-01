/**
 * 自定义可读流
 */
const {Readable}  = require('stream')

class MyRead extends Readable { // 默认会调用Readable中的read方法, read方法又调了子类的_read
    _read(){
        this.push('ok') // push方法是Readable中提供的 只要调用push将结果放入 就可以出发on('data')事件
        this.push(null) // 放入null的时候结束了
    }
}

let mr = new MyRead
mr.on('data', function (data) {
    console.log(data)
})
mr.on('end',function () {
    console.log('end')
})


// 文件可读流 可读流 是不一样的
// 可读流就是继承可读流接口，并不需要用到fs模块
// 基于文件的可读流内部使用的是fs.open fs.close on('data') on('end')


// class Parent {
//     read(){
//         this._read()
//     }
// }

// class Child extends Parent {
//     _read(){
//         console.log('_read')
//     }
// }
// let c = new Child()
// c.read()
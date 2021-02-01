/**
 * 自己实现一个可写流，和fs没关系
 */

 const {Writable} = require('stream')

 class MyWrite extends Writable {
     _write(chunk,encoding,cb){
        console.log(chunk)
        cb()
     }
 }

 let mw = new MyWrite()
 mw.write('ok', function () {
     console.log('ok')
 })
 mw.write('ab')

//  不同人实现的可写流是不一样的，例如http的前端返回数据 -> 读取一下 -> 写入时只是响应一下 socket.writes
const fs = require('fs')
const EventEmitter = require('events')
class Writable extends EventEmitter {
    write() {
        this._write()
    }
}

class WriteStream extends Writable {
    constructor(path, options = {}) {
        super()

        this.path = path
        this.flags = options.flags || 'w'
        this.encoding = options.encoding || 'utf8'
        this.autoClose = options.autoClose || true
        this.highWaterMark = options.highWaterMark || 16 * 1024

        this.open()

        // 要判断是第一次写入 还是第二次写入
        this.writing = false // 用来描述当前是否有正在写入的操作
        this.needDrain = false // 默认是否触发drain事件
        this.len = 0 // 需要统计的长度
        this.offset = 0 // 每次写入时的偏移量
        this.cache = [] // 用来实现缓存的
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) return this.emit('error', err)
            this.fd = fd
            this.emit('open', fd)
        })
    }
    _write(){
        console.log('_write')
    }
}

module.exports = WriteStream
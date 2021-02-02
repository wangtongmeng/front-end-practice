const fs = require('fs')
const EventEmitter = require('events')
class Writable extends EventEmitter {
    constructor(options) {
        super()
    }
}

class WriteStream extends Writable {
    constructor(path, options = {}) {
        super(options)

        this.path = path
        this.flags = options.flags || 'w'
        this.encoding = options.encoding || 'utf8'
        this.autoClose = options.autoClose || true
        this.highWaterMark = options.highWaterMark || 16 * 1024

        this.open()

        // 要判断是第一次写入 还是第二次写入
        this.writing = false // 用来描述当前是否有正在写入的操作
        this.needDrain = false // 默认是否触发drain事件
        this.offset = 0 // 每次写入时的偏移量
        this.cache = [] // 用来实现缓存的
        this.len = 0 // 需要统计的长度
    }
    write(chunk, encoding = this.encoding, cb = () => {}) { // 用户调用的write方法
        // 判断是真的写入 还是放入缓存中
        // 用户调用write时 写入的数据可能是stringOrBuffer
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        this.len += chunk.length
        let ret = this.len < this.highWaterMark
        if (!ret) { // 达到预期或者超过预期 就改变触发drain事件
            this.needDrain = true
        }

        if (this.writing) { // 如果正在写入就先存起来 稍后再去写入
            this.cache.push({
                chunk,
                encoding,
                cb
            })
        } else {
            this.writing = true // 标识为正在写入
            this._write(chunk, encoding, () => {
                cb() // 用户本来的回调要执行
                this.clearBuffer()
            })
        }

        return ret
    }
    clearBuffer() { // 多个异步并发 可以靠队列来实现 依次清空
        let data = this.cache.shift()
        if (data) {
            let {
                chunk,
                encoding,
                cb
            } = data
            this._write(chunk, encoding, () => {
                cb()
                this.clearBuffer()
            })
        } else {
            this.writing = false // 缓存中的内容也写入了 清空缓存
            if (this.needDrain) {
                this.needDrain = false
                this.emit('drain')
            }
        }
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) return this.emit('error', err)
            this.fd = fd
            this.emit('open', fd)
        })
    }
    _write(chunk, encoding, cb) { // fs.write => doWrite
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, cb))
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
            this.len -= written
            this.offset += written
            cb()
        })
    }
}

module.exports = WriteStream
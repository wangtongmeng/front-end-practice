// http://zhufengpeixun.com/grow/html/11.Stream-4.html
// 1.内部会 new ReadStream 继承于Readable接口
// 2.内部会先进行格式化
// 3.内部会默认打开文件 ReadStream.prototype.read
// 4.ReadStream.prototype.read -> ReadStream.prototype._read


// 如果想基于Readable接口实现自己的可读流 你需要自己去实现一个_read方法，默认当我们开始读取时会调用此方法

const fs = require('fs')
const EventEmitter = require('events')

class ReadStream extends EventEmitter {
    constructor(path, options = {}) {
        super()

        // 1.格式化入参
        this.path = path
        this.flags = options.flags || 'r'
        this.encoding = options.encoding || null
        if (typeof options.autoClose == 'undefined') {
            this.autoClose = true
        } else {
            this.autoClose = options.autoClose
        }
        this.start = options.start || 0
        this.end = options.end || undefined
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.open() // 默认就调用开启事件
        this.offset = this.start // offset 可以根据每次读取的位置发生变化

        this.flowing = false // 默认就是非流动模式

        this.on('newListener', type => {
            if (type == 'data') { // 说明用户监听了data事件
                this.flowing = true
                this.read() // 读取
            }
        })
    }
    // pipe
    pipe(ws){
        this.on('data', (chunk)=> {
            let flag = ws.write(chunk)
            if (!flag){
                this.pause()
            }
        })
        ws.on('drain',()=>{
            this.resume()
        })
    }
    pause() {
        this.flowing = false
    }
    resume() {
        if (!this.flowing) {
            this.flowing = true
            this.read() // 继续读取
        }
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                return this.emit('error', err)
            }
            this.fd = fd // 将文件描述符保存起来
            this.emit('open', fd)
        })

    }
    read() {
        if (typeof this.fd != 'number') { // 保证fd 一定存在 不存在就等存才了在用
            return this.once('open', () => this.read())
        }
        // fd 一定存在了，buffer是内存 内存是引用类型
        const buffer = Buffer.alloc(this.highWaterMark)
        let howMuchToRead = this.end ? Math.min((this.end - this.offset + 1), this.highWaterMark) : this.highWaterMark
        fs.read(this.fd, buffer, 0, howMuchToRead, this.offset, (err, bytesRead) => { // 真正读到的个数
            if (bytesRead) {
                this.offset += bytesRead // 每次读到后累加，方便下次继续读取
                this.emit('data', buffer.slice(0, bytesRead))
                if (this.flowing) {
                    this.read()
                }
            } else {
                this.emit('end')
                if (this.autoClose) {
                    fs.close(this.fd, () => {
                        this.emit('close')
                    })
                }
            }
        })
    }

}

module.exports = ReadStream
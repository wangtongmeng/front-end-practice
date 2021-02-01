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
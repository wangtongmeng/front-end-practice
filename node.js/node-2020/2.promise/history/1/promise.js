const STATUS = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}
class Promise {
    constructor(executor) {
        this.status = STATUS.PENDING
        this.value = undefined
        this.reason = undefined
        const resolve = (val) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FULFILLED
                this.value = val
            }
        }
        const reject = (reason) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.REJECTED
                this.reason = reason
            }
        }   
        try {
            executor(resolve, reject)
        } catch (e) {
            // 出错走失败逻辑
            reject(e)
        }
    }
    // 这里的then是同步的
    then(onFulfilled, onRejected) { // switch 有作用域的问题
        if (this.status === STATUS.FULFILLED) {
            onFulfilled(this.value)
        }
        if (this.status === STATUS.REJECTED) {
            onRejected(this.reason)
        }
    }
}

module.exports = Promise
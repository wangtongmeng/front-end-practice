// 链式调用
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
        this.onResolvedCallbacks = [] // 存放成功的回调
        this.onRejectedCallbacks = [] // 存放失败的回调
        const resolve = (val) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.FULFILLED
                this.value = val
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        const reject = (reason) => {
            if (this.status === STATUS.PENDING) {
                this.status = STATUS.REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            // 出错走失败逻辑
            reject(e)
        }
    }
    then(onFulfilled, onRejected) { // switch 有作用域的问题

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === STATUS.FULFILLED) {
                try {
                    let x = onFulfilled(this.value)
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            }
            if (this.status === STATUS.REJECTED) {
                try {
                    let x = onRejected(this.reason)
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            }
            if (this.status === STATUS.PENDING) {
                // 装饰模式 切片编程
                this.onResolvedCallbacks.push(() => {
                    // 其他逻辑...
                    try {
                        let x = onFulfilled(this.value)
                        resolve(x)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    // 其他逻辑...
                    try {
                        let x = onRejected(this.reason)
                        resolve(x)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })

        return promise2
    }
}

module.exports = Promise
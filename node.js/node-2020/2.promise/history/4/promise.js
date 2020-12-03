// 链式调用
const STATUS = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}
// 我们的promise 按照规范来写 就可以和别人的promise公用
function resolvePromise(x, promise2, resolve, reject) {
    if (promise2 === x) { // 反之自己等待自己完成
        return reject(new TypeError('出错了'))
    }
    // 看x 是普通值还是promise 如果是promise要采用他的状态
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called
        try {
            // x可以是一个对象 或者是函数
            let then = x.then // 看一下这个对象是否有then方法
            if (typeof then == 'function') {
                // then是函数 就认为x是一个promise
                // 如果x是promise 那么就采用他的状态
                then.call(x, function (y) { // 调用返回的promise 用他的结果 作为下一次then的结果
                    if (called) return
                    called = true
                    // 递归解析成功后的值 直到它是一个基本类型值为止
                    resolvePromise(y, promise2, resolve, reject)
                }, function (r) {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x) // 此时x 就是一个普通对象
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e) // 取then时抛出错误了
        }
    } else {
        resolve(x) // x是一个原始数据类型 不能是promise
    }
    // 不是promise直接就调用resolve
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
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)

            }
            if (this.status === STATUS.REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === STATUS.PENDING) {
                // 装饰模式 切片编程
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        // 其他逻辑...
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        // 其他逻辑...
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
            }
        })

        return promise2
    }
}

module.exports = Promise
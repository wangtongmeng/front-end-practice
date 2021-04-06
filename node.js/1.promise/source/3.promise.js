// promise 还是基于回调的 es6-promise 
// 1.promise是一个类 ，无需考虑兼容性
// 2.当使用promise的时候 会传入一个执行器，此执行器是立即执行
// 3.当前executor 给了两个函数可以来描述当前promise的状态。promise中有三个状态 成功态  失败态 等待态
// 默认为等待态  如果调用resolve会走到成功态，如果调用reject 或者发生异常 会走失败态
// 4.每个promise实例都有一个then方法
// 5.promise 一旦状态变化后不能更改

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

// 利用x的值来判断是调用promise2的resolve还是reject
function resolvePromise(promise2, x, resolve, reject) {
    // 核心流程
    if (promise2 === x) {
        return reject(new TypeError('错误'))
    }
    // 我可能写的promise 要和别人的promise兼容，考虑不是自己写的promise情况
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') { // 有可能是promise 
        // 别人的promise可能调用成功后 还能调用失败~~~  确保了别人promise符合规范
        let called = false
        try { // 有可能then方法是通过defineProperty来实现的 取值时可能会发生异常
            let then = x.then
            if (typeof then === 'function') {
                // 这里我就认为你是promise了  x.then 这样写会触发getter可能会发生异常  
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject) // 直到解析他不是promise为止
                }, r => { // reason
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else { // {}  {then:{}}
                resolve(x) // 常量
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        resolve(x) // 说明返回的是一个普通值 直接将他放到promise2.resolve中
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING; // promise默认的状态
        this.value = undefined; // 成功的原因
        this.reason = undefined; // 失败的原因
        this.onResolvedCallbacks = [] // 存放成功的回调方法
        this.onRejectedCallbacks = [] // 存放失败的回调方法
        const resolve = (value) => { // 成功resolve函数
            if (value instanceof Promise) { // 一个promise直接resolve一个promise的情况
                return value.then(resolve, reject)
            }
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED; // 修改状态
                // 发布
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        const reject = (reason) => { // 失败的reject函数
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED // 修改状态
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    // then中的参数是可选的 值的穿透
    then(onFulfilled, onRejected) { // onFulfilled, onRejected
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err;
        }
        // 用于实现链式调用
        let promise2 = new Promise((resolve, reject) => {
            // 订阅模式
            if (this.status === PENDING) { // 代码是异步调用resolve或reject的
                this.onResolvedCallbacks.push(() => { // 切片变成 AOP
                    setTimeout(() => {
                        try {
                            // todo...
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
            }
            if (this.status == FULFILLED) { // 成功调用成功方法
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }
            if (this.status === REJECTED) { // 失败调用失败方法
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }
        })
        return promise2
    }
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }
    static reject(value) {
        return new Promise((resolve, reject) => {
            reject(value)
        })
    }
    catch (errorFn) { // 非 promise a+ Promise.prototype.catch
        return this.then(null, errorFn)
    }
    static all(promises) { // 非 promise a+ Promise.all
        return new Promise((resolve, reject) => {
            let result = []
            let times = 0
            const processSuccess = (index, val) => {
                result[index] = val
                if (++times === promises.length) {
                    resolve(result)
                }
            }

            for (let i = 0; i < promises.length; i++) { // 并发 多个请求一起执行
                let p = promises[i]
                if (p && typeof p.then === 'function') {
                    p.then(data => {
                        processSuccess(i, data)
                    }, reject) // 如果其中某一个promise失败了 直接执行失败即可
                } else {
                    processSuccess(i, p)
                }
            }
        })
    }
    static any(promises) {
        return new Promise((resolve, reject) => {
            let result = []
            let times = 0
            const processFail = (index, val) => {
                result[index] = val
                if (++times === promises.length) {
                    console.log(11, result)
                    reject('AggregateError: All promises were rejected')
                }
            }

            for (let i = 0; i < promises.length; i++) {
                let p = promises[i]
                if (p && typeof p.then === 'function') {
                    p.then(resolve, err => {
                        processFail(i, err)
                    })
                } else {
                    resolve(p)
                }
            }
        })
    }
    static race(promises) { // 非 promise a+ Promise.race
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                let p = promises[i]
                if (p && typeof p.then === 'function') {
                    p.then(resolve, reject) // 一旦成功就直接 停止
                } else {
                    resolve(p)
                }
            }
        })
    }
    static allSettled(promises) {
        return new Promise((resolve, reject) => {
            let results = []
            let times = 0
            const process = (index, val, status) => {
                if (status === 'fulfilled') {
                    results[index] = {
                        status,
                        value: val
                    }
                }
                if (status === 'rejected') {
                    results[index] = {
                        status,
                        reason: val
                    }
                }
                if (++times === promises.length) {
                    resolve(results)
                }
            }

            for (let i = 0; i < promises.length; i++) {
                let p = promises[i]
                if (p && typeof p.then === 'function') {
                    p.then(data => {
                        process(i, data, 'fulfilled')
                    }, err => {
                        process(i, err, 'rejected')
                    })
                } else {
                    process(i, p, 'fulfilled')
                }
            }
        })
    }
    finally(cb) { // 非 promise a+ Promise.prototype.finally
        return this.then(data => {
            return Promise.resolve(cb()).then(() => data)
        }, err => {
            return Promise.resolve(cb()).then(() => {
                throw err
            })
        })
    }
}


// npm install promises-aplus-tests -g 
// 测试 promises-aplus-tests 此文件路径

// 延迟对象 帮我们减少一次套用 ： 针对目前来说 应用不是很广泛
Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

module.exports = Promise
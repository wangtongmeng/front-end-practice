/* class MyPromise {
	constructor(executor) {
		// 每一个PROMISE实例都有一个状态和结果属性
		this.status = 'pending';
		this.value = undefined;

		// 用来存储基于THEN指定的成功或者失败的方法
		this.resolveArr = [];
		this.rejectArr = [];

		// 定义RESOLVE/REJECT方法用来改变PROMISE实例的状态和结果
		let change = (status, value) => {
			// 状态一但改变过，再改变则无效
			if (this.status !== 'pending') return;
			this.value = value;
			this.status = status;
			// 改变完成状态后，把基于THEN指定的对应方法执行
			let fnArr = status === 'resolved' ? this.resolveArr : this.rejectArr;
			fnArr.forEach(item => {
				if (typeof item !== 'function') return;
				item(this.value);
			});
		};
		// 为了保证执行RESOLVE/REJECT的时候，已经通过THEN把需要执行的方法弄好了，我们判断处理（没有方法的时候，我们让改变状态的操作延迟进行）
		let resolve = result => {
			if (this.resolveArr.length > 0) {
				change('resolved', result);
				return;
			}
			let delayTimer = setTimeout(_ => {
				change('resolved', result);
				clearTimeout(delayTimer);
			}, 0);
		};
		let reject = reason => {
			if (this.rejectArr.length > 0) {
				change('rejected', reason);
				return;
			}
			let delayTimer = setTimeout(_ => {
				change('rejected', reason);
				clearTimeout(delayTimer);
			}, 0);
		};

		// 每一次NEW PROMISE都会立即执行EXECUTOR函数
		executor(resolve, reject);
	}

	// MyPromise.prototype.then
	then(resolveFn, rejectFn) {
		this.resolveArr.push(resolveFn);
		this.rejectArr.push(rejectFn);
	}
} */

/* class MyPromise {
	constructor(executor) {
		this.status = 'pending';
		this.value = undefined;
		this.resolveArr = [];
		this.rejectArr = [];

		let change = (status, value) => {
			if (this.status !== 'pending') return;
			this.value = value;
			this.status = status;
			let fnArr = status === 'resolved' ? this.resolveArr : this.rejectArr;
			fnArr.forEach(item => {
				if (typeof item !== 'function') return;
				item(this.value);
			});
		};
		let resolve = result => {
			if (this.resolveArr.length > 0) {
				change('resolved', result);
				return;
			}
			let delayTimer = setTimeout(_ => {
				change('resolved', result);
				clearTimeout(delayTimer);
			}, 0);
		};
		let reject = reason => {
			if (this.rejectArr.length > 0) {
				change('rejected', reason);
				return;
			}
			let delayTimer = setTimeout(_ => {
				change('rejected', reason);
				clearTimeout(delayTimer);
			}, 0);
		};

		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err.message);
		}
	}

	then(resolveFn, rejectFn) {
		// 每一次执行THEN都会返回一个新的PROMISE实例的（实现了THEN的链式写法）
		return new MyPromise((resolve, reject) => {
			// 只要执行新实例的executor函数中的resolve/reject就能知道新的实例是成功还是失败的
			this.resolveArr.push(result => {
				try {
					// 不报错，则接受方法的返回结果，会根据结果判断成功还是失败
					let x = resolveFn(result);
					if (x instanceof MyPromise) {
						x.then(resolve, reject);
						return;
					}
					resolve(x);
				} catch (err) {
					//方法执行报错，也代表新实例是失败的
					reject(err.message);
				}
			});
			this.rejectArr.push(reason => {
				try {
					let x = rejectFn(reason);
					if (x instanceof MyPromise) {
						x.then(resolve, reject);
						return;
					}
					resolve(x);
				} catch (err) {
					reject(err.message);
				}
			});
		});
	}
} */


class MyPromise {
	constructor(executor) {
		this.status = 'pending';
		this.value = undefined;
		this.resolveArr = [];
		this.rejectArr = [];

		let change = (status, value) => {
			if (this.status !== 'pending') return;
			this.value = value;
			this.status = status;
			let fnArr = status === 'resolved' ? this.resolveArr : this.rejectArr;
			fnArr.forEach(item => {
				if (typeof item !== 'function') return;
				item(this.value);
			});
		};
		let resolve = result => {
			if (this.resolveArr.length > 0) {
				change('resolved', result);
				return;
			}
			let delayTimer = setTimeout(_ => {
				change('resolved', result);
				clearTimeout(delayTimer);
			}, 0);
		};
		let reject = reason => {
			if (this.rejectArr.length > 0) {
				change('rejected', reason);
				return;
			}
			let delayTimer = setTimeout(_ => {
				change('rejected', reason);
				clearTimeout(delayTimer);
			}, 0);
		};

		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err.message);
		}
	}

	then(resolveFn, rejectFn) {
		// 如果传递的参数不是函数（NULL/不传递），我们让成功或者失败顺延
		if (typeof resolveFn !== 'function') {
			resolveFn = result => {
				return result;
			};
		}
		if (typeof rejectFn !== 'function') {
			rejectFn = reason => {
				return MyPromise.reject(reason);
			};
		}

		return new MyPromise((resolve, reject) => {
			this.resolveArr.push(result => {
				try {
					let x = resolveFn(result);
					if (x instanceof MyPromise) {
						x.then(resolve, reject);
						return;
					}
					resolve(x);
				} catch (err) {
					reject(err.message);
				}
			});
			this.rejectArr.push(reason => {
				try {
					let x = rejectFn(reason);
					if (x instanceof MyPromise) {
						x.then(resolve, reject);
						return;
					}
					resolve(x);
				} catch (err) {
					reject(err.message);
				}
			});
		});
	}

	// MyPromise.prototype.catch(fn) === MyPromise.prototype.then(null,fn)
	catch (rejectFn) {
		return this.then(null, rejectFn);
	}

	/* 静态方法 */
	static resolve(result) {
		return new MyPromise(resolve => {
			resolve(result);
		});
	}
	static reject(reason) {
		return new MyPromise((_, reject) => {
			reject(reason);
		});
	}
	
	static all(arr) {
		return new MyPromise((resolve, reject) => {
			let index = 0,
				results = [];
			for (let i = 0; i < arr.length; i++) {
				let item = arr[i];
				if (!(item instanceof MyPromise)) continue;
				item.then(result => {
					index++;
					results[i] = result;
					if (index === arr.length) {
						resolve(results);
					}
				}).catch(reason => {
					// 只要有一个失败，整体就是失败
					reject(reason);
				});
			}
		});
	}
}
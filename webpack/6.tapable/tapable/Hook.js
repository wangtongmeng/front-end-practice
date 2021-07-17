const CALL_DELEGATE = function (...args) {
    //先动态创建一个sync同步的类型的call方法,然后赋值给this.call
    //关于this的问题,只有一句话记住就行了.谁调用它就指向谁 钩子的实例syncHook.call('zhufeng', 12);
    this.call = this._createCall('sync');
    return this.call(...args);
}
const CALL_ASYNC_DELEGATE = function (...args) {
    //先动态创建一个sync同步的类型的call方法,然后赋值给this.call
    //关于this的问题,只有一句话记住就行了.谁调用它就指向谁 钩子的实例syncHook.call('zhufeng', 12);
    this.callAsync = this._createCall('async');
    return this.callAsync(...args);
}
class Hook {
    constructor(args = []) {
        this.args = args;//['name','age']
        this.taps = [];//就是一个存放我们事件函数的数组,订阅把函数存起来,存到这个数组里去了 {name,fn}
        this.call = CALL_DELEGATE;//this.taps.map(tap=>tap.fn)=this._x
        this.callAsync = CALL_ASYNC_DELEGATE;
        this._x = undefined;//其实才是真正存放我们事件函数的数组 [fn]
    }
    tap(options, fn) {
        this._tap('sync', options, fn);
    }
    tapAsync(options, fn) {
        this._tap('async', options, fn);
    }
    _tap(type, options, fn) {
        if (typeof options === "string") {
            options = { name: options };
        }
        //创建tapInfo并且插入到数组中去
        let tapInfo = { ...options, type, fn };
        this._insert(tapInfo);
    }
    _resetCompilation() {
        this.call = CALL_DELEGATE;
    }
    _insert(tapInfo) {
        this._resetCompilation();//每次插入新的函数,需要重新编译call方法
        this.taps.push(tapInfo);
    }
    compile(options) {
        throw new Error('Abstract:此方法应该被子类重写');
    }
    _createCall(type) {
        //动态创建一个函数
        return this.compile({
            taps: this.taps,//执行函数的事件函数
            args: this.args,//事件函数接收的参数
            type,//执行的类型 sync  async
        });
    }
}

module.exports = Hook;
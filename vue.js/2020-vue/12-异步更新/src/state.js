import {observe} from './observer/index'
import {proxy} from './util/index'
export function initState(vm) {
    const opts = vm.$options
    // vue的数据来源 属性 方法 数据 计算属性 watch
    if (opts.props) {
        initProps(vm)
    }
    if (opts.methods) {
        initMethod(vm)
    }
    if (opts.data) {
        initData(vm)
    }
    if (opts.computed) {
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
}

function initProps() {

}

function initMethod() {

}

function initData(vm) {
    // 数据初始化工作
    let data = vm.$options.data // 用户传递的data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data
    // 对象劫持 用户改变了数据 通知 => 刷新页面
    // MVVM模式 数据变化可以驱动视图变化

    // Object.defineProperty() 给属性增加get方法和set方法
    // Object.defineProperty 不能兼容ie8及以下 vue2无法兼容ie8版本
    for (let key in data) {
        proxy(vm, '_data', key)
    }
    observe(data) // 响应式处理
}

function initComputed() {

}

function initWatch() {

}
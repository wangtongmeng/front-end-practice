// 把data中的数据 都使用Object.defineProperty重新定义 es5方法
// Object.defineProperty 不能兼容ie8及以下 vue2无法兼容ie8版本
import {arrayMethods} from './array.js'
import {
    isObject, def
} from '../util/index'

class Observer {
    constructor(value) {
        // vue 如果数据的层次过多 需要递归的解析对象中的属性，依次增加set和get方法
        // value.__ob__ = this // 给每一个监控过的对象都增加一个__ob__属性
        def(value, '__ob__', this)
        if (Array.isArray(value)) {
            // 对数组监控
            // 如果是数组的话，并不会对索引进行观测 因为会导致性能问题
            // 前端开发中很少 去操作索引，一般会使用 push、pop、shift、unshift...
            value.__proto__ = arrayMethods
            // 如果数组里放的是对象再监控
            this.observerArray(value)
        } else {
            this.walk(value)
        }
    }
    observerArray(value) {
        for (let i = 0; i < value.length; i++) {
            observe(value[i])
        }
    }
    walk(data) {
        let keys = Object.keys(data)
        keys.forEach(key => {
            defineReactive(data, key, data[key]) // 定义响应式数据
        })
    }
}

function defineReactive(data, key, value) {
    observe(value) // 递归实现深度监测（数据越深，递归越多，从而导致性能浪费，所以写代码时，层级不要太多）
    Object.defineProperty(data, key, {
        get() { // 获取值的时候做一些操作
            return value
        },
        set(newValue) { // 设置值时也可以做一些操作
            console.log('更新数据')
            if (newValue === value) return
            observe(newValue) // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象
            value = newValue
        }
    })
}

export function observe(data) {
    let isObj = isObject(data)
    console.log(isObj)
    if (!isObj) {
        return
    }
    return new Observer(data) // 用来观测数据
}
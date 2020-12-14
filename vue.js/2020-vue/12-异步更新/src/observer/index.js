import {
    arrayMethods

} from './array.js'
import {
    isObject,
    def
} from '../util/index'
import Dep from './dep.js'

class Observer {
    constructor(value) {
        this.dep = new Dep // 给数组用的
        // vue 如果数据的层次过多 需要递归的解析对象中的属性，依次增加set和get方法
        // value.__ob__ = this // 我给每一个监控过的对象都增加一个__ob__属性，由于__ob__也是对象所以会递归观测，导致observerArray重复调用，造成死循环
        def(value, '__ob__', this)

        if (Array.isArray(value)) {
            // 如果数组的话并不会对索引进行观测 因为会导致性能问题
            // 前端开发很少会操作索引 一般会使用 push shift unshift...

            // 重写数组方法
            value.__proto__ = arrayMethods
            // 如果数组里放的是对象再进行监控
            this.observerArray(value) // 这里虽然递归了 但是没有依赖收集
        } else {
            this.walk(value)
        }
    }
    observerArray(value) {
        value.forEach(item => {
            observe(item)
        })
    }
    walk(data) {
        let keys = Object.keys(data)
        keys.forEach(key => {
            defineReactive(data, key, data[key]) // 定义响应式数据
        })
    }
}

function defineReactive(data, key, value) {
    let dep = new Dep() // 这个dep 是为了给对象使用的

    // 这里的value可能是数组 也可能是对象，返回的结果是observer的实例，当前这个value对象的observer
    let childOb = observe(value) // 递归实现深度监测（数据越深，递归越多，从而导致性能浪费，所以写代码时，层级不要太多）
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() { // 获取值时做一些操作
            console.log('取值') // 每个属性都对应着自己的watcher
            if (Dep.target) { // 如果当前有watcher
                dep.depend() // 意味着我要将watcher存起来
                if (childOb) {
                    console.log(childOb) // 数组的依赖收集
                    childOb.dep.depend() // 收集数组的依赖

                    // 如果数组中还有数组
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set(newValue) { // 设置值时也可以做一些操作
            // console.log('更新')
            if (newValue === value) return
            observe(newValue) // 继续劫持用户设置的值，因为有可能用户设置的值是一个对象
            value = newValue
            dep.notify() // 通知依赖的watcher来进行一个更新操作
        }
    })

}

function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
        let current = value[i]; // 将数组中的每一个都取出来，数据变化后 也去更新视图
        // 数组中的数组的依赖收集
        current.__ob__ && current.__ob__.dep.depend()
        if (Array.isArray(current)) {
            dependArray(current)
        }
    }
}

export function observe(data) {
    let isObj = isObject(data)
    if (!isObj) return

    return new Observer(data) // 用来观测数据

}
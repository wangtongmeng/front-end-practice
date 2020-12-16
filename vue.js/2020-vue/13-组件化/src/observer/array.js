// 重写数组的方法 push shift unshift pop reverse sort splice 会导致数组本身发生变化
let oldArrayMethods = Array.prototype
// value.__proto__ = arrayMethods // 劫持的方法会去arrayMethods找（原型链查找机制，向上查找，先找重写的，重写的没有继续向上查找）
// arrayMethods.__proto__ = oldArrayMethods // slice 会去oldArrayMethods找
export let arrayMethods = Object.create(oldArrayMethods)

const methods = [
    'push',
    'shift',
    'unshift',
    'pop',
    'sort',
    'splice',
    'reverse'
]

methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        console.log('用户调用了push方法') // AOP 切片编程
        const result = oldArrayMethods[method].apply(this, args) // 调用原生的数组方法
        // push unshift 添加的元素可能还是一个对象
        let inserted // 当前用户插入的元素
        let ob = this.__ob__
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice': // 3个 新增的属性 splice 有删除 新增的功能 arr.splice(0, 1, {name: 1})
                inserted = args.slice(2)
            default:
                break;
        }
        if (inserted) ob.observerArray(inserted) // 将新增属性继续观测

        ob.dep.notify() // 如果用户调用了 上述方法 我会通知当前这个dep去更新
        return result
    }
})
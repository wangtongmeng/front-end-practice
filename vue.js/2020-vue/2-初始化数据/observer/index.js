// 把data中的数据 都使用Object.defineProperty重新定义 es5方法
// Object.defineProperty 不能兼容ie8及以下 vue2无法兼容ie8版本
import {isObject} from '../util/index'
export function observe(data) {
    let isObj = isObject(data)
    console.log(isObj)
    if (!isObj) {
        return
    }
}
export function isObject(val) {
    return typeof val == 'object' && val !== null;
}
// ...

export function hasChanged(oldValue, newValue) {
    return oldValue !== newValue
}

export let isArray = Array.isArray;

export let extend = Object.assign;
export let isString = (val) => typeof val == 'string'

export const isIntegerKey = (key) => {
    return parseInt(key) + '' === key
}
export const isFunction = (v)=>typeof v == 'function'

export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

// 用于组合  权限里面 有管理员权限，用户权限。可以使用这种方式实现权限的组合和校验
export const enum ShapeFlags {
    ELEMENT = 1, // 标识是一个元素
    FUNCTIONAL_COMPONENT = 1 << 1, // 函数组件
    STATEFUL_COMPONENT = 1 << 2, // 带状态的组件
    TEXT_CHILDREN = 1 << 3, // 这个组件的孩子是文本
    ARRAY_CHILDREN = 1 << 4, // 孩子是数组
    SLOTS_CHILDREN = 1 << 5, // 插槽孩子
    TELEPORT = 1 << 6, // 传送门
    SUSPENSE = 1 << 7, // 实现异步组件等待
    COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8, // 是否需要keep-alive
    COMPONENT_KEPT_ALIVE = 1 << 9, // 组件的keep-alive
    COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
// 10:50继续

// 按位或有一个是1 就是1
// 100  
// 010
// 110
// 按位与
// const manager = 1<<1 // 2
// const user = 1<<2 // 4
// const order = 1<<3 // 8
// const admin = manager | user
// admin & order > 0 有权限
// admin & order == 0 没权限
// admin & user >  有权限
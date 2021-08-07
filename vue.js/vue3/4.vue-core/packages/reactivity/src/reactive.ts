// 是否是浅的，默认是深度

import { isObject } from "@vue/shared";
import { mutableHandler, readonlyHandlers, shallowReactiveHandlers, shallowReadonlyHanlders } from "./baseHandlers";

// 是否是仅读的 默认不是仅读的

export function reactive(target) {
    return createReactiveObject(target, false, mutableHandler);
}
export function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}
export function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers);
}
export function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHanlders);
}
/**
 * 
 * @param target 创建代理的目标
 * @param isReadonly 当前是不是仅读的
 * @param baseHandler 针对不同的方式创建不同的代理对象  
 */
// weakMap(key只能是对象) map(key可以是其他类型)
const reactiveMap = new WeakMap(); // 目的是添加缓存
const readonlyMap = new WeakMap();
function createReactiveObject(target, isReadonly, baseHandler) {
    if(!isObject(target)){
        return target;
    }
    const proxyMap = isReadonly? readonlyMap:reactiveMap
    const existProxy = proxyMap.get(target);
    if(existProxy){
        return existProxy;// 如果已经代理过了，那就直接把上次的代理返回就可以的 
    }
    // 如果是对象 就做一个代理 new proxy
    const proxy = new Proxy(target,baseHandler);
    proxyMap.set(target,proxy);
    return proxy;
}

// 数组，对象是如何劫持 effect 的实现 ref的实现。。。
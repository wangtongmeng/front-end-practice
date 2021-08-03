import { extend, hasChanged, isArray, isObject, hasOwn, isIntegerKey } from "@vue/shared";
import { reactive, readonly } from "./reactive";
import {activeEffect, track, trigger} from './effect'
function createGetter(isReadonly = false, shallow = false) {
    /**
     * target 是原来的对象
     * key 去取什么属性
     * recevier 代理对象
     */
    return function get(target, key, receiver) {
        // return target[key];
        // Reflect 就是要后续慢慢替换掉Object对象，一般使用proxy 会配合Reflect
        const res = Reflect.get(target, key, receiver); // Reflect.ownKey Reflect.defineProperty
        if (!isReadonly) {
           track(target,'get',key);
        }
        if (shallow) {
            return res;
        }
        if (isObject(res)) { // 懒递归 当我们取值的时候才去做递归代理，如果不取默认值代理一层
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    }
    // vue3 针对的是对象来进行劫持， 不用改写原来的对象,如果是嵌套，当取值的时候才会代理
    // vue2 针对的是属性劫持，改写了原来对象，一上来就递归的
    // vue3 可以对不存在的属性进行获取，也会走get方法, proxy支持数组
}
function createSetter(shallow = false) {
    // 针对数组而言 如果调用push方法，就会产生2次处罚 1.给数组新增了一项，同时也更改了长度 2.因为更改了长度再次触发set （第二次的触发是无意义的）
    return function set(target, key, value, receiver) {
        const oldValue = target[key]; // 获取老值
        // target[key] = value; // 如果设置失败 没有返回值
        // 有一个属性不能被修改 target[key] = value;  不会报错，但是通过Reflect.set 会返回false
        // 设置属性，可能以前有，还有可能以前没有 （新增和修改）
        // 如何判断数组是新增还是修改
       
        let hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const res = Reflect.set(target, key, value, receiver);
        if(!hadKey){
            trigger(target,'add',key,value);
        }else if (hasChanged(oldValue, value)) {
            trigger(target,'set',key,value,oldValue);
        }
     
        return res
    }
}
const get = createGetter(); // 不是仅读的也不是浅的
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
const set = createSetter();
const shallowSet = createSetter(true); // readonly没有set
// new Proxy(target,{})
export const mutableHandler = { // reactive中的get和set
    get,
    set
}
export const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
}
let readonlySet = {
    set(target, key) {
        console.warn(`cannot set ${JSON.stringify(target)} on  key ${key} falied`)
    }
}
export const readonlyHandlers = extend({
    get: readonlyGet,
}, readonlySet)
export const shallowReadonlyHanlders = extend({
    get: shallowReadonlyGet
}, readonlySet)

// 取值 设置值 
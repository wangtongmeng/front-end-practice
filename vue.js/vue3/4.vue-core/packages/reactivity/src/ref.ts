import { hasChanged, isArray, isObject } from "@vue/shared";
import { track, trigger } from "./effect";
import { reactive } from "./reactive";

export function ref(value) { // 可以传入对象
    // 把普通值变成一个引用类型, 让一个普通值也具备响应式的能力
    return createRef(value)
}


export function shallowRef(value) {
    return createRef(value, true)
}


// ts 中实现类的话 私有属性必须要先声明才能使用
const convert = (v) => isObject(v) ? reactive(v) : v;
class RefImpl { // 以前实现原理 确实是个对象，但是为了识别身份，用了类
    public _value;
    public __v_isRef = true // 表示他是一个ref
    // public rawValue
    constructor(public rawValue, public shallow) {
        this._value = shallow ? rawValue : convert(rawValue)
        // this.rawValue = rawValue
    }
    get value() {
        // 收集依赖
        track(this, 'get', 'value')
        return this._value;
    }
    set value(newValue) {
        // 触发依赖
        if (hasChanged(newValue, this.rawValue)) {
            this.rawValue = newValue; // 用于下次比对
            this._value = this.shallow ? newValue : convert(newValue)

            trigger(this, 'set', 'value', newValue)
        }
    }
}
function createRef(value, shallow = false) {
    return new RefImpl(value, shallow); // 借助类的属性访问器 
}

class ObjectRefImpl {
    public __v_isRef = true;
    constructor(public target, public key) {
    }
    get value() {
        return this.target[this.key];
    }
    set value(newValue) {
        this.target[this.key] = newValue
    }
}
export function toRef(target, key) {
    return new ObjectRefImpl(target, key)
}

export function toRefs(target){
    const res = isArray(target)? new Array(target.length) : {};
    for(let key in target){
        res[key] = toRef(target,key)
    }
    return res;
}

// ref 其他方法实现 计算实习
// effect 和 reactive 和 ref的关系 
// computed 通过源码调试一遍
// 把vue3的渲染原理，diff算法
import { isObject } from "@vue/shared";
import { effect, track, trigger } from "./effect";
class ComputedRefImpl {
    public effect;
    public _value;
    public _dirty = true
    constructor(public getter, public setter) {
        // 返还了 effect的执行权限
        // 我们传入了scheduler后，下次数据更新，原则上应该让effect重新执行，下次更新会调用scheduler
        this.effect = effect(getter, {
            lazy: true, schedular: (effect) => {
                // 自己来实现逻辑
                if(!this._dirty){
                    console.log('用户更改了依赖的属性')
                    this._dirty = true;  
                    trigger(this,'get','value');
                }
            }
        })
    }
    // 如果用户不去计算属性中取值 就不会执行计算属性的effect
    get value() {
        if (this._dirty) {
            this._value = this.effect();
            this._dirty = false;
        }
        track(this,'get','value')
        return this._value
    }
    set value(newValue) {
        // 当用户给计算属性设置值的时候会触发 set方法，此时调用计算属性的setter
        this.setter(newValue)
    }
}
export function computed(getterOrOptions) {
    let getter;
    let setter;

    if (isObject(getterOrOptions)) {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    } else {
        getter = getterOrOptions;
        setter = () => {
            console.log(`computed not set`)
        }
    }
    return new ComputedRefImpl(getter, setter)
}
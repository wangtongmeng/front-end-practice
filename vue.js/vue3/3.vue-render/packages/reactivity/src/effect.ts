import { isArray, isIntegerKey } from "@vue/shared";

export function effect(fn, options: any = {}) {
    const effect = createReactiveEffect(fn,options);
    if(!options.lazy){
        effect();
    }
    return effect; // 返回响应式的effect
}   
export let activeEffect;
const effectStack = [];
let id = 0;

// 当用户取值的时候需要将activeEffect 和 属性做关联
// 当用户更改的时候 要通过属性找到effect重新执行
function createReactiveEffect(fn,options){
    const effect = function reactiveEffect(){ // 这就是effect中的effect
        try{
            effectStack.push(effect);
            activeEffect = effect;
            return fn(); // 会取值
        }finally{
            effectStack.pop();
            activeEffect = effectStack[effectStack.length -1 ];
        }
    }
    effect.id = id++; // 构建的是一个id
    effect.__isEffect = true;
    effect.options = options;
    effect.deps = []; // effect用来收集依赖了那些属性
    return effect;
}
// 一个属性对应多个effect， 一个effect还可以对应多个属性
// target key = [effect,effect]

// Map{
//     {name:'zf',age:12}:{
//         age:new Set(effect),
//         name:new Set(effect),
//     },
// }
const targetMap = new WeakMap;
export function track(target,type,key){
    if(activeEffect == undefined){
        return; // 用户只是取了值，而且这个值不是在effect中使用的 ，什么都不用收集
    }
    let depsMap =  targetMap.get(target);
    if(!depsMap) {
        targetMap.set(target,(depsMap = new Map()))
    }
    let dep = depsMap.get(key);
    if(!dep){
        depsMap.set(key,( dep = new Set()))
    }
    if(!dep.has(activeEffect)){
        dep.add(activeEffect)
    }
}
export function trigger(target,type,key,newValue?,oldValue?){
    // 去映射表里找到属性对应的 effect， 让她重新执行
    const depsMap = targetMap.get(target);
    if(!depsMap) return; // 只是改了属性，这个属性没有在effect中使用
    const effectsSet=  new Set();
    const add = (effectsAdd)=>{ // 如果同时有多个 依赖的effect是同一个 还用set做了一个过滤
        if(effectsAdd){
            effectsAdd.forEach(effect=>effectsSet.add(effect));
        }
    }
    // 1.如果更改的数组长度 小于依赖收集的长度 要触发重新渲染
    // 2.如果调用了push方法 或者其他新增数组的方法（必须能改变长度的方法）， 也要触发更新
    if(key === 'length' && isArray(target)){ // 如果是数组，你改了length
        depsMap.forEach((dep,key)=>{
            if(key > newValue || key === 'length'){
                add(dep); // 更改的数组长度 比收集到的属性的值小
            }
        })
    }else{
        add(depsMap.get(key));
        switch(type){
            case 'add':
                if(isArray(target) && isIntegerKey(key)){
                    add(depsMap.get('length')); // 增加属性 需要触发length的依赖收集
                }
        }
    }
    effectsSet.forEach((effect:any)=>{
        // 数据变化原则上应该触发对应的effect让他重新执行,如果effect提供了scheduler那么就让这个scheduler执行，不让effect重新执行
        if(effect.options.schedular){
            effect.options.schedular(effect)
        }else{
            effect();
        }
    });
    // 23 继续
}
// [fn1] activeEffect = fn1   proxy.name
// [fn1,fn2]  activeEffect = fn2   proxy.agre
// [fn1] activeEffect = fn1 =  Proxy.address:
// effect(()=>{ // fn1
//     proxy.name
//     effect(()=>{ // fn2
//         proxy.agre
//     })
//     Proxy.address:
// })
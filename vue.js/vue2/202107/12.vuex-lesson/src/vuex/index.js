let Vue;

import ModuleCollection from "./module/module-collection";
import { forEachValue } from "./utils";

// root = {
//     _raw:默认显示用户原始的内容
//     _children:{
//         a:{ _raw: a模块的原始内容, _children:{},state:aState},
//         a:{ _raw: b模块的原始内容, _children:{},state:bState}
//     },
//     state:'根模块的状态'
// }

/**
 * 
 * @param {*} store  store属性
 * @param {*} path   构造的递归栈结构
 * @param {*} module 当前安装的模块
 */
const installModule = (store, path, module, rootState) => { // 注册所有的getter，mutation，actions
    if (path.length > 0) { // 循环的是子模块 [a]
        // 给rootState 添加模块的属性
        let parent = path.slice(0, -1).reduce((memo, current) => memo[current], rootState)
        // 后续数据可能是动态注册的模块，如果原来没有属性，新增了不会导致视图更新
        Vue.set(parent, path[path.length - 1], module.state)
    }
    module.forEachMutation((mutation, key) => {
        store._mutations[key] = (store._mutations[key] || [])
        store._mutations[key].push((payload) => {
            mutation(module.state, payload); // mutation执行
        })
    });
    module.forEachAction((action, key) => {
        store._actions[key] = (store._actions[key] || [])
        store._actions[key].push((payload) => {
            action(store, payload); // action执行
        })
    });
    module.forEachGetter((getter, key) => {
        store._wrappedGetters[key] = function() {
            return getter(module.state); // 计算属性执行
        }
    });
    module.forEachChildren((child, key) => {
        installModule(store, path.concat(key), child, rootState);
    })
}

function setStoreVM(store, state) {
    let computed = {};
    store.getters = {}; // 用户最后会访问这个复习
    forEachValue(store._wrappedGetters, (fn, key) => {
        computed[key] = () => {
            return fn(store.state);
        }
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]
        })
    })
    store._vm = new Vue({
        data: {
            $$state: state
        },
        computed
    })
}
class Store {
    constructor(options) {
        // 1.对用户的数据进行格式化操作
        const store = this;
        store._module = new ModuleCollection(options);
        store._actions = {}; // 收集所有模块的action
        store._mutations = {}; // 收集所有的mutations 
        store._wrappedGetters = {}; // 收集用户定义的所有getter
        let state = options.state;
        installModule(store, [], store._module.root, state);
        setStoreVM(store, state);

    }
    commit = (type, payload) => { //  this永远指向store容器
        this._mutations[type].forEach(fn => fn(payload))
    }
    dispatch = (type, payload) => { //  this永远指向store容器
        this._actions[type].forEach(fn => fn(payload))
    }
    get state() {
        return this._vm._data.$$state // 响应式数据
    }
}
export default {
    Store,
    install(_Vue) {
        Vue = _Vue
        // 需要获取到 父组件中定义的store属性， 每个组件运行的时候都能拿到store


        // Vue.prototype.$store 比较暴力 全部都添加了，我只希望覆盖到自己的子组件即可
        Vue.mixin({
            // 实现所有的组件能共享store属性
            beforeCreate() {
                const options = this.$options;
                if (options.store) { // 根组件
                    this.$store = options.store; // 根组件上有一个$store属性
                } else { // 要么是子组件要么是平级组件 （排除掉平级组件）
                    if (this.$parent && this.$parent.$store) {
                        this.$store = this.$parent.$store
                    }
                }
            }
        })
    }
}
// 父 $store -》 儿子$store -》 孙子 $store



// let state = options.state; // 直接将用户的定义的状态放在容器的store里

// let getters = options.getters;
// let computed = {};
// this.getters = {}
// forEachValue(getters, (fn, key) => {
//     computed[key] = () => { // 将用户的实现保存在computed上
//         return fn(this.state)
//     }
//     // 用户通过$store.getters.xxx取值时 取的就是计算属性
//     Object.defineProperty(this.getters, key, { // 取值时会获取计算属性
//         get: () => {
//             return this.vm[key]; // 如果依赖的值不变会走缓存
//         }
//     })
// });
// this.vm = new Vue({
//     data: {
//         $$state: state // 定义一$开头的属性 不会定义在vm上
//     },
//     computed // 将用户的属性存到computed中定义在实例上
// });
// let mutations = options.mutations;
// this.mutations = {}
// forEachValue(mutations, (fn, key) => { // 订阅模式
//     this.mutations[key] = (payload) => fn(this.state, payload);
// })
// let actions = options.actions;
// this.actions = {}
// forEachValue(actions, (fn, key) => { // 订阅模式
//     this.actions[key] = (payload) => fn(this, payload);
// })
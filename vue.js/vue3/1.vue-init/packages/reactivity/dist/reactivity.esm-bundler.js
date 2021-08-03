function isObject(val) {
    return typeof val == 'object' && val !== null;
}
// ...
var extend = Object.assign;

function createGetter(isReadonly, shallow) {
    /**
     * target 是原来的对象
     * key 去取什么属性
     * recevier 代理对象
     */
    return function get(target, key, recevier) {
        console.log(target, key, recevier);
    };
}
function createSetter(shallow) {
    return function set() {
    };
}
var get = createGetter(); // 不是仅读的也不是浅的
var shallowGet = createGetter();
var readonlyGet = createGetter();
var shallowReadonlyGet = createGetter();
var set = createSetter();
var shallowSet = createSetter(); // readonly没有set
// new Proxy(target,{})
var mutableHandler = {
    get: get,
    set: set
};
var shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
};
var readonlySet = {
    set: function (target, key) {
        console.warn("cannot set " + JSON.stringify(target) + " on  key " + key + " falied");
    }
};
var readonlyHandlers = extend({
    get: readonlyGet,
}, readonlySet);
var shallowReadonlyHanlders = extend({
    get: shallowReadonlyGet
}, readonlySet);
// 取值 设置值

// 是否是浅的，默认是深度
// 是否是仅读的 默认不是仅读的
function reactive(target) {
    return createReactiveObject(target, false, mutableHandler);
}
function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}
function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers);
}
function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHanlders);
}
/**
 *
 * @param target 创建代理的目标
 * @param isReadonly 当前是不是仅读的
 * @param baseHandler 针对不同的方式创建不同的代理对象
 */
// weakMap(key只能是对象) map(key可以是其他类型)
var reactiveMap = new WeakMap(); // 目的是添加缓存
var readonlyMap = new WeakMap();
function createReactiveObject(target, isReadonly, baseHandler) {
    if (!isObject(target)) {
        return target;
    }
    var proxyMap = isReadonly ? readonlyMap : reactiveMap;
    var existProxy = proxyMap.get(target);
    if (existProxy) {
        return existProxy; // 如果已经代理过了，那就直接把上次的代理返回就可以的 
    }
    // 如果是对象 就做一个代理 new proxy
    var proxy = new Proxy(target, baseHandler);
    proxyMap.set(target, proxy);
    return proxy;
}
// 数组，对象是如何劫持 effect 的实现 ref的实现。。。

export { reactive, readonly, shallowReactive, shallowReadonly };
//# sourceMappingURL=reactivity.esm-bundler.js.map

var VueRuntimeDOM = (function (exports) {
    'use strict';

    function isObject(val) {
        return typeof val == 'object' && val !== null;
    }
    // ...
    function hasChanged(oldValue, newValue) {
        return oldValue !== newValue;
    }
    var isArray = Array.isArray;
    var extend = Object.assign;
    var isString = function (val) { return typeof val == 'string'; };
    var isIntegerKey = function (key) {
        return parseInt(key) + '' === key;
    };
    var isFunction = function (v) { return typeof v == 'function'; };
    var hasOwn = function (target, key) { return Object.prototype.hasOwnProperty.call(target, key); };
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

    function effect(fn, options) {
        if (options === void 0) { options = {}; }
        var effect = createReactiveEffect(fn, options);
        if (!options.lazy) {
            effect();
        }
        return effect; // 返回响应式的effect
    }
    var activeEffect;
    var effectStack = [];
    var id = 0;
    // 当用户取值的时候需要将activeEffect 和 属性做关联
    // 当用户更改的时候 要通过属性找到effect重新执行
    function createReactiveEffect(fn, options) {
        var effect = function reactiveEffect() {
            try {
                effectStack.push(effect);
                activeEffect = effect;
                return fn(); // 会取值
            }
            finally {
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1];
            }
        };
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
    var targetMap = new WeakMap;
    function track(target, type, key) {
        if (activeEffect == undefined) {
            return; // 用户只是取了值，而且这个值不是在effect中使用的 ，什么都不用收集
        }
        var depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()));
        }
        var dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = new Set()));
        }
        if (!dep.has(activeEffect)) {
            dep.add(activeEffect);
        }
    }
    function trigger(target, type, key, newValue, oldValue) {
        // 去映射表里找到属性对应的 effect， 让她重新执行
        var depsMap = targetMap.get(target);
        if (!depsMap)
            return; // 只是改了属性，这个属性没有在effect中使用
        var effectsSet = new Set();
        var add = function (effectsAdd) {
            if (effectsAdd) {
                effectsAdd.forEach(function (effect) { return effectsSet.add(effect); });
            }
        };
        // 1.如果更改的数组长度 小于依赖收集的长度 要触发重新渲染
        // 2.如果调用了push方法 或者其他新增数组的方法（必须能改变长度的方法）， 也要触发更新
        if (key === 'length' && isArray(target)) { // 如果是数组，你改了length
            depsMap.forEach(function (dep, key) {
                if (key > newValue || key === 'length') {
                    add(dep); // 更改的数组长度 比收集到的属性的值小
                }
            });
        }
        else {
            add(depsMap.get(key));
            switch (type) {
                case 'add':
                    if (isArray(target) && isIntegerKey(key)) {
                        add(depsMap.get('length')); // 增加属性 需要触发length的依赖收集
                    }
            }
        }
        effectsSet.forEach(function (effect) {
            // 数据变化原则上应该触发对应的effect让他重新执行,如果effect提供了scheduler那么就让这个scheduler执行，不让effect重新执行
            if (effect.options.schedular) {
                effect.options.schedular(effect);
            }
            else {
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

    function createGetter(isReadonly, shallow) {
        if (isReadonly === void 0) { isReadonly = false; }
        if (shallow === void 0) { shallow = false; }
        /**
         * target 是原来的对象
         * key 去取什么属性
         * recevier 代理对象
         */
        return function get(target, key, receiver) {
            // return target[key];
            // Reflect 就是要后续慢慢替换掉Object对象，一般使用proxy 会配合Reflect
            var res = Reflect.get(target, key, receiver); // Reflect.ownKey Reflect.defineProperty
            if (!isReadonly) {
                track(target, 'get', key);
            }
            if (shallow) {
                return res;
            }
            if (isObject(res)) { // 懒递归 当我们取值的时候才去做递归代理，如果不取默认值代理一层
                return isReadonly ? readonly(res) : reactive(res);
            }
            return res;
        };
        // vue3 针对的是对象来进行劫持， 不用改写原来的对象,如果是嵌套，当取值的时候才会代理
        // vue2 针对的是属性劫持，改写了原来对象，一上来就递归的
        // vue3 可以对不存在的属性进行获取，也会走get方法, proxy支持数组
    }
    function createSetter(shallow) {
        // 针对数组而言 如果调用push方法，就会产生2次处罚 1.给数组新增了一项，同时也更改了长度 2.因为更改了长度再次触发set （第二次的触发是无意义的）
        return function set(target, key, value, receiver) {
            var oldValue = target[key]; // 获取老值
            // target[key] = value; // 如果设置失败 没有返回值
            // 有一个属性不能被修改 target[key] = value;  不会报错，但是通过Reflect.set 会返回false
            // 设置属性，可能以前有，还有可能以前没有 （新增和修改）
            // 如何判断数组是新增还是修改
            var hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
            var res = Reflect.set(target, key, value, receiver);
            if (!hadKey) {
                trigger(target, 'add', key, value);
            }
            else if (hasChanged(oldValue, value)) {
                trigger(target, 'set', key, value);
            }
            return res;
        };
    }
    var get = createGetter(); // 不是仅读的也不是浅的
    var shallowGet = createGetter(false, true);
    var readonlyGet = createGetter(true);
    var shallowReadonlyGet = createGetter(true, true);
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

    function ref(value) {
        // 把普通值变成一个引用类型, 让一个普通值也具备响应式的能力
        return createRef(value);
    }
    // ts 中实现类的话 私有属性必须要先声明才能使用
    var convert = function (v) { return isObject(v) ? reactive(v) : v; };
    var RefImpl = /** @class */ (function () {
        // public rawValue
        function RefImpl(rawValue, shallow) {
            this.rawValue = rawValue;
            this.shallow = shallow;
            this.__v_isRef = true; // 表示他是一个ref
            this._value = shallow ? rawValue : convert(rawValue);
            // this.rawValue = rawValue
        }
        Object.defineProperty(RefImpl.prototype, "value", {
            get: function () {
                // 收集依赖
                track(this, 'get', 'value');
                return this._value;
            },
            set: function (newValue) {
                // 触发依赖
                if (hasChanged(newValue, this.rawValue)) {
                    this.rawValue = newValue; // 用于下次比对
                    this._value = this.shallow ? newValue : convert(newValue);
                    trigger(this, 'set', 'value', newValue);
                }
            },
            enumerable: false,
            configurable: true
        });
        return RefImpl;
    }());
    function createRef(value, shallow) {
        if (shallow === void 0) { shallow = false; }
        return new RefImpl(value, shallow); // 借助类的属性访问器 
    }
    var ObjectRefImpl = /** @class */ (function () {
        function ObjectRefImpl(target, key) {
            this.target = target;
            this.key = key;
            this.__v_isRef = true;
        }
        Object.defineProperty(ObjectRefImpl.prototype, "value", {
            get: function () {
                return this.target[this.key];
            },
            set: function (newValue) {
                this.target[this.key] = newValue;
            },
            enumerable: false,
            configurable: true
        });
        return ObjectRefImpl;
    }());
    function toRef(target, key) {
        return new ObjectRefImpl(target, key);
    }
    function toRefs(target) {
        var res = isArray(target) ? new Array(target.length) : {};
        for (var key in target) {
            res[key] = toRef(target, key);
        }
        return res;
    }
    // ref 其他方法实现 计算实习
    // effect 和 reactive 和 ref的关系 
    // computed 通过源码调试一遍
    // 把vue3的渲染原理，diff算法

    var ComputedRefImpl = /** @class */ (function () {
        function ComputedRefImpl(getter, setter) {
            var _this = this;
            this.getter = getter;
            this.setter = setter;
            this._dirty = true;
            // 返还了 effect的执行权限
            // 我们传入了scheduler后，下次数据更新，原则上应该让effect重新执行，下次更新会调用scheduler
            this.effect = effect(getter, {
                lazy: true, schedular: function (effect) {
                    // 自己来实现逻辑
                    if (!_this._dirty) {
                        console.log('用户更改了依赖的属性');
                        _this._dirty = true;
                        trigger(_this, 'get', 'value');
                    }
                }
            });
        }
        Object.defineProperty(ComputedRefImpl.prototype, "value", {
            // 如果用户不去计算属性中取值 就不会执行计算属性的effect
            get: function () {
                if (this._dirty) {
                    this._value = this.effect();
                    this._dirty = false;
                }
                track(this, 'get', 'value');
                return this._value;
            },
            set: function (newValue) {
                // 当用户给计算属性设置值的时候会触发 set方法，此时调用计算属性的setter
                this.setter(newValue);
            },
            enumerable: false,
            configurable: true
        });
        return ComputedRefImpl;
    }());
    function computed(getterOrOptions) {
        var getter;
        var setter;
        if (isObject(getterOrOptions)) {
            getter = getterOrOptions.get;
            setter = getterOrOptions.set;
        }
        else {
            getter = getterOrOptions;
            setter = function () {
                console.log("computed not set");
            };
        }
        return new ComputedRefImpl(getter, setter);
    }

    // h('h1',{},'abc');
    function createVnode(type, props, children) {
        if (children === void 0) { children = null; }
        // 虚拟节点上属性有哪些？ 必须药有的 type , props, children ,key  __v_isVnode
        var shapeFlag = isString(type) ?
            1 /* ELEMENT */ : isObject(type) ?
            4 /* STATEFUL_COMPONENT */ : 0;
        var vnode = {
            __v_isVnode: true,
            type: type,
            props: props,
            children: children,
            key: props && props.key,
            el: null,
            shapeFlag: shapeFlag,
            component: null, // 组件的实例
        };
        // 等会做diff算法 肯定要有一个老的虚拟节点 （对应着真实的DOM）， 新的虚拟节点。 虚拟节点比对差异，将差异放到真实的节点上
        normalizeChildren(vnode, children);
        return vnode; // 返回最后的虚拟节点
    }
    function normalizeChildren(vnode, children) {
        var type = 0;
        if (children == null) ;
        else if (isArray(children)) { // 没有处理对象
            type = 16 /* ARRAY_CHILDREN */;
        }
        else {
            type = 8 /* TEXT_CHILDREN */;
        }
        vnode.shapeFlag |= type;
    }

    // 虚拟节点？ 1. 虚拟节点的好处就是可以支持跨平台  2. 如果后续操作可以都在虚拟dom上进行操作，最后一起更新页面，在真实dom之前的一个缓存
    function createAppAPI(render) {
        return function (rootComponent, rootProps) {
            var app = {
                // 全局的方法例如 app.component  app.directives app.mixin
                _component: rootComponent,
                _props: rootProps,
                _container: null,
                mount: function (container) {
                    // 1. 根据用户传入的组件生成一个虚拟节点
                    var vnode = createVnode(rootComponent, rootProps);
                    app._container = container;
                    // 2. 将虚拟节点变成真实节点，插入到对应的容器中
                    render(vnode, container);
                    // console.log(rootComponent, rootProps, container, rendererOptions)
                }
            };
            return app;
        };
    }

    var componentPublicInstance = {
        get: function (_a, key) {
            var instance = _a._;
            var setupState = instance.setupState, props = instance.props, ctx = instance.ctx;
            if (hasOwn(setupState, key)) { // 先自己的状态 在像上下文中查找，在像属性中查找
                return setupState[key];
            }
            else if (hasOwn(ctx, key)) {
                return ctx[key];
            }
            else if (hasOwn(props, key)) {
                return props[key];
            }
        },
        set: function (_a, key, value) {
            var instance = _a._;
            var setupState = instance.setupState, props = instance.props;
            if (hasOwn(setupState, key)) {
                setupState[key] = value;
            }
            else if (hasOwn(props, key)) {
                props[key] = value;
            }
            return true;
        }
    };

    var uid = 0;
    function createComponentInstance(vnode) {
        var instance = {
            uid: uid++,
            vnode: vnode,
            type: vnode.type,
            props: {},
            attrs: {},
            slots: {},
            setupState: {},
            proxy: null,
            emit: null,
            ctx: {},
            isMounted: false,
            subTree: null,
            render: null
        };
        instance.ctx = { _: instance }; // 将自己放到了上下文中, 并且在生成环境下+_ 标识不希望用户通过_放到里边的变量
        return instance;
    }
    function setupComponent(instance) {
        var _a = instance.vnode, props = _a.props, children = _a.children;
        // 初始化属性  initProps  ? 
        // 初始化插槽  initSlots  ?
        instance.props = props;
        instance.slots = children;
        instance.proxy = new Proxy(instance.ctx, componentPublicInstance);
        setupStatefulComponent(instance);
    }
    function createSetupContext(instance) {
        return {
            attrs: instance.attrs,
            slots: instance.slots,
            emit: instance.emit,
            expose: function () { } // 是为了表示组件暴露了哪些方法 ，用户可以通过ref 调用哪些方法
        };
    }
    function setupStatefulComponent(instance) {
        var Component = instance.type;
        var setup = Component.setup;
        if (setup) { // 说明用户提供了setup方法
            var setupContext = createSetupContext(instance);
            var setupResult = setup(instance.props, setupContext);
            handleSetupResult(instance, setupResult);
        }
        else {
            finishComponentSetup(instance); // 如果用户没写setup 那么直接用外面的render
        }
    }
    function handleSetupResult(instance, setupResult) {
        if (isObject(setupResult)) {
            instance.setupState = setupResult;
        }
        else if (isFunction(setupResult)) {
            instance.render = setupResult;
        }
        //  处理 后可能依旧没有render 1） 用户没写setup  2) 用户写了setup但是什么都没返回
        finishComponentSetup(instance);
    }
    function finishComponentSetup(instance) {
        var Component = instance.type;
        if (!instance.render) {
            if (!Component.render && Component.template) ;
            instance.render = Component.render;
        }
        console.log(instance);
    }

    // 不在关心是什么平台了
    function createRenderer(rendererOptions) {
        var hostInsert = rendererOptions.insert, hostRemove = rendererOptions.remove, hostPatchProp = rendererOptions.patchProp, hostCreateElement = rendererOptions.createElement; rendererOptions.createText; rendererOptions.setText; var hostSetElementText = rendererOptions.setElementText; rendererOptions.parentNode; rendererOptions.nextSibling;
        var setupRenderEffect = function (instance, container) {
            effect(function componentEffect() {
                if (!instance.isMounted) {
                    // 组件渲染的内容就是subTree
                    var subTree = instance.subTree = instance.render.call(instance.proxy, instance.proxy); // 调用render， render需要获取数据
                    patch(null, subTree, container);
                    instance.isMounted = true;
                }
                else {
                    var prevTree = instance.subTree; // 数据没变的时候的subTree
                    // 在次调用render此时用的是最新数据渲染出来了
                    var nextTree = instance.render.call(instance.proxy, instance.proxy);
                    instance.subTree = nextTree;
                    // diff算法
                    patch(prevTree, nextTree, container);
                }
            });
        };
        var mountComponent = function (n2, container) {
            // 1.组件的创建 需要产生一个组件的实例，调用组件实例上的setup方法拿到 render函数，在调用render函数，拿到组件对应（要渲染的内容）的虚拟DOM subTree
            var instance = n2.component = createComponentInstance(n2); // 根据虚拟节点创造一个实例
            // 2.给instance 增加属性， 调用setup ，拿到里面的信息
            setupComponent(instance);
            // 3.调用render。 每个组件都有一个 effect
            setupRenderEffect(instance, container);
        };
        var processComponent = function (n1, n2, container) {
            if (n1 == null) {
                mountComponent(n2, container); // 创建组件
            }
        };
        function mountChildren(children, container) {
            for (var i = 0; i < children.length; i++) {
                patch(null, children[i], container);
            }
        }
        function mountElement(vnode, container, anchor) {
            var type = vnode.type, props = vnode.props, children = vnode.children, shapeFlag = vnode.shapeFlag;
            var el = vnode.el = hostCreateElement(type); // 对应的是真实DOM元素
            if (props) {
                for (var key in props) {
                    hostPatchProp(el, key, null, props[key]);
                }
            }
            // 父创建完毕后 需要创建儿子
            if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                mountChildren(children, el);
            }
            else if (shapeFlag & 8 /* TEXT_CHILDREN */) {
                hostSetElementText(el, children);
            }
            hostInsert(el, container, anchor);
        }
        var patchProps = function (el, oldProps, newProps) {
            if (oldProps !== newProps) {
                for (var key in newProps) {
                    var prev = oldProps[key];
                    var next = newProps[key];
                    if (prev !== next) {
                        hostPatchProp(el, key, prev, next);
                    }
                }
                for (var key in oldProps) {
                    if (!(key in newProps)) {
                        hostPatchProp(el, key, oldProps[key], null);
                    }
                }
            }
        };
        var patchChildren = function (n1, n2, container) {
            var c1 = n1.children;
            var c2 = n2.children; // 儿子之间的对比了
            // 儿子之间的比较 1.一方有儿子 一方没儿子  、 2.以前没儿子 现在有儿子 ， 3.两方都是文本，直接用新的换掉老的 ，4. 最后一个就是直接用方都有儿子 就比对两个儿子的差异
            var prevShapeFlag = n1.shapeFlag;
            var shapeFlag = n2.shapeFlag;
            if (shapeFlag & 8 /* TEXT_CHILDREN */) {
                hostSetElementText(container, c2); // 直接干掉以前的
            }
            else {
                // 现在是数组
                if (prevShapeFlag & 16 /* ARRAY_CHILDREN */) { // 之前的是文本
                    // 两个都是数组
                    patchKeyedChildren(c1, c2, container);
                }
                else {
                    // 之前的是文本，现在是数组
                    hostSetElementText(container, '');
                    mountChildren(c2, container);
                }
            }
        };
        var patchKeyedChildren = function (c1, c2, container) {
            var i = 0;
            var e1 = c1.length - 1;
            var e2 = c2.length - 1;
            // sync from start
            while (i <= e1 && i <= e2) { // 以短的为主,谁先遍历完毕就终止了
                var n1 = c1[i];
                var n2 = c2[i];
                if (isSameVnode(n1, n2)) { // 是同一个元素 要比较属性，和这两个人的儿子
                    patch(n1, n2, container);
                }
                else {
                    break;
                }
                i++;
            }
            // sync from end
            while (i <= e1 && i <= e2) {
                var n1 = c1[e1];
                var n2 = c2[e2];
                if (isSameVnode(n1, n2)) { // 是同一个元素 要比较属性，和这两个人的儿子
                    patch(n1, n2, container);
                }
                else {
                    break;
                }
                e1--;
                e2--;
            }
            // 若果老的少新的多 我需要将新的直接插入即可
            if (i > e1) { // 无论是头部增加 还是尾部增加 都是这个逻辑
                if (i <= e2) {
                    // 添加进去， 添加到签名 还是后面呢？
                    var nextPos = e2 + 1; // 如果是向后追加 e2 + 1 肯定大于c2的总长度
                    // 如果是向前追加 e2+1 肯定小于 c2的长度
                    var anchor = nextPos < c2.length ? c2[nextPos].el : null;
                    while (i <= e2) {
                        patch(null, c2[i++], container, anchor);
                    }
                }
            }
            else if (i > e2) { // 老的多 新的少
                while (i <= e1) {
                    unmount(c1[i++]);
                }
            }
            else ;
        };
        var patchElement = function (n1, n2, container) {
            var el = n2.el = n1.el;
            var oldProps = n1.props || {};
            var newProps = n2.props || {};
            patchProps(el, oldProps, newProps);
            patchChildren(n1, n2, el);
        };
        var processElement = function (n1, n2, container, anchor) {
            if (n1 == null) {
                mountElement(n2, container, anchor);
            }
            else {
                // diff算法 核心
                patchElement(n1, n2);
            }
        };
        var isSameVnode = function (n1, n2) {
            return n1.type == n2.type && n1.key == n2.key; // 是同一个元素
        };
        var unmount = function (vnode) {
            hostRemove(vnode.el);
        };
        var patch = function (n1, n2, container, anchor) {
            if (anchor === void 0) { anchor = null; }
            // 判断n1 和 n2 是同一个元素吗？ type 和 key
            if (n1 && !isSameVnode(n1, n2)) { // 不是初始化才比较两个节点是不是同一个节点 
                unmount(n1);
                n1 = null; // 如果n1 为空则直接重新渲染
            }
            // n2 可能是元素 可能是组件， 我需要判断他的具体类型
            var shapeFlag = n2.shapeFlag;
            if (shapeFlag & 1 /* ELEMENT */) { // 元素的虚拟节点
                processElement(n1, n2, container, anchor);
            }
            else if (shapeFlag & 4 /* STATEFUL_COMPONENT */) { // 组件的虚拟节点
                processComponent(n1, n2, container);
            }
        };
        var render = function (vnode, container) {
            // 后续更新还有更新逻辑 
            patch(null, vnode, container);
        };
        return {
            createApp: createAppAPI(render),
            render: render
        };
    }

    function isVnode(vnode) {
        return vnode.__v_isVNode == true;
    }
    function h(type, propsOrChildren, children) {
        // 第一个一定是类型，第二个参数可能是属性可能是儿子，后面的一定都是儿子, 没有属性的情况只能放数组
        // 一个的情况可以写文本， 一个type + 一个文本
        var l = arguments.length;
        if (l == 2) { // h((div',h('p'))
            if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
                if (isVnode(propsOrChildren)) {
                    return createVnode(type, null, [propsOrChildren]);
                }
                else {
                    return createVnode(type, propsOrChildren);
                }
            }
            else {
                // 是数组
                return createVnode(type, null, propsOrChildren);
            }
        }
        else {
            if (l > 3) {
                children = Array.from(arguments).slice(2);
            }
            else if (l === 3 && isVnode(children)) {
                // 可能是children 是个文本 或者children是个数组
                children = [children]; // h('div',{},h('p'))  文本在源码里不用变成数组 ，因为文本可以直接innerHTML，如果是元素 ，递归创建
            }
            return createVnode(type, propsOrChildren, children);
        }
    }

    var nodeOps = {
        // 增 删  改 查询 元素中插入文本  文本的创建  文本元素的内容设置  获取父亲  获取下一个元素
        createElement: function (tagName) { return document.createElement(tagName); },
        remove: function (child) { return child.parentNode && child.parentNode.removeChild(child); },
        insert: function (child, parent, anchor) {
            if (anchor === void 0) { anchor = null; }
            return parent.insertBefore(child, anchor);
        },
        querySelector: function (selector) { return document.querySelector(selector); },
        setElementText: function (el, text) { return el.textContent = text; },
        createText: function (text) { return document.createTextNode(text); },
        setText: function (node, text) { return node.nodeValue = text; },
        parentNode: function (node) { return node.parentNode; },
        nextSibling: function (node) { return node.nextElementSibling; }
    };

    var patchClass = function (el, next) {
        if (next == null) {
            next = '';
        }
        el.className = next;
    };
    var patchStyle = function (el, prev, next) {
        if (next == null) {
            el.removeAttribute('style'); // 如果最新的没有样式 直接移除样式就可以了
        }
        else {
            if (prev) {
                for (var key in prev) {
                    if (next[key] == null) {
                        el.style[key] = '';
                    }
                }
            }
            // 新的一定要生效
            for (var key in next) {
                el.style[key] = next[key];
            }
        }
    };
    var createInvoker = function (fn) {
        var invoker = function (e) { invoker.value(e); };
        invoker.value = fn;
        return invoker;
    };
    var patchEvents = function (el, key, next) {
        // 之前绑定的事件 和之后绑定的不一样如何处理？
        var invokers = el._vei || (el._vei = {});
        var exists = invokers[key];
        if (exists && next) {
            exists.value = next; // 替换事件 但是不用解绑
        }
        else {
            var eventName = key.toLowerCase().slice(2); // click
            if (next) {
                // 绑定事件
                var invoker = invokers[key] = createInvoker(next);
                el.addEventListener(eventName, invoker);
            }
            else {
                el.removeEventListener(eventName, exists);
                invokers[key] = null;
            }
        }
    };
    var patchAttrs = function (el, key, next) {
        if (next == null) {
            el.removeAttribute(key);
        }
        else {
            el.setAttribute(key, next);
        }
    };
    var patchProp = function (el, key, prev, next) {
        switch (key) {
            case 'class': // .className   patchProp(el,'class','xxx',null)
                patchClass(el, next);
                break;
            case 'style': // .style.xxx   patchProp('div','style',{color:'red'},{background:'blue'});
                patchStyle(el, prev, next);
                break;
            default:
                if (/^on[A-Z]/.test(key)) {
                    // 事件 addEventListener
                    patchEvents(el, key, next);
                }
                else {
                    // 其他属性 直接使用setAttribute
                    patchAttrs(el, key, next);
                }
        }
    };
    // patchProp('div','style',{color:'red'});
    // patchProp('div','style',{color:'red'},{background:'blue',color:red});

    // 需要支持dom创建的api 及属性处理的api
    // 如果元素一致只是属性发生变化  要做属性的diff算法 
    // runtime-dom 主要的作用就是为了抹平平台的差异，不同平台对dom操作方式是不同的， 将api传入到core，core中可以调用这些方法
    var rendererOptions = extend(nodeOps, { patchProp: patchProp });
    // 1) 用户传入组件和属性 2） 需要创建组件的虚拟节点（diff算法） 3） 将虚拟节点变成真实节点
    function createApp(rootComponent, rootProps) {
        if (rootProps === void 0) { rootProps = null; }
        var app = createRenderer(rendererOptions).createApp(rootComponent, rootProps);
        var mount = app.mount;
        app.mount = function (container) {
            container = rendererOptions.querySelector(container);
            container.innerHTML = ''; // 我们在runtime-dom 重写的mount方法，会对容器进行清空
            mount(container); // 函数劫持， AOP 切片
        };
        return app;
    }

    exports.computed = computed;
    exports.createApp = createApp;
    exports.createRenderer = createRenderer;
    exports.effect = effect;
    exports.h = h;
    exports.reactive = reactive;
    exports.readonly = readonly;
    exports.ref = ref;
    exports.shallowReactive = shallowReactive;
    exports.shallowReadonly = shallowReadonly;
    exports.toRef = toRef;
    exports.toRefs = toRefs;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
//# sourceMappingURL=runtime-dom.global.js.map

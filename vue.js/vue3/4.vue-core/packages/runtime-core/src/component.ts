import { hasOwn, isFunction, isObject } from "@vue/shared";
import { componentPublicInstance } from "./componentPublicInstance";

let uid = 0;
export function createComponentInstance(vnode) {
    const instance = {
        uid: uid++,
        vnode: vnode, // 实例上的vnode就是我们处理过的vnode
        type: vnode.type, // 用户写的组件的内容
        props: {}, // props就是组件里用户声明过的 
        attrs: {}, // 用户没用到的props 就会放到attrs中
        slots: {}, // 组件的是插槽
        setupState: {}, // setup的返回值
        proxy: null,
        emit: null, // 组件通信
        ctx: {}, // 上下文
        isMounted: false, // 组件是否挂载
        subTree: null, // 组件u敌营的渲染内容
        render: null
    }
    instance.ctx = { _: instance }; // 将自己放到了上下文中, 并且在生成环境下+_ 标识不希望用户通过_放到里边的变量
    return instance;
}
export function setupComponent(instance) {
    let { props, children } = instance.vnode;
    // 初始化属性  initProps  ? 
    // 初始化插槽  initSlots  ?
    instance.props = props;
    instance.slots = children;
    instance.proxy = new Proxy(instance.ctx,componentPublicInstance)
    setupStatefulComponent(instance);
}
function createSetupContext(instance) { // 根据当前实例获取一个上下文对象
    return {
        attrs: instance.attrs,
        slots: instance.slots,
        emit: instance.emit,
        expose: () => { } // 是为了表示组件暴露了哪些方法 ，用户可以通过ref 调用哪些方法
    }
}
function setupStatefulComponent(instance) {
    let Component = instance.type;
    let { setup } = Component;
    if (setup) { // 说明用户提供了setup方法
        let setupContext = createSetupContext(instance);
        let setupResult = setup(instance.props, setupContext);
        handleSetupResult(instance, setupResult);
    } else {
        finishComponentSetup(instance); // 如果用户没写setup 那么直接用外面的render
    }
}
function handleSetupResult(instance, setupResult) {
    if (isObject(setupResult)) {
        instance.setupState = setupResult
    } else if (isFunction(setupResult)) {
        instance.render = setupResult
    }
    //  处理 后可能依旧没有render 1） 用户没写setup  2) 用户写了setup但是什么都没返回
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    let Component = instance.type;
    if (!instance.render) {
        if (!Component.render && Component.template) {
            // 需要将template 变成render函数  compileToFunctions()
        }
        instance.render = Component.render
    }
    console.log(instance)
}
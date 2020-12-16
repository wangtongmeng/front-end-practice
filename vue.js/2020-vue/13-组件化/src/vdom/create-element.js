import { isObject } from "../util"

export function createElement(vm, tag, data = {}, ...children) {

    // ast -> render -> 调用
    let key = data.key
    if (key) {
        delete data.key
    }
    // 以前表示的是标签 现在是组件

    if (isReservedTag(tag)) {
        // 如果是原始标签
        return vnode(tag, data, key, children, undefined)
    } else {
        // 组件 找到组件的定义
        let Ctor = this.$options.components[tag]
        return createComponent(vm, tag, data, key, children, Ctor)
    }

}
function createComponent(vm, tag, data, key, children, Ctor) {
    if (isObject(Ctor)) {
        Ctor = vm.$options._base.extend(Ctor)
    }
}
export function createTextNode(vm, text) {
    return vnode(undefined, undefined, undefined, undefined, text)
}

function vnode(tag, data, key, children, text) {
    return {
        tag,
        data,
        key,
        children,
        text
    }
}

// 虚拟节点 就是通过 _c _v 实现用对象来描述dom的操作（对象）

// 将tempalte转换成asts语法树 -> 生成render方法 -> 生成虚拟dom -> 真实dom
// 重新生成虚拟dom -> 更新dom

// {
//     tag: 'div',
//     key: undefined,
//     data: {},
//     children: [],
//     text: undefined
// }
import { isArray, isObject } from "@vue/shared";
import { createVnode } from "./vnode";

function isVnode(vnode) {
    return vnode.__v_isVNode == true
}

export function h(type, propsOrChildren, children) {
    // 第一个一定是类型，第二个参数可能是属性可能是儿子，后面的一定都是儿子, 没有属性的情况只能放数组
    // 一个的情况可以写文本， 一个type + 一个文本
    const l = arguments.length;
    if (l == 2) { // h((div',h('p'))
        if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
            if (isVnode(propsOrChildren)) {
                return createVnode(type, null, [propsOrChildren])
            } else {
                return createVnode(type, propsOrChildren)
            }
        } else {
            // 是数组
            return createVnode(type, null, propsOrChildren)
        }
    } else {
        if (l > 3) {
            children = Array.from(arguments).slice(2)
        } else if (l === 3 && isVnode(children)) {
            // 可能是children 是个文本 或者children是个数组
            children = [children]; // h('div',{},h('p'))  文本在源码里不用变成数组 ，因为文本可以直接innerHTML，如果是元素 ，递归创建
        }
        return createVnode(type, propsOrChildren, children)
    }
}
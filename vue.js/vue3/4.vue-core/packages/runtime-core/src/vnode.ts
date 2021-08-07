import { isArray, isObject, isString, ShapeFlags } from "@vue/shared";

// h('h1',{},'abc');
export function createVnode(type, props, children = null) {
    // 虚拟节点上属性有哪些？ 必须药有的 type , props, children ,key  __v_isVnode
    const shapeFlag = isString(type) ?
        ShapeFlags.ELEMENT : isObject(type) ?
            ShapeFlags.STATEFUL_COMPONENT : 0

    const vnode = {
        __v_isVnode: true,
        type, // 对于组件而言 组件的type就是一个对象
        props,
        children, // 组件的children是插槽
        key: props && props.key,
        el: null, // 对应一个真实的节点
        shapeFlag,
        component:null, // 组件的实例
    }
    // 等会做diff算法 肯定要有一个老的虚拟节点 （对应着真实的DOM）， 新的虚拟节点。 虚拟节点比对差异，将差异放到真实的节点上
    normalizeChildren(vnode, children);
    return vnode; // 返回最后的虚拟节点
}
function normalizeChildren(vnode, children) { // 将儿子的类型统一记录在 vnode中的shapeFlag
    let type = 0;
    if (children == null) { // 没有儿子 不用处理儿子的情况

    } else if (isArray(children)) { // 没有处理对象
        type = ShapeFlags.ARRAY_CHILDREN
    } else {
        type = ShapeFlags.TEXT_CHILDREN 
    }
    vnode.shapeFlag |= type
}
import { effect } from "@vue/reactivity";
import { ShapeFlags } from "@vue/shared";
import { createAppAPI } from "./apiCreateApp"
import { createComponentInstance, setupComponent } from "./component";


// 不在关心是什么平台了
export function createRenderer(rendererOptions) { // 稍后会将这个函数，放到runtime-core中
    const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        createText: hostCreateText,
        setText: hostSetText,
        setElementText: hostSetElementText,
        parentNode: hostParentNode,
        nextSibling: hostNextSibling,
    } = rendererOptions
    const setupRenderEffect = (instance, container) => {
        effect(function componentEffect() { // 每次状态变化后 都会重新执行effect？ 是第一次还是修改的？  
            if (!instance.isMounted) {
                // 组件渲染的内容就是subTree
                let subTree = instance.subTree = instance.render.call(instance.proxy, instance.proxy); // 调用render， render需要获取数据
                patch(null, subTree, container);
                instance.isMounted = true;
            } else {
                const prevTree = instance.subTree; // 数据没变的时候的subTree
                // 在次调用render此时用的是最新数据渲染出来了
                const nextTree = instance.render.call(instance.proxy, instance.proxy);
                instance.subTree = nextTree;

                // diff算法
                patch(prevTree, nextTree, container);
            }

        })
    }


    const mountComponent = (n2, container) => {
        // 1.组件的创建 需要产生一个组件的实例，调用组件实例上的setup方法拿到 render函数，在调用render函数，拿到组件对应（要渲染的内容）的虚拟DOM subTree
        let instance = n2.component = createComponentInstance(n2); // 根据虚拟节点创造一个实例

        // 2.给instance 增加属性， 调用setup ，拿到里面的信息
        setupComponent(instance);

        // 3.调用render。 每个组件都有一个 effect
        setupRenderEffect(instance, container);

    }
    const updateComponent = (n1, n2, container) => {

    }
    const processComponent = (n1, n2, container) => { // 处理组件
        if (n1 == null) {
            mountComponent(n2, container); // 创建组件
        } else {
            updateComponent(n1, n2, container); // 更新组件
        }
    }
    function mountChildren(children, container) {
        for (let i = 0; i < children.length; i++) {
            patch(null, children[i], container);
        }
    }
    function mountElement(vnode, container,anchor) { // 把虚拟节点变成真实的DOM元素
        const { type, props, children, shapeFlag } = vnode;
        let el = vnode.el = hostCreateElement(type); // 对应的是真实DOM元素
        if (props) {
            for (let key in props) {
                hostPatchProp(el, key, null, props[key])
            }
        }
        // 父创建完毕后 需要创建儿子
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(children, el);
        } else if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(el, children)
        }
        hostInsert(el, container,anchor);
    }

    const patchProps = (el, oldProps, newProps) => {
        if (oldProps !== newProps) {
            for (let key in newProps) {
                const prev = oldProps[key];
                const next = newProps[key];
                if (prev !== next) {
                    hostPatchProp(el, key, prev, next)
                }
            }
            for (let key in oldProps) {
                if (!(key in newProps)) {
                    hostPatchProp(el, key, oldProps[key], null)
                }
            }
        }
    }
    const patchChildren = (n1, n2, container) => { // 做两个虚拟的节点的儿子的比较了
        const c1 = n1.children;
        const c2 = n2.children; // 儿子之间的对比了

        // 儿子之间的比较 1.一方有儿子 一方没儿子  、 2.以前没儿子 现在有儿子 ， 3.两方都是文本，直接用新的换掉老的 ，4. 最后一个就是直接用方都有儿子 就比对两个儿子的差异
        const prevShapeFlag = n1.shapeFlag;
        const shapeFlag = n2.shapeFlag;

        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(container, c2); // 直接干掉以前的
        } else {
            // 现在是数组
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) { // 之前的是文本
                // 两个都是数组
                patchKeyedChildren(c1, c2,container)
            } else {
                // 之前的是文本，现在是数组
                hostSetElementText(container, '');
                mountChildren(c2, container)
            }
        }
    }
    const patchKeyedChildren = (c1, c2, container) => {
        let i = 0;
        let e1 = c1.length - 1;
        let e2 = c2.length - 1;

        // sync from start
        while (i <= e1 && i <= e2) { // 以短的为主,谁先遍历完毕就终止了
            const n1 = c1[i];
            const n2 = c2[i];
            if (isSameVnode(n1, n2)) { // 是同一个元素 要比较属性，和这两个人的儿子
                patch(n1, n2, container)
            }else{
                break;
            }
            i++;
        }
        // sync from end
        while (i <= e1 && i <= e2) {
            const n1 = c1[e1];
            const n2 = c2[e2];
            if (isSameVnode(n1, n2)) { // 是同一个元素 要比较属性，和这两个人的儿子
                patch(n1, n2, container)
            }else{
                break;
            }
            e1--;
            e2--;
        }
        // 若果老的少新的多 我需要将新的直接插入即可
        if(i > e1){ // 无论是头部增加 还是尾部增加 都是这个逻辑
            if(i<=e2){
                // 添加进去， 添加到签名 还是后面呢？
                const nextPos = e2+1; // 如果是向后追加 e2 + 1 肯定大于c2的总长度
                // 如果是向前追加 e2+1 肯定小于 c2的长度
                const anchor = nextPos < c2.length?  c2[nextPos].el : null;
                while (i<=e2) {
                    patch(null,c2[i++],container,anchor)
                }
            }
        }else if(i> e2){ // 老的多 新的少
            while(i<=e1){
                unmount(c1[i++])
            }
        }else{ // 乱序比对 （最长递增子序列）
            // 中间的内容 
        }

    }
    const patchElement = (n1, n2, container) => { // 走到这里说明前后两个元素能复用
        let el = n2.el = n1.el;

        const oldProps = n1.props || {};
        const newProps = n2.props || {};
        patchProps(el, oldProps, newProps);

        patchChildren(n1, n2, el)

    }
    const processElement = (n1, n2, container,anchor) => {
        if (n1 == null) {
            mountElement(n2, container,anchor);
        } else {

            // diff算法 核心
            patchElement(n1, n2, container);
        }
    }
    const isSameVnode = (n1, n2) => {
        return n1.type == n2.type && n1.key == n2.key; // 是同一个元素
    }
    const unmount = (vnode) => {
        hostRemove(vnode.el)
    }
    const patch = (n1, n2, container,anchor = null) => { // （1） 如果元素和key 不一样则直接删除重来

        // 判断n1 和 n2 是同一个元素吗？ type 和 key
        if (n1 && !isSameVnode(n1, n2)) { // 不是初始化才比较两个节点是不是同一个节点 
            unmount(n1);
            n1 = null; // 如果n1 为空则直接重新渲染
        }

        // n2 可能是元素 可能是组件， 我需要判断他的具体类型
        const { shapeFlag } = n2;

        if (shapeFlag & ShapeFlags.ELEMENT) { // 元素的虚拟节点
            processElement(n1, n2, container,anchor);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) { // 组件的虚拟节点
            processComponent(n1, n2, container);
        }
    }
    const render = (vnode, container) => {
        // 后续更新还有更新逻辑 
        patch(null, vnode, container);
    }
    return {
        createApp: createAppAPI(render), // 用户调用的createApp 就是通过createAppAPI 来生成的
        render
    }
}
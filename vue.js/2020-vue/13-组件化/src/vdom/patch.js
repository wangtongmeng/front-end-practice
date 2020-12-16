export function patch(oldVnode, vnode) {
    // 1.判断是更新还是渲染

    if (!oldVnode) {
        // 说明是组件的挂载 vm.$mount()
        return createElm(vnode) // 通过当前的虚拟节点 创建元素并返回
    } else {
        const isRealElement = oldVnode.nodeType
        if (isRealElement) {
            const oldElm = oldVnode // div id="app"
            const parentElm = oldElm.parentNode // body

            let el = createElm(vnode)
            parentElm.insertBefore(el, oldElm.nextSibling)

            parentElm.removeChild(oldElm)

            // 需要将渲染好的结果返回
            return el
        }
    }

    // 递归创建真实节点 替换掉老的节点
}

function createComponent(vnode) { // 初始化的作用
    // 需要创建组件的实例
    let i = vnode.data
    if ((i = i.hook) && (i = i.init)) {
        i(vnode)
    }
    // 执行完毕后
    if(vnode.componentInstance){
        return true
    }
}

function createElm(vnode) { // 根据虚拟节点创建真实的节点
    let {
        tag,
        children,
        key,
        data,
        text
    } = vnode
    // 是标签就创建标签
    if (typeof tag === 'string') {
        console.log('tag', tag)
        // 不是tag是字符串的 就是普通的html 还有可能是我们的组件

        // 实例化组件
        if (createComponent(vnode)) { // 表示是组件
            // 这里应该返回的是真实的dom元素
            console.log('vnode.componentInstance.$el', vnode.componentInstance.$el)
            return vnode.componentInstance.$el
        }
        vnode.el = document.createElement(tag)
        updateProperties(vnode)
        children.forEach(child => { // 递归创建儿子节点，将儿子节点扔到父节点中
            return vnode.el.appendChild(createElm(child))
        })
    } else {
        // 如果不是标签就是文本
        // 虚拟dom上映射着真实dom 方便后续更新操作
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}
// 更新属性
function updateProperties(vnode) {
    let newProps = vnode.data
    let el = vnode.el
    for (let key in newProps) {
        if (key === 'style') {
            for (let styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if (key === 'class') {
            el.className = newProps.class
        } else {
            el.setAttribute(key, newProps[key])
        }
    }
}
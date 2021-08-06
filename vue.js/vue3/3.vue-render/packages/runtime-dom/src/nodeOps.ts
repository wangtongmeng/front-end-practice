export const nodeOps = {
    // 增 删  改 查询 元素中插入文本  文本的创建  文本元素的内容设置  获取父亲  获取下一个元素
    createElement: tagName => document.createElement(tagName),
    remove: child => child.parentNode && child.parentNode.removeChild(child),
    insert: (child,parent,anchor = null) => parent.insertBefore(child,anchor), // anchor 不存在的时候就是appendChild
    querySelector:selector => document.querySelector(selector),
    setElementText:(el,text) => el.textContent = text,
    createText:text=> document.createTextNode(text),
    setText: (node,text)=>node.nodeValue = text,
    getParent:(node)=>node.parentNode,
    getNextSibling:(node)=>node.nextElementSibling
}


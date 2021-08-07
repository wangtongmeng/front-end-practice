

const patchClass = (el, next) => {
    if (next == null) {
        next = ''
    }
    el.className = next;
}
const patchStyle = (el, prev, next) => {
    if (next == null) {
        el.removeAttribute('style'); // 如果最新的没有样式 直接移除样式就可以了
    } else {
        if (prev) {
            for (let key in prev) {
                if (next[key] == null) {
                    el.style[key] = ''
                }
            }
        }
        // 新的一定要生效
        for (let key in next) {
            el.style[key] = next[key];
        }
    }
}
const createInvoker = (fn) => {
    const invoker = (e) => { invoker.value(e) };
    invoker.value = fn;
    return invoker
}
const patchEvents = (el, key, next) => { // react中采用的是事件代理，但是vue中直接绑定给元素的
    // 之前绑定的事件 和之后绑定的不一样如何处理？
    const invokers = el._vei || (el._vei = {});
    const exists = invokers[key];
    if (exists && next) {
        exists.value = next; // 替换事件 但是不用解绑
    } else {
        const eventName = key.toLowerCase().slice(2); // click
        if (next) {
            // 绑定事件
            let invoker = invokers[key] = createInvoker(next);
            el.addEventListener(eventName, invoker)
        } else {
            el.removeEventListener(eventName, exists);
            invokers[key] = null;
        }
    }
}
const patchAttrs = (el, key, next) => {
    if (next == null) {
        el.removeAttribute(key);
    } else {
        el.setAttribute(key, next);
    }
}

export const patchProp = (el, key, prev, next) => {
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
            } else {
                // 其他属性 直接使用setAttribute
                patchAttrs(el, key, next);
            }
    }
}
// patchProp('div','style',{color:'red'});

// patchProp('div','style',{color:'red'},{background:'blue',color:red});
/**
 * createElement: 创建jsx对象
 *    参数：至少两个 type/props，children这个部分可能有多个
 */
function createElement(type, props, ...childrens) {
  props = props || {}
  // 创建一个对象，设置一些默认属性值
  let obj = {
    type: null,
    props: {
      children: ''
    },
    ref: null,
    key: null
  }
  // 用传递的type和props覆盖原有的默认值
  // obj = {...obj, type, props}
  obj = {
    ...obj,
    type,
    props: {
      ...props,
      children: childrens.length <= 1 ? (childrens[0] || '') : childrens
    }
  }
  // 把ref和key提取出来(并且删除props中的属性)
  'key' in obj.props ? (obj.key = obj.props.key, obj.props.key = undefined) : null
  'ref' in obj.props ? (obj.ref = obj.props.ref, obj.props.ref = undefined) : null

  return obj
}

function render(obj, container, callBack) {
  let {type,props} = obj || {},
    newElement = document.createElement(type)
  for (const attr in props) {
    if (!props.hasOwnProperty(attr)) break // 不是私有的直接结束遍历
    let value = props[attr]
    if (!props[attr]) continue // null or undefined，如果当前属性没有值，直接不处理即可

    switch (attr.toUpperCase()) {
      case 'CLASSNAME':
        newElement.setAttribute('class', value)
        break;
      case 'STYLE':
        if (value === '') break;
        for (const styKey in value) {
          if (value.hasOwnProperty(styKey)) {
            newElement['style'][styKey] = value[styKey]
          }
        }
        break;
      case 'CHILDREN':
        /**
         * 可能是一个值：可能是字符串也可能是一个jsx对象
         * 可能是一个数组：数组中的每一项可能是字符串也可能是jsx对象
         */
        // 首页把一个值变为数组，这样后期统一操作数组即可
        !(value instanceof Array) ? (value = [value]) : null;
        value.forEach((item, index) => {
          // 验证item是什么类型的：如果是字符串就是创建文本节点，如果是对象，我们需要再次执行render方法，把创建的元素放到最开始创建的大盒子中
          if (typeof item === 'string') {
            let text = document.createTextNode(item)
            newElement.appendChild(text)
          } else {
            render(item, newElement)
          }
        })
        break;
      default:
        // 基于setAttribute 可以让设置的属性表现在html的结构上
        newElement.setAttribute(attr, value)
        break;
    }
  }
}

export {
  createElement,
  render
}
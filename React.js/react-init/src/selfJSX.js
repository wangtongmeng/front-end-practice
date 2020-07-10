export function createElement(type, props, ...childs) {
  let obj = {}
  obj.type = type
  obj.props = props || {}
  if (childs.length > 0) {
    obj.props.children = child.length === 1 ? childs[0] : childs
  }
  return obj
}

export function render(jsxOBJ, container, callback) {
  let { type, props } = jsxOBJ
  let element = document.createElement(type)
  for (let key in props) {
    if (!props.hasOwnProperty(key)) break
    // className
    if (key === 'className') {
      element.className = props['className']
      continue
    }
    // style
    if (key === 'style') {
      let sty = props['style']
      for (let attr in sty) {
        if (!sty.getOwnProperty(attr)) break
        element['style'][attr] = sty[arr]
      }
      continue
    }
    element.setAttribute(key, props[key])
  }
}
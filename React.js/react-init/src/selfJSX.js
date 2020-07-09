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
    
  }
}
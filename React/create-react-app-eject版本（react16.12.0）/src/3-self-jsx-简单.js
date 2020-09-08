let root = document.getElementById('root');
/**
 * 1.创建一个对象（默认有四个属性：type/props/ref/key），最后要把这个对象返回
 * 2.根据传递的值修改这个对象
 *    type => 传递的type
 *    props => 需要做一些处理：大部分传递props中的属性都赋值给对象的props，有一些比较特殊
 *      ->如果是ref或key，我们需要把传递的props中的这两个属性值，给创建对象的两个属性，而传递的props中把这两个值删除掉
 *      ->把传递的children作为新创建对象的props中的一个属性
 */
function createElement(type, props, children) {
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
  obj = {...obj, type, props: {...props, children}}
  // 把ref和key提取出来(并且删除props中的属性)
  'key' in obj.props ? (obj.key = obj.props.key, obj.props.key = undefined): null
  'ref' in obj.props ? (obj.ref = obj.props.ref, obj.props.ref = undefined): null

  return obj
}

let objJSX = createElement(
  "h1",
{ id: "titleBox", className: "title", style: {color: 'red'}, ref: 'AA', key: '12'},
"hello world"
)
// 测试 node 3-self-jsx.js console.log(objJSX)
/**
 * {
 *    type: 'h1',
 *    props: {
 *      id: "titleBox", 
 *      className: "title", 
 *      style: { color: 'red' },
 *      children: "hello world",
 *      ref: undefined,
 *      key: undefined
 *    },
 *    ref: 'AA',
 *    key: 12,
 *    __proto__: Object.prototype
 * }
 */

 /**
  * render: 把创建的对象生成对应的dom元素，最后插入到页面中
  */
 function render(obj, container, callBack) {
  let {type, props} = obj || {},
      newElement = document.createElement(type)
  for (const attr in props) {
    if (props.hasOwnProperty(attr)) {
      if (!props.hasOwnProperty(attr)) break // 不是私有的直接结束遍历
      if (!props[attr]) continue // 如果当前属性没有值，直接不处理即可
      
      let value = props[attr]
      // className
      if (attr === 'className') {
        newElement.setAttribute('class', value) 
        continue
      }

      // style
      if (attr === 'style') {
        if (value === '') continue
        for (const styKey in value) {
          if (value.hasOwnProperty(styKey)) {
            newElement['style'][styKey] = value[styKey]
          }
        }
        continue
      }

      // children
      if (attr === 'children') {
        if (typeof value === 'string') {
          let text = document.createTextNode(value)
          newElement.appendChild(text)
        }
        continue
      }

      // 基于setAttribute 可以让设置的属性表现在html的结构上
      newElement.setAttribute(attr, value) 

    }
  }
 }
 
 render(objJSX, root, () => {
   console.log('ok')
 })
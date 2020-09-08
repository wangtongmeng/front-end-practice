// babel会把jsx元素转换成React.createElement(...)，所以需要引入React
import React from 'react'
/**
 * 创建一个函数，只要函数中返回一个新的JSX元素，则为函数式组件。
 * =>传递进来的属性是只读的
 * =>调用组件可以是单闭合也可以是双闭合
 * =>项目中使用双闭合方式，可以把一些子节点当做属性(children)传递给组件，在组件中可以把传递的这些节点放到指定的位置 => vue 中的slot插槽机制
 */
function News(props) {
  console.log(props);
  return <div>
    <h3>新闻资讯</h3>
    <ul>
      <li>新闻1</li>
      <li>新闻2</li>
      <li>新闻3</li>
      <li>{props.index}</li>
    </ul>
    {/* {props.children} */}
    {React.Children.map(props.children, item => {
      return <div>
        @@ {item}
      </div>
    })}
  </div>
}

export default News
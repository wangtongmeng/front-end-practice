// babel会把jsx元素转换成React.createElement(...)，所以需要引入React
import React from 'react'
/**
 * 创建一个函数，只要函数中返回一个新的JSX元素，则为函数式组件。
 */
function News(props){
  console.log(props);
  return <div>
    <h3>新闻资讯</h3>
    <ul>
      <li>新闻1</li>
      <li>新闻2</li>
      <li>新闻3</li>
    </ul>
  </div>
}

export default News
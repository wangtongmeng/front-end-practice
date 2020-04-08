import React from 'react';
import ReactDOM, {render} from 'react-dom'; // 从react-dom中导入一个ReactDOM，逗号后面的内容时把ReactDOM这个对象进行解构 <=> import {render} from 'react-dom';

/**
 * jsx渲染机制
 *  1.基于babel中的语法解析模块（babel-preset-react）把jsx语法编译为 React.createElement(...) 结构
 * React.createElement(
 *    "h1",
 *    { id: "titleBox", className: "title", style: styleObj}, 
 *    "hello world"
 * );
 *  2.执行 React.createElement(type, props, children)，创建一个对象（虚拟DOM）
 *    type: 'h1',
 *    props: {
 *      id: 'titleBox',
 *      className: 'title',
 *      style: {color: "red"},
 *      children: "hello world" // 存放的是元素中的内容
 *    },
 *    ref: null,
 *    key:: null
 *    ...
 *    __proto__:Object.prototype
 *  3.ReactDOM.render(jsx语法最后生成的对象，容器)，基于render方法把生成的对象动态创建为domy元素，插入到制定的容器中
 */

// React.createElement(type, props, children)，

let root = document.getElementById('root');
let styleObj = {color: 'red'};
render(<h1 id='titleBox' className='title' style={styleObj}>
  hello world
  </h1>, root)
console.log(React.createElement(
  "h1",
{ id: "titleBox", className: "title", style: styleObj},
"hello world"
));

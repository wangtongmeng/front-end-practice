import React, { Component } from 'react'

import logo from '../logo.svg'
import '../index.css'
import style from '../index.module.css' // 用模块化的方式导入

export default class JsxTest extends Component {
	render() {
		// React 类负责逻辑控制，比如修改数据 -> vdom
		// ReactDom 类负责渲染，vdom -> dom
		// babel-loader 可以转换 jsx -> vdom
		//   <h1>react hello</h1> => React.createElement('h1', 'react hello')
		// 变量使用，只要是合法的 js 表达式
		const name = 'react hello'
		const user = { firstName: 'tom', lastName: 'jerry' }
		function formatName(user) {
			return user.firstName + ' ' + user.lastName
		}
		const greet = <p>hello,jerry</p>
		// 由于条件语句或者循环语句不是合法表达式
		// const title = name ? <h1>{name}</h1> : null

		// 数组会作为一组子元素对待
		const arr = [1, 2, 3]
		const arr1 = [1, 2, 3].map(num => <li key={num}>{num}</li>)

		return (
			<div>
				{/*条件语句*/}
				{name ? <h1>{name}</h1> : null}
				{/* 函数也是合法表达式 */}
				<p>{formatName(user)}</p>
				{/* jsx 本身也是合法表达式 */}
				{greet}
				{/* 数组处理 */}
				{arr}
				{/* 显示列表 */}
				<ul>{arr1}</ul>
				{/* 属性使用：静态值用双引号，动态值用花括号 */}
				{/* class、for关键字要特殊处理，因为jsx最终都会转换成js对象 */}
				<img src={logo} alt="logo" style={{ width: 100 }} className="img" /> {/* class="img" */}
				<img src={logo} alt="logo" style={{ width: 100 }} className={style.img} />{' '}
				{/* class="src_img__2a8ZU" 优先级 css>module css > sass */}
				{/* <label htmlFor=""></label> */}
			</div>
		)
	}
}

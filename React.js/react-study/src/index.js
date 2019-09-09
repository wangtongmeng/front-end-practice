import React from 'react'
import ReactDom from 'react-dom'

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
const jsx = (
	<div>
     {name ? <h1>{name}</h1> : null}
    {/* 函数也是合法表达式 */}
    <p>{formatName(user)}</p>
    {/* jsx 本身也是合法表达式 */}
    {greet}
	</div>
)
console.log(jsx)
ReactDom.render(jsx, document.getElementById('root'))

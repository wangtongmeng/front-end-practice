import React from 'react';

export default function Home(props) {
	// 受路由管控的组件都有3个属性
	// history 实现路由跳转
	// hash 接收传递的参数信息
	// match 存放路由地址匹配的信息
	console.log(props)
	return <>
		首页
		<button onClick={ev=>{
			// props.history.push('/personal/login')
			props.history.push({
				pathname: '/personal/login',
				// 1.问号传参
				search: '?from=home',
				// 2.隐形传参（在跳转目标页面中刷新，传递的信息就没有了）
				state: {
					from: 'home'
				}
			})
			// 3.路径参数(见App.jsx)
		}}>登录</button>
	</>;
}

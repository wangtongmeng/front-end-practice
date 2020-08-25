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
			props.history.push('/personal/login')
		}}>登录</button>
	</>;
}

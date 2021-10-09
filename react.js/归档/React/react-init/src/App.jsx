import React from 'react';
import { HashRouter, Route, Switch, Redirect, Link, NavLink, BrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Detail from './pages/home/Detail'
import Category from './pages/category/Category';
import Pinwei from './pages/pinwei/Pinwei';
import Cart from './pages/cart/Cart';
import Personal from './pages/personal/Personal';
import Header from './components/Header';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				{/*
				 * 一级路由，展示不同的组件
				 *   问题1：/category 也能匹配 / exact精准匹配
				 *   问题2: 某一个路由匹配了，下面还会继续匹配 Switch
				 */}
				<Switch>
					<Route path="/" exact component={Home} />
					{/* 动态路由=>传递路径参数 */}
					<Route path="/detail/:id" component={Detail} />
					<Route path="/category" component={Category} />
					<Route path="/pinwei" component={Pinwei} />
					{/* <Route path="/cart" component={Cart} /> */}
					<Route
						path="/cart"
						component={() => {
							// 可以是一个函数，在这里做一些判断（权限校验）
							return <Cart />;
						}}
					/>
					<Route path="/personal" component={Personal} />
					{/*
					 * <Route path="*" exact component={Error} />
					 *
					 * <Redirect from="" to="" />
					 * from指定从哪个路由进来的才进行跳转
					 * to跳转到哪（字符串、也可以是对象）
					 */}
					<Redirect to="/" />
				</Switch>
				<div>
					{/* NavLink具备一个特点：会拿to中的地址给浏览器路由地址进行匹配，如果可以匹配上，会给元素加上一个active的样式（可以让指定的a具备选中样式）=> 和路由表匹配类似，某些NavLink也要设置精准匹配的 */}
					<NavLink to="/" exact>
						首页
					</NavLink>
					<NavLink to="/category">分类</NavLink>
					<NavLink to="/pinwei">品类</NavLink>
					<NavLink to="/cart">购物车</NavLink>
					<NavLink to={{
            pathname: '/personal',
            search: '?lx=wx' // 问号传参
          }}>个人中心</NavLink>
				</div>
			</div>
		);
	}
}
export default App;

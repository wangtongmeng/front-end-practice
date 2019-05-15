import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import { setTitle, getToken } from '@/lib/util'

Vue.use(Router)

const router = new Router({
  routes
})

// to from 都是路由对象，to 跳转后页面的路由对象，from，跳转前的路由对象，next 函数是跳转时要用到。
const HAS_LOGINED = false

router.beforeEach((to, from, next) => {
	// to.meta && setTitle(to.meta.title)
	// if (to.name !== 'login') {
	// 	if (HAS_LOGINED) next()
	// 	else next({ name: 'login'})
	// } else {
	// 	if (HAS_LOGINED) next({ name: 'home'})
	// 	else next()
	// }
	const token = getToken()
	if (token) {
		//
	} else {
		if (to.name === 'login') 	next()
		else next({ name: 'login' })
	}
})

// 导航被确认之前(所有导航钩子都ok了)，所有组件内守卫和异步路由组件被解析之后被调用
// router.beforeResolve

router.afterEach((to, from) => {
	// logining = false
})

export default router

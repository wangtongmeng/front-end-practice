import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './views/List.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

const routes =  [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      { path: '/list', name: 'list', component: List },
      // { path: '/detail/:id', component: Detail },
      { path: '/detail/:id', component: Detail, props: true },
    ]
  },
  {
    path: '/about',
    name: 'about',
    meta: {auth: true},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/communicate',
    name: 'communicate',
    component: () => import(/* webpackChunkName: "communicate" */ './views/communicate/index.vue')
  },
]

// const router = new Router({
//   routes
// })

const router = new Router()
router.addRoutes(routes)

// 守卫
router.beforeEach((to, from, next) => {
  // 要访问/about且未登录需要去登录
  if (to.meta.auth && !window.isLogin) {
    if (window.confirm('请登录')) {
      window.isLogin = true
      next() // 登录成功，继续
    } else {
      next('/') // 放弃登录，回首页
    }
  } else {
    next() // 不需登录，继续
  }

})

export default router

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [ // 代码分割 jsonp js文件的名字
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mime',
    name: 'Mime',
    component: () => import(/* webpackChunkName: "mime" */ '../views/mime/index.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/profile/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

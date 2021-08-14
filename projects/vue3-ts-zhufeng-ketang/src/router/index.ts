import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'
const routes: Array<RouteRecordRaw> = [ // jsonp  js文件的名字 叫什么
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/mine/index.vue')
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

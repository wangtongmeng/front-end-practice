import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import Demo from '@/pages/Demo'
import Form from '@/pages/Form'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo
  },
  {
    path: '/form',
    name: 'form',
    component: Form
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router

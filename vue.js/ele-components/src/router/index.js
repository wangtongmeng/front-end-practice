import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import FormGenerator from '@/pages/form-generator'
import FormCreate from '@/pages/FormCreate'
import optimize from '@/pages/optimize'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/FormGenerator',
    name: 'FormGenerator',
    component: FormGenerator
  },
  {
    path: '/optimize',
    name: 'optimize',
    component: optimize
  },
  {
    path: '/FormCreate',
    name: 'FormCreate',
    component: FormCreate
  }
  
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

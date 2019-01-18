import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: () => import('./views/Demo1.vue')
    },
    {
        path: '/demo2',
        name: 'demo2',
        component: () => import('./views/Demo2.vue')
      }
  ]
})

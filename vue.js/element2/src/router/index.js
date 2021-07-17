import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tTable',
    name: 'tTable',
    component: () => import(/* webpackChunkName: "tTable" */ '../views/t-table-example.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

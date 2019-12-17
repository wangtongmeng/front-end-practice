import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/v-chart',
    name: 'v-chart',
    component: () => import('@views/v-chart/VChart.vue')
  },
  {
    path: '/element-ui',
    name: 'element-ui',
    component: () => import('@views/element-ui/ElementUi.vue')
  },
  {
    path: '/directive',
    name: 'directive',
    component: () => import('@views/vue-basic/directive/directive.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

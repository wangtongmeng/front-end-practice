import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '@/vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'


Vue.use(VueRouter); // Vue的路由也是一个插件
// Vue.use = function(plugin){
//   plugin.install(this)
// }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    
  },
  {
    path: '/about',
    name: 'About',
    component: About,  // /about/a
    children:[  // h('div')
      {path:'a',component:{render:(h)=><div>about a</div>}},
      {path:'b',component:{render:(h)=><div>about b</div>}}
    ]
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: () => import('./views/bar/Bar.vue')
        },
        {
            path: '/bar',
            name: 'bar',
            component: () => import('./views/bar/Bar.vue')
        },
        {
            path: '/pie',
            name: 'pie',
            component: () => import('./views/pie/Pie.vue')
        },
        {
            path: '/map',
            name: 'map',
            component: () => import('./views/map/Map.vue')
        }
    ]
})
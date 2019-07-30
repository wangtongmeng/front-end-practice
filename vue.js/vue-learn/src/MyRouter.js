import Vue from 'vue'
import Home from './views/Home.vue'
import About from './views/About.vue'

class VueRouter {

    constructor(options) {
        this.$options = options
        this.routeMap = {}

        // 路由响应式，利用了Vue的机制    vue-router的特点，它和react-router的区别：vue-router和vue强绑定关系，只能用在vue中
        this.app = new Vue({
            data: {
                current: '/'
            }   
        })
    }

    init() {
        this.bindEvents() // 监听url变化
        this.createRouteMap(this.$options) // 解析路由配置
        this.initComponent() // 实现两个组件
    }

    bindEvents() {
        window.addEventListener('load', this.onHashChange.bind(this))
        window.addEventListener('hashchange', this.onHashChange.bind(this))
    }
    onHashChange() {
        this.app.current = window.location.hash.slice(1) || '/'
    }
    createRouteMap(options) {
        options.routes.forEach(item => {
            this.routeMap[item.path] = item.component
        })
    }
    initComponent() {
        // router-link, router-view
        // <router-link to="">xxx</router-link>
        Vue.component('router-link', {
            props: { to: String },
            render(h) {
                // h(tag, data, children)
                return h('a', {
                    attrs: { href: '#' + this.to }
                }, [
                    this.$slots.default
                ])
            }
        })

        // <router-view></router-view>
        Vue.component('router-view', {
            render(h) {
                // h(tag, data, children)
                console.log(this.app)
                console.log(this.routeMap[this.app.current])
                const comp = this.routeMap[this.app.current]
                return h(comp)
            }
        })
    }

}

VueRouter.install = function(Vue) {
    // 混入，常用于组件的扩展
    Vue.mixin({
        beforeCreate() {
            // this是vue实例
            if (this.$options.router) {
                // 仅在根组件执行一次
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        }
    })
}

Vue.use(VueRouter)
 
export default new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: About }
    ]
})
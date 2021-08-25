import RouterLink from "./components/RouterLink";
import RouterView from "./components/RouterView";
import { createMatcher } from "./create-matcher";
import HashHistroy from "./history/hash";
import BrowserHistory from "./history/history";

export let Vue;

class VueRouter { // 稍后new的时候会产生一个路由实例
    constructor(options = {}) {
        // matcher中有动态添加路由和 路由的匹配方法
        this.matcher = createMatcher(options.routes || []);

        // 默认有2中 我们先来实现hash / historyApi

        if (options.mode === 'hash') {
            this.history = new HashHistroy(this);
        } else {
            this.history = new BrowserHistory(this);
        }

        //  this.matcher.match  匹配规则   this.history 路由系统， 
    }
    match(location) {
        return this.matcher.match(location);
    }
    push(location) {
        // 跳转到这个路径
        this.history.transitionTo(location, () => {
            this.history.updateLocation(location)
        });
    }
    init(app) { // 进行路由的初始化
        const history = this.history;
        // 这个init方法主要的作用就是监听路径的变化 渲染对应的组件

        // 老版本中 hash的监控靠的是hashchange 新版本可以使用popstate


        // 根据路径进行跳转 ，并且跳转完毕后 监听hash值的变化
        history.listen((route) => { // _route就是我们定义的响应式数据
            app._route = route; // 安插的回调每次都重新 渲染一下
        })
        const setupListenerHandler = () => {
            history.setupListener(); // 监听hash值的变化 
        }

        history.transitionTo(history.getCurrentLocation(), setupListenerHandler)
    }
}
VueRouter.install = (_Vue) => {
    Vue = _Vue;
    Vue.component('router-link', RouterLink);
    Vue.component('router-view', RouterView);
    // 后面在使用router这个实例的时候每个组件用的都是同一个

    // 在根组件中注入的router需要共享给每个组件
    Vue.mixin({
        beforeCreate() {
            // 需要将根的router对象共享给每一个
            if (this.$options.router) {
                // 根组件
                this._routerRoot = this; // 将自己暴露出来
                this._router = this.$options.router; // 在自己的身上添加一个_router属性

                this._router.init(this);

                // this._route

                Vue.util.defineReactive(this, '_route', this._router.history.current);

            } else {
                // 子组件 
                this._routerRoot = this.$parent && this.$parent._routerRoot;
                //以后子组件可以通过 this._routerRoot._router
            }
        }
    });
    // 属性
    Object.defineProperty(Vue.prototype, '$route', { // 用于方便组件的取值 {path:'/',matched:[],params,query}
        get() {
            return this._routerRoot._route;
        }
    })
    // router的实例
    Object.defineProperty(Vue.prototype, '$router', { // 代理就是取值的时候才调用get方法  vm._data.xxx => vm.xxx
        get() {
            return this._routerRoot._router; // match  push replace
        }
    })
}
// 父 store  -》 子 store  -》 孙子store
// 父    this._routerRoot = this  / this._router => router 
// 儿子  this.$parent._routerRoot
// 孙子  this.$parent._routerRoot
export default VueRouter
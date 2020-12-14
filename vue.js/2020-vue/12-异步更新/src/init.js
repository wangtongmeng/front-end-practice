import {initState} from './state'

import {mountComponent, callHook} from './lifecycle'

import {compileToFunction} from './compiler/index.js'

import {mergeOptions} from './util/index'
import {nextTick} from './util/next-tick'
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // 数据劫持
        const vm = this // vue中使用 this.$options 指代的就是用户传递的属性

        // 将用户传递的 和全局的options合并
        vm.$options =  mergeOptions(vm.constructor.options, options)
        console.log(vm.$options)

        callHook(vm, 'beforeCreate')

        // 初始化状态
        initState(vm) // 分割代码

        callHook(vm, 'created')

        // 如果用户传入了el属性 需要将页面渲染出来
        // 如果用户传入了el 就要实现挂载流程
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        const vm = this
        const options = vm.$options
        el = document.querySelector(el)

        // 默认会先查找有没有render方法，没有render会采用tempalte，template也没有就用el中的内容

        if (!options.render) {
            // 对模板进行编译
            let template = options.template // 取出模板
            if (!template && el) {
                template = el.outerHTML // 兼容性问题，可以创建一个div，取innerHTML
            }
            const render = compileToFunction(template)
            options.render = render
            // 我们需要将template 转化成 render方法
        }
        // options.render
        // 渲染当前组件 挂载这个组件
        mountComponent(vm, el)
    }
    // 用户调用的nextTick
    Vue.prototype.$nextTick = nextTick // 注册nextTick
}
import {initState} from './state'
export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // 数据劫持
        const vm = this // vue中使用 this.$options 指代的就是用户传递的属性
        vm.$options = options

        // 初始化状态
        initState(vm) // 分割代码
    }
}
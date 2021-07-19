import { initState } from "./state";
export function initMixin(Vue) { // 表示在vue的基础上做一次混合操作
    Vue.prototype._init = function(options) {
        // el,data
        const vm = this; // var that = this;
       
        vm.$options = options; // 后面会对options进行扩展操作

        // 对数据进行初始化 watch computed props data ...
        initState(vm); // vm.$options.data  数据劫持

    }
}


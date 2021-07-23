    import { mergeOptions } from "../utils";

    export function initGlobalApi(Vue) {
        Vue.options = {}; // 用来存放全局的配置 , 每个组件初始化的时候都会和options选项进行合并
        // Vue.component
        // Vue.filter
        // Vue.directive
        
        Vue.mixin = function(options) {
            this.options = mergeOptions(this.options, options); 
            return this;
        }
    }
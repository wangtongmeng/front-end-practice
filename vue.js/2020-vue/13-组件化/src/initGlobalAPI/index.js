import {mergeOptions} from '../util/index'
import initMixin from './mixin'
import initAssetRegisters from './assets'
import initExtend from './extend'

import {ASSETS_TYPE} from './const'



export function initGlobalAPI(Vue) {
    // 整合了所有的全局相关的内容
    Vue.options = {}
    initMixin(Vue)

    // 初始化的全局过滤器 指令 组件
    ASSETS_TYPE.forEach(type => {
        Vue.options[type + 's'] = {}
    })

    Vue.options._base = Vue // _base 是Vue的构造函数

    // 注册extend方法
    initExtend(Vue)
    initAssetRegisters(Vue)
}

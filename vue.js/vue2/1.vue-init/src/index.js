import { initMixin } from "./init";

function Vue(options){
    // options 为用户传入的选项
    this._init(options); // 初始化操作， 组件
}
export default Vue;

// 扩展原型的
initMixin(Vue);
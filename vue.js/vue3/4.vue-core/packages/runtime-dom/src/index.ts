


// 需要支持dom创建的api 及属性处理的api

import { createRenderer } from "@vue/runtime-core";
import { extend } from "@vue/shared";
import { nodeOps } from "./nodeOps";
import {patchProp} from './patchProp'


// 如果元素一致只是属性发生变化  要做属性的diff算法 

// runtime-dom 主要的作用就是为了抹平平台的差异，不同平台对dom操作方式是不同的， 将api传入到core，core中可以调用这些方法
const rendererOptions = extend(nodeOps,{patchProp});

// 1) 用户传入组件和属性 2） 需要创建组件的虚拟节点（diff算法） 3） 将虚拟节点变成真实节点
export function createApp(rootComponent,rootProps = null){
    let app = createRenderer(rendererOptions).createApp(rootComponent,rootProps)
    let {mount} = app;
    app.mount = function(container){
        container = rendererOptions.querySelector(container)
        container.innerHTML = ''; // 我们在runtime-dom 重写的mount方法，会对容器进行清空
        mount(container); // 函数劫持， AOP 切片
    }
    return app
}

export * from '@vue/runtime-core'
import { createVnode } from "./vnode";

// 虚拟节点？ 1. 虚拟节点的好处就是可以支持跨平台  2. 如果后续操作可以都在虚拟dom上进行操作，最后一起更新页面，在真实dom之前的一个缓存
export function createAppAPI(render) {
    return (rootComponent, rootProps) => { // createApp  
        const app = {
            // 全局的方法例如 app.component  app.directives app.mixin
            _component: rootComponent, // 为了稍后组件挂载之前可以先校验组件是否有render函数或者模板
            _props: rootProps,
            _container: null,
            mount(container) {
                // 1. 根据用户传入的组件生成一个虚拟节点
                const vnode = createVnode(rootComponent, rootProps);
                app._container = container;
                // 2. 将虚拟节点变成真实节点，插入到对应的容器中
                render(vnode, container)
                // console.log(rootComponent, rootProps, container, rendererOptions)
            }
        };
        return app
    }
}
## Vue2与Vue3对比
- Vue2采用flow进行编写，而3源码全部采用ts进行开发，对ts支持友好
- 源码体积优化：移除部分api，使用tree-shaking
- 数据劫持优化：Vue3采用Proxy，性能大大提升
- 编译优化：Vue3实现了静态模板分析、重写diff算法
- CompositionAPI：整合业务代码的逻辑，提取公共逻辑(Vue2采用mixin - 命名冲突数据来源不清晰)
- 自定义渲染器：可以用来创建自定义的渲染器。改写Vue底层渲染逻辑
- 新增Fragment、Teleport、Suspense组件


## 更新vue-cli
- npm uninstall vue-cli -g ->npm install vue-cli -g 固定版本npm install @vue/cli@4.5.9 -g
- yarn global remove vue-cli -> yarn add vue-cli -g
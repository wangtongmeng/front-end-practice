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


 8-1 工程初始化 (04:09)
 8-2 工程目录代码简介及整理 (10:50)
 - 安装插件 eslint vetur
 8-3 基础样式集成及开发模拟器的使用 (06:33)
 8-4 flex + iconfont 完成首页 docker 样式编写 (22:21)
 8-5 使用Scss 组织地址区域布局 (21:18)
 8-6 利用CSS技巧实现搜索及 banner 区域布局 (15:54)
 8-7 使用 flex布局实现图标列表布局 (11:48)
 8-8 首页布局收尾 (18:50)
 8-9 首页组件的合理拆分 (16:28)
 8-10 使用v-for, v-html 指令精简页面代码 (17:52)
 8-11 CSS 作用域约束以及 Vue 开发者工具的安装使用 (08:39)
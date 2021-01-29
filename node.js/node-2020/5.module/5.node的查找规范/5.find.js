/**
 * node 中的查找规范
 */

// require('./a')
// require('./b')
require('b')


// 默认会先查找当前文件夹下的js文件 -> 找不到找json ->再找不到 找package.json中main字段 找到对应结果 -> 如果没有 找文件夹中的index.js文件
// 如果文件不是绝对路径或相对路径（不是核心模块）会去当前文件夹下的node_modules下查找，如果当前node_modules找不到会继续向上层查找 直到根目录位置，找不到报错。
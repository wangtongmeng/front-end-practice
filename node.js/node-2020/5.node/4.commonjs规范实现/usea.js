// 1.Module.prototype.require require方法是定义在模块原型上的
// 2.Module._load 加载模块
// 3.Module._resolveFilename 解析出绝对路径 并且添加后缀
// 4.new Module 创建一个模块 (id文件名，exports 是一个对象，存放的是模块的的导出结果)
// 5.module.load 加载模块
// 6.Module._extensions 存放着不同后缀文件的处理
// 7.读取文件 包裹函数 runInThisContext执行 传入模块属性
// 最终返回的是module.exports


// 如果同时存在a.js和a.json 优先级
const path = require('path')
const fs = require('fs')
const vm = require('vm')

function Module(filename) {
    this.id = filename // 文件名
    this.exports = {} // 代表导出的结果
    this.path = path.dirname(filename) // 文件所在目录
}
Module._extensions = {}
Module._extensions['.js'] = function () {}
Module._extensions['.json'] = function () {}
Module._resolveFilename = function (filename) {
    let filePath = path.resolve(__dirname, filename)    
    let isExits = fs.existsSync(filePath)
    if (isExits) return filePath

    // 尝试添加 .js 和 .json后缀
    let keys = Reflect.ownKeys(Module._extensions)
    for (let i = 0; i < keys.length; i++) {
        let newFile = filePath + keys[i]; // 尝试添加后缀
        if (fs.existsSync(newFile)) return newFile
    }
    throw new Error('module not found')
}
Module.prototype.load = function () {
    // 加载时 需要获取当前文件的后缀名，根据后缀名采用不同的策略进行加载
}
function myRequire(filename) {
    // 1.解析当前的文件名
    filename = Module._resolveFilename(filename)
    // 2.创建模块
    let module = new Module(filename)

    // 3.加载模块
    Module._load() // 模块加载

    return module.exports
}




let r = myRequire('./a')
console.log(r)
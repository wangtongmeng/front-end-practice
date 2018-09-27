const testVar = 1000

global.testVar2 = 200 // 全局暴露变量

module.exports.testVar = testVar

// 在模块中声明变量，局域变量
// 通过 global 声明变量，全局变量
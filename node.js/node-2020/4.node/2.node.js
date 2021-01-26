/**
 * 全局变量
 * process的基本应用
 */
// node 中的全局对象 浏览器中的this指代的是window 服务端中的this指代的都是global
// 默认当我们访问文件中的this时 内部的this被更改了 所以不是global而是module.exports

// console.log(this)

// function a() {
//     console.log(this) // 这里是global
// }
// a()

// 全局属性 在文件里能直接访问到的 => 全局属性 = global + require module exports __dirname __filename
// 1.clearInterval clearTimeout setInterval setTimeout queueMicrotask clearImmediate setImmediate console.log(global)

// 2.process buffer...  console.dir(global, {showHidden:true})

// 3.require module exports __dirname __filename 不属于global但能直接访问  看似是全局的，但实际上不是

// 全局变量是可以直接在文件中不声明直接访问的变量，global上的属性叫全局变量


// process
// console.log(Object.keys(process))
// 常用的 platform chdir cwd env argv nextTick

// process.platform
// platform 平台 可以区分操作系统
// 用途：根据不同平台 操作系统文件的
// console.log(process.platform) // win32 windows / drawin linux /etc/usr/

// process.cwd
// 用途：获取当前执行node命令的目录，可以找到当前目录下的某个文件
// console.log(process.cwd()) // current working directory 可以改变的

// process.chdir
// 更改当前工作目录
// console.log(process.chdir('a')) // 一般用不到
// console.log(process.cwd())

// process.env
// 用途：根据不同的环境变量做配置 如何设置环境变量
// 如果是windows可以通过 set xxx=xxx / mac export xxx=xxx
// cross-env 这是一个第三方模块用于设置环境变量
// console.log(process.env) // 当前系统环境变量


// set NODE_ENV=production node 2.node.js 使用cmd管理员身份运行
// console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'production') {
//     console.log('生产')
// } else {
//     console.log('开发')
// }

// process.argv
// 用途：运行代码时传入的参数 --port --config
// console.log(process.argv) // node执行文件 node 2.node.js a b c d
// [
//     'C:\\Program Files\\nodejs\\node.exe', // node的执行文件
//     'C:\\Users\\admin\\Desktop\\front-end-practice\\node.js\\node-2020\\4.node\\2.node.js', // 执行的js文件 前两项是固定的
//     'a',
//     'b',
//     'c',
//     'd'
// ]

// 可以获取当前用户的所有传入参数
// console.log(process.argv.slice(2)) // [ 'a', 'b', 'c', 'd' ]
// 一般会这样传参 --port 3000，最终希望获取 {port:3000}
// let config = process.argv.slice(2).reduce((memo,current,index,arr) => { // [--port,3000,--config,xx.js]
//     if (current.startsWith('--')) {
//         memo[current.slice(2)] = arr[index+1]
//     }
//     return memo
// }, {})
// // node 2.node.js --port 3000 --config xxx.js
// console.log(config) // { port: '3000', config: 'xxx.js' }

// commander
// 用来解析用户的参数
const program = require('commander') // 解析用户传递的参数
program.name('tm')
program.usage('[options]')
program.command('rm').action(() => { // node 2.node.js rm
    console.log('删除')
})
program.option('-p, --port <v>', 'set server port')
program.parse(process.argv)

console.log(program.port)

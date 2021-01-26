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

// platform 平台 可以区分操作系统
// 用途：根据不同平台 操作系统文件的
// console.log(process.platform) // win32 windows / drawin linux /etc/usr/

// 用途：获取当前执行node命令的目录，可以找到当前目录下的某个文件
// console.log(process.cwd()) // current working directory 可以改变的

// 更改当前工作目录
// console.log(process.chdir('a')) // 一般用不到
// console.log(process.cwd())

// 用途：根据不同的环境变量做配置 如何设置环境变量
// 如果是windows可以通过 set xxx=xxx / mac export xxx=xxx
// cross-env 这是一个第三方模块用于设置环境变量
// console.log(process.env) // 当前系统环境变量


// set NODE_ENV=production node 2.node.js 使用cmd管理员身份运行
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    console.log('生产')
} else {
    console.log('开发')
}


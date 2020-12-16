import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input: './src/index.js', // 打包入口
    output: {
        file: 'dist/umd/vue.js', // 出口路径
        name: 'Vue', // 指定打包后全局变量的名字
        format: 'umd', // 统一模块化规范 模块化的类型 esModule commonjs模块
        sourcemap: true // es6 -> es5 开启源码调试 可以找到源代码的报错位置
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        process.env.ENV === 'development' ? serve({
            port: 3000, // 打开的浏览器，端口是3000端口
            contentBase: '', // ''表示当前目录
            openPage: '/index.html' // 默认打开html的路径
        }) : null
    ]
}
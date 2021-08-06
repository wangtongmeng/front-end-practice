import ts from 'rollup-plugin-typescript2'; // 解析ts插件
import resolvePlugin from '@rollup/plugin-node-resolve'; // 解析第三方模块
import path from 'path'; // 可以处理路径

// 获取packages目录
let packagesDir = path.resolve(__dirname, 'packages'); // 获取packages 的绝对路径
let packageDir = path.resolve(packagesDir, process.env.TARGET); // 获取对应要打包的路径  node提供的

// 获取这个路径下的package.json
const resolve = p => path.resolve(packageDir, p); // 根据当前需要打包的路径来解析

const pkg = require(resolve('package.json')); // 表示我要引用这个json文件

const packageOptions = pkg.buildOptions;
const name = path.basename(packageDir); // 获取这个目录的最后一个名字
// import/require/window.xxx
const outputConfig = {
    'esm-bundler': {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: 'es'
    },
    'cjs': {
        file: resolve(`dist/${name}.cjs.js`),
        format: 'cjs'
    },
    'global': {
        file:resolve(`dist/${name}.global.js`),
        format: 'iife'
    }
}
function createConfig(format, output) {
    output.name = packageOptions.name; // 用于iife 在window上挂载的属性
    output.sourcemap = true; // 稍后生成sorcemap
    return {
        input:resolve(`src/index.ts`), // 打包的入口 
        output,
        plugins:[
            ts({ // ts 编译的时候用的文件是哪一个
                tsconfig:path.resolve(__dirname,'tsconfig.json')
            }),
            resolvePlugin()
        ]
    }
}
// 根据用户提供的formats选项 去我们自己的配置里取值进行生产配置文件
export default packageOptions.formats.map(format => createConfig(format, outputConfig[format]))

// 一个包要打包多个格式 esModule  commonjs  iife 
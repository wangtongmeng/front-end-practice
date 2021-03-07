import {nodeResolve} from '@rollup/plugin-node-resolve'

import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import path from 'path'

export default {
    input:'src/index.ts',
    output:{
        // global 弄个全局变量来接收
        // cjs module.exports
        // esm export default
        // iife ()()
        // umd 兼容 amd+commonjs 不支持es6导入
        format:'iife',
        file:path.resolve('dist/bundle.js'), 
        sourcemap:true // ts中也需要打开
    },
    plugins:[ // 顺序执行
        nodeResolve({
            extensions:['.js','.ts']
        }),
        ts({
            tsconfig:path.resolve(__dirname,'tsconfig.json')
        }),
        serve({
            open:true,
            openPage:'/public/index.html',
            port:3000,
            contentBase:''
        })
    ]
}
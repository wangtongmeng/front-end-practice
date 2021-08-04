const execa = require('execa') // 执行进程用的
const { fuzzyMatchTarget } = require('./utils')
const args = require('minimist')(process.argv.slice(2)) // 获取参数列表
// 这里根据参数打包对应的模块, 没有传递参数 我们将打包格式改为响应式模块
const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'reactivity'
const formats = args.formats || args.f
const sourceMap = args.sourcemap || args.s
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

execa(
  'rollup', // rollup执行打包
  [
    '-wc', // 监控使用配置文件
    '--environment', // 使用的环境
    [
      `COMMIT:${commit}`, 
      `TARGET:${target}`, // 打包目标
      `FORMATS:${formats || 'global'}`, // 默认打包格式global
      sourceMap ? `SOURCE_MAP:true` : `` // 添加sourcemap
    ]
      .filter(Boolean) // 过滤空
      .join(',')
  ],
  {
    stdio: 'inherit'
  }
)

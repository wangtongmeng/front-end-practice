const Compiler = require('./Compiler')

function webpack(options) {
    //1. 初始化参数：从配置文件和Shell语句中读取并合并参数,得出最终的配置对象
    let shellConfig = process.argv.slice(2).reduce((shellConfig, item) => {
        let [key, value] = item.split('=')
        shellConfig[key.slice(2)]=value
        return shellConfig
    },{})
    let finalConfig = {...options, ...shellConfig}
    //2. 用上一步得到的参数初始化Compiler对象
    let compiler = new Compiler(finalConfig)
    //3. 加载所有配置的插件
    let {plugins} = finalConfig
    for (const plugin of plugins) {
        plugin.apply(compiler)
    }
    return compiler
}
module.exports = webpack
class RunPlugin {
    apply(compiler) {
        //对于代码执行来说没有用,但是对于阅读代码的人来说可以起到提示的作用
        compiler.hooks.run.tap('RunPlugin', ()=>{
            console.log('开始编译了');
        })
    }
}
module.exports = RunPlugin
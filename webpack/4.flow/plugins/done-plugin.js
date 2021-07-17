
class DonePlugin{
    apply(compiler){
        //对于代码执行来说没有用,但是对于阅读代码的人来说可以起到提示的作用
        compiler.hooks.done.tap('DonePlugin',()=>{
            console.log('编译结束了');
        });
    }
}
module.exports = DonePlugin;
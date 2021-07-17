
class AssetPlugin{
    apply(compiler){
        //对于代码执行来说没有用,但是对于阅读代码的人来说可以起到提示的作用
        compiler.hooks.emit.tap('AssetPlugin',(assets)=>{
            debugger
            assets['assets.md']= Object.keys(assets).join('\n');
        });
    }
}
module.exports = AssetPlugin;
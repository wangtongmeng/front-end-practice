let {SyncHook} = require('tapable');
let Complication = require('./Complication');
let path = require('path');
let fs = require('fs');
class Compiler{
  constructor(options){
    this.options = options;
    this.hooks = {
        run:new SyncHook(),//开始启动编译 刚刚开始
        emit:new SyncHook(['assets']),//会在将要写入文件的时候触发
        done:new SyncHook()//将会在完成编译的时候触发 全部完成
    }
  }
  //4. 执行Compiler对象的run方法开始执行编译
  run(callback){
    this.hooks.run.call();//触发run钩子
    //5. 根据配置中的entry找出入口文件
    this.compile((err,stats)=>{
      this.hooks.emit.call(stats.assets);
      //10. 在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
      for(let filename in stats.assets){
          let filePath = path.join(this.options.output.path,filename);
          fs.writeFileSync(filePath,stats.assets[filename],'utf8');
      }
      callback(null,{
        toJson:()=>stats
      });
    });
    //监听入口的文件变化,如果文件变化了,重新再开始编译
   /*  Object.values(this.options.entry).forEach(entry=>{
      fs.watchFile(entry,()=>this.compile(callback));
    }); */
    //中间是我们编译流程
    this.hooks.done.call();//编译之后触发done钩子
  }
  compile(callback){
    let complication = new Complication(this.options);
    complication.build(callback);
  }
}
module.exports = Compiler;
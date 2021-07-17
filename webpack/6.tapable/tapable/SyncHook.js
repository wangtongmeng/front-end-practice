let Hook = require('./Hook');
const HookCodeFactory = require('./HookCodeFactory');
class SyncHookCodeFactory extends HookCodeFactory{
    //内容不一样
    content(){
        //串行调用taps函数  fn0() fn1() fn2()
        return this.callTapsSeries();
    }
}
let factory = new SyncHookCodeFactory();
class SyncHook extends Hook{
    compile(options){
        //把钩子的实例和选项的值用来初始化代码工厂
        factory.setup(this,options);//options={type:'sync',taps,args}
        //根据选项创建call方法 new Function(args,函数体taps);
        return factory.create(options);
    }
}

module.exports = SyncHook;

let Hook = require('./Hook');
const HookCodeFactory = require('./HookCodeFactory');
class AsyncParallelHookCodeFactory extends HookCodeFactory{
    content({onDone}){
        return this.callTapsParallel({onDone});
    }
}
let factory = new AsyncParallelHookCodeFactory();
class AsyncParallelHook extends Hook{
    compile(options){
        //把钩子的实例和选项的值用来初始化代码工厂
        factory.setup(this,options);//options={type:'async',taps,args}
        //根据选项创建call方法 new Function(args,函数体taps);
        return factory.create(options);
    }
}
module.exports = AsyncParallelHook;
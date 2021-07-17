const { SyncWaterfallHook } = require('tapable');
//参数是一个数组,参数长度有用,代表取真实的call的参数的个数,数组里字符串的名字没用
const syncWaterfallHook = new SyncWaterfallHook(['name','age']);
//注册事件函数
syncWaterfallHook.tap('1', (name, age) => { //  events on
    console.log(1, name, age);
    return '结果1'
});
syncWaterfallHook.tap('2', (name, age) => {
    console.log(2, name, age);
    //return '结果2'
});
syncWaterfallHook.tap('3', (name, age) => {
    console.log(3, name, age);
});
//触发事件函数
syncWaterfallHook.call('zhangsan', 12); // emit


// 1 zhangsan 12
// 2 结果1 12
// 3 结果1 12

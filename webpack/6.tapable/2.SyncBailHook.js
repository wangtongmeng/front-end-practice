const { SyncBailHook } = require('tapable');
//参数是一个数组,参数长度有用,代表取真实的call的参数的个数,数组里字符串的名字没用
const syncHook = new SyncBailHook(['name','age']);
//注册事件函数
syncHook.tap('1', (name, age) => { //  events on
    console.log(1, name, age);
});
syncHook.tap('2', (name, age) => {
    console.log(2, name, age);
    return '2';
});
syncHook.tap('3', (name, age) => {
    console.log(3, name, age);
});
//触发事件函数
syncHook.call('zhangsan', 12); // emit


// 1 zhangsan 12
// 2 zhangsan 12
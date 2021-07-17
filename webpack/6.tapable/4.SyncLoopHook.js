const { SyncLoopHook } = require("tapable");
//当回调函数返回非undefined值的时候会停止调用后续的回调

let hook = new SyncLoopHook(["name", "age"]);
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;

let count = 0
hook.tap("1", (name, age) => {
  console.log(1, "counter1", counter1);
  count++
  if (++counter1 == 1) {
    counter1 = 0;
    return;
  }
  return true;
});
hook.tap("2", (name, age) => {
  console.log(2, "counter2", counter2);
  count++
  if (++counter2 == 2) {
    counter2 = 0;
    return;
  }
  return true;
});
hook.tap("3", (name, age) => {
  console.log(3, "counter3", counter3);
  count++
  if (++counter3 == 3) {
    counter3 = 0;
    return;
  }
  return true;
});
hook.call("zhangsan", 10);

console.log('总共执行了', count);

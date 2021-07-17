let { AsyncSeriesWaterfallHook } = require("tapable");
let queue = new AsyncSeriesWaterfallHook(["name"]);
console.time("cost");
queue.tapPromise("1", function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(name, '结果1');
      resolve(1);
    }, 1000);
  });
});
queue.tapPromise("2", function (data) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(data, '结果2');
      resolve(2);
    }, 2000);
  });
});
queue.tapPromise("3", function (data) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(data, '结果3');
      resolve(3);
    }, 3000);
  });
});
queue.promise("zhangsan").then((err) => {
  console.timeEnd("cost");
});
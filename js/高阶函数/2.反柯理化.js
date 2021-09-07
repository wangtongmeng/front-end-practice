Function.prototype.uncurring = function () {
    var self = this;//this代表当前函数
    return function () {// [arguments, 4, 5]
        //把函数的第一个参数从arguments里删除，并且返回obj
        let obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
        //push.call({0:1,1:2,2:3},[4,5]);
        //{0:1,1:2,2:3}.push(4,5);
        //{0:1,1:2,2:3,3:4,4:5}
    }
}
let push = Array.prototype.push.uncurring();
(function () {//arguments = {0:1,1:2,2:3};
    push(arguments, 4, 5);
    //Array.prototype.push.call(arguments,4,5);
    console.log(arguments);
})(1, 2, 3);


/* let arr = [1, 2, 3, 4, 5];
console.log(arr.shift());
console.log(arr); */

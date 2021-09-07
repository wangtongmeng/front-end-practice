
/* 简版 不支持new fn.bind() */
// ~(function (prototype) {
//     function bind(context, ...outerArgs) {
//         return (...innerArgs) => {
//             return this.call(context, ...outerArgs, ...innerArgs);
//         }
//     }
//     prototype.bind = bind;
// })(Function.prototype);


/* 完整版 支持new fn.bind(xx) */
~(function (prototype) {
    Object.create = function (prototype) {
        function F() { }
        F.prototype = prototype;
        return new F();
    }
    prototype.bind = function (OThis, ...outerArgs) {
        let thatFunc = this;//缓存当前的函数 Point
        let fBound = function (...innerArgs) {
            //如果在这里判断我这个函数是new来调用的还是直接调用？
            return thatFunc.apply(
                //如果你是在new这个绑定的后的函数的话，则bind绑定的时候传的oThis没有用了
                this instanceof thatFunc ? this : OThis, [...outerArgs, ...innerArgs]
            );
        };
        fBound.prototype = Object.create(thatFunc.prototype);
        // fBound.prototype = thatFunc.prototype;
        //new fBound() this fBound
        return fBound;
    };
})(Function.prototype);




function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return this.x + ',' + this.y;
}
let emptyObj = {};
let YPoint = Point.bind(null, 1);
// YPoint.prototype.getName = () => { console.log(x); }
let axiosPoint = new YPoint(2);
console.log(axiosPoint.toString());
console.log(axiosPoint instanceof Point);
console.log(axiosPoint instanceof YPoint);





// 数字求和，并添加前缀
function sum(...args) {
    return this.prefix + (
        args.reduce((previousValue, currentValue) => previousValue + currentValue, 0));
}
let obj = { prefix: '$' };
//context  函数中的this
let bindSUM = sum.bind(obj, 1, 2, 3);
console.log(bindSUM(4, 5)); // $15
/**内容摘要
 *  es5 写法
 *  es6 写法
 */

// es5 写法
function Demo(x, y) {
    this.x = x
    this.y = y
}
Demo.prototype.sum = function () {
    return this.x + this.y
}
var demo1 = new Demo(1, 2)
console.log(demo1);
var total = demo1.sum()
console.log(total);

// es6 写法

class Demo2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    sum() {
        return this.x + this.y
    }
}
var demo2 = new Demo2(1, 2)
console.log(demo2);
var total2 = demo2.sum()
console.log(total2);
// 存取器

/* 
在 TypeScript 中，我们可以通过存取器来改变一个类中属性的读取和赋值行为
构造函数
    主要用于初始化类的成员变量属性
    类的对象创建时自动调用执行
    没有返回值
*/

class User {
    myname: string;
    constructor(myname: string) {
        this.myname = myname;
    }
    get name() {
        console.log('get');

        return this.myname;
    }
    set name(value) {
        console.log('set', value);
        this.myname = value;
    }
}

let user = new User('zhangsan');
user.name = 'lisi';
console.log(user.name);  // lisi

namespace a {
    "use strict";
    var User = /** @class */ (function () {
        function User(myname) {
            this.myname = myname;
        }
        Object.defineProperty(User.prototype, "name", {
            get: function () {
                return this.myname;
            },
            set: function (value) {
                this.myname = value;
            },
            enumerable: true,
            configurable: true
        });
        return User;
    }());
    var user = new User('zhangsan');
    user.name = 'lisi';
    console.log(user.name);
}

export { }
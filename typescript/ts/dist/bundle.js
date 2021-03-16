(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    // interface 描述对象的形状和结构，可以给数据增添类型， 而且方便复用
    var fn = (function () {
        // 函数返回函数 一般要标识函数的返回类型
        return fn.count++;
    });
    fn.count = 0;
    console.log(fn());
    console.log(fn());
    // 8.抽象类 不能被new, 可以被继承
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.eat = function () {
            console.log('eat');
        };
        return Animal;
    }());
    /** @class */ ((function (_super) {
        __extends(Cat, _super);
        function Cat() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = 'a';
            return _this;
        }
        Cat.prototype.drink = function () {
            console.log('Method not implemented');
        };
        return Cat;
    })(Animal));
    function createInstance(clazz, name) {
        // if (instance) return instance;
        return new clazz(name);
    }
    var Person = /** @class */ (function () {
        function Person(name) {
            this.name = name;
        }
        Person.prototype.eat = function () { };
        return Person;
    }());
    // 泛型就是只有当使用的时候 才能确定类型， 通过参数传入类型
    var r = createInstance(Person, '张三'); // 类可以充当类型，可以描述实例
    r.eat();

}());
//# sourceMappingURL=bundle.js.map

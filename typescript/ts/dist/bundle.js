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

    // 在js中，类 最早是用构造函数来代替的 -> es6 类的概念 (编译完还是function)
    // class Pointer {
    //   // x:number // 必须在constructor中有初始化操作  this.x = x;
    //   // x!:number
    //   // x: number = 1; // 也可以设默认值，声明的变量会被增加到实例上，这是constructor中可以不写this.x = x
    //   x: number;
    //   y: number;
    //   // constructor还是函数 依然可以使用 剩余运算符 可选参数 默认参数
    //   constructor(x: number, y: number) {
    //     // 在constructor中的操作都是初始化操作
    //     this.x = x;
    //     this.y = y;
    //   }
    // }
    // 属性修饰符
    // public 声明的变量会被增加到实例上，自己和子类和子类之外都可以访问到
    // protected 只有自己和自己的子孙能访问
    // private // 只有自己能访问
    // readonly 进度(类似const) 如果在初始化完毕后不能再修改了 如果是对象可以更改对象的属性
    // 也可以给构造函数添加修饰符 默认是public，如果标识成protected不能被new，如果标识成private不能被继承和new
    var Pointer = /** @class */ (function () {
        // y: number;
        function Pointer(x, y) {
            this.y = y;
            // 2.加了public 属性会增加到实例上，所以constructor内可以不写this.x = x;
            this.x = x;
            // this.y = y;
        }
        return Pointer;
    }());
    var Animal = /** @class */ (function () {
        function Animal(name, age) {
            this.name = name;
            this.age = age;
            this.n = 1;
            console.log("Animal name", this.name);
            this.n = 2;
        }
        // static get type(){ // es6写法 属性访问器
        //   return '不如动物'
        // }
        // 静态方法
        Animal.getName = function () {
            return "动物";
        };
        Animal.getXXX = function () {
            return 'xxx';
        };
        Animal.prototype.say = function () {
            console.log('Animal say');
        };
        // 静态属性
        Animal.type = "哺乳动物"; // 静态属性 es7语法  ts支持es7语法
        return Animal;
    }());
    console.log('Animal', Animal.type, Animal.getName(), Animal.getXXX());
    var Cat = /** @class */ (function (_super) {
        __extends(Cat, _super);
        function Cat(name, age, address) {
            var _this = _super.call(this, name, age) || this;
            _this.address = address;
            // 原型属性
            _this.str = '';
            console.log("Cat name", _this.name);
            return _this;
        }
        Cat.getName = function () {
            console.log(_super.getName.call(this)); // 如果子类里有相同的静态方法，可以通过super方法父类的同步静态方法
            return '猫';
        };
        // 原型方法
        Cat.prototype.say = function () {
            _super.prototype.say.call(this);
        };
        Object.defineProperty(Cat.prototype, "content", {
            get: function () {
                return this.str;
            },
            set: function (newVal) {
                this.str = newVal;
            },
            enumerable: false,
            configurable: true
        });
        // 静态方法和属性可以被继承 super默认在构造函数中和静态方法中都指向自己的父类，在原型方法中 super指向父类的原型
        Cat.type = '猫科灯舞';
        return Cat;
    }(Animal));
    console.log('Cat', Cat.type, Cat.getName(), Cat.getXXX());
    // 原型方法直接写就是原型方法，可以通过属性访问器定义原型属性
    var cat = new Cat("Tom", 9, "美国");
    cat.say();
    console.log(cat);
    var p = new Pointer(100, 100);
    console.log(p);

}());
//# sourceMappingURL=bundle.js.map

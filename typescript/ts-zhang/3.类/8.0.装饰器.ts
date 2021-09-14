// 装饰器
/* 
装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、属性或参数上，可以修改类的行为
常见的装饰器有类装饰器、属性装饰器、方法装饰器和参数装饰器
装饰器的写法分为普通装饰器和装饰器工厂
*/

class Person{
    say() {
        console.log('hello')
    }
}

// function Person() {}
Object.defineProperty(Person.prototype, 'say', {
    value: function() { console.log('hello'); },
    enumerable: false,
    configurable: true,
    writable: true
});

export {}
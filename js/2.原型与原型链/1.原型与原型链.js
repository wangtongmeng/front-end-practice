/* 
函数
对象是通过函数创建的
批量生产对象的函数Object
实现私有和公有属性的封装

*/
let obj = new Object();
obj.name = 'lisi';
obj.age = 10;



/* 
每个对象都有一个proto属性，指向创建该对象的函数的prototype
Object.prototype.__proto__指向的是null
自定义函数的prototype的proto指向的就是Object.prototype
*/
{
    let obj = new Object();
    console.log(obj.__proto__ === Object.prototype); // true
    console.log(Object.prototype.__proto__ === null); // true
    function Foo() { }
    console.log(Foo.prototype.__proto__ === Object.prototype); // true
}


/* 
自定义函数Foo.proto(函数也是对象)指向Function.prototype
Function的prototype和proto都指向Function.prototype
*/

{
    function Foo() { }
    console.log(Foo.__proto__ === Function.prototype); // true
    console.log(Function.prototype === Function.prototype); // true
    console.log(Function.__proto__ === Function.prototype); // true
}


/* 
原型链面试题
*/

function Foo() {
    getName = function () {
        console.log(1);
    }
    return this;
}
Foo.getName = function () {
    console.log(2);
}
Foo.prototype.getName = function () {
    console.log(3);
}
var getName = function () {
    console.log(4);
}
function getName() {
    console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();//1
new Foo.getName();
new Foo().getName();
new new Foo().getName();


/* 
fn function Foo() {
    getName = function () {
        console.log(1);
    }
    return this;
}
fn getName =  function () {
    console.log(1);
}
Foo.getName = function () {
    console.log(2);
}
Foo.prototype.getName = function () {
    console.log(3);
}

Foo.getName(); 2
getName(); 4
Foo().getName(); 1
getName() 1
new Foo.getName(); 2  成员访问. 优先级高于 无参数new 
new Foo().getName(); 3  有参数new 和 . 优先级相同，从左到右
new new Foo().getName(); 3 先执行new Foo() 再 . 再 无参数new 
*/

// 2 4 1 1 2 3 3


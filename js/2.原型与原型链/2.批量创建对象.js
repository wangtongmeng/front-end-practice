/* 
批量创建对象

通过new来调用一个函数，这个函数就成为了构造函数,构造函数里可以对例对象的私有属性赋值
每个函数会有一个prototype属性，此原型对象上存放所有实例的公有方法
若new的构造函数自己返回引用值，则以自己返回的为主，否则 返回创建的实例

*/

function Person(name) {
    this.name = name;
}
Person.prototype.getName = function () {
    console.log(this.name);
}
let person = new Person('lisi');
person.getName(); // lisi


/* Object.create */
Object.create = function (proto) {
    function F () {}
    F.prototype = proto
    return new F()
}

/* new */
function _new (clazz, ...args) {
    let _this = Object.create(clazz.prototype)
    let result = clazz.call(_this, ... args)
    if ((result !== null && typeof result === 'object') || typeof result === 'function') {
        return result
    }
    return _this
}
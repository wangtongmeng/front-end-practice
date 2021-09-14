/* 

接口一方面可以在面向对象编程中表示为行为的抽象，另外可以用来描述对象的形状
接口就是把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类
一个类可以继承另一个类并实现多个接口
接口像插件一样是用来增强类的，而抽象类是具体类的抽象概念
一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类的可以有多个子类，但只能有一个父类
*/



// interface中可以用分号或者逗号分割每一项，也可以什么都不加

/* 对象的形状 */
//接口可以用来描述`对象的形状`,少属性或者多属性都会报错
interface Speakable {
    speak(): void;
    name?: string;//？表示可选属性
}

let speakman: Speakable = {
    speak() { },//少属性会报错
    // name,
    // age//多属性也会报错
}


/* 行为的抽象 */
//接口可以在面向对象编程中表示为行为的抽象
interface Speakable {
    speak(): void;
}
interface Eatable {
    eat(): void
}
//一个类可以实现多个接口
class Person implements Speakable, Eatable {
    speak() {
        console.log('Person说话');
    }
    eat() { }
}
class TangDuck implements Speakable {
    speak() {
        console.log('TangDuck说话');
    }
    eat() { }
}



/* 任意属性 */
//无法预先知道有哪些新的属性的时候,可以使用 `[propName:string]:any`,propName名字是任意的
interface Person {
    readonly id: number;
    name: string;
    [propName: string]: any;
}

let p1 = {
    id: 1,
    name: 'zhangsan',
    age: 10
}
export { }
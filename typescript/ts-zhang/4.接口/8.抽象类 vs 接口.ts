// 抽象类 vs 接口
/* 
不同类之间公有的属性或方法，可以抽象成一个接口（Interfaces）
而抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
抽象类本质是一个无法被实例化的类，其中能够实现方法和初始化属性，而接口仅能够用于描述,既不提供方法的实现，也不为属性进行初始化
一个类可以继承一个类或抽象类，但可以实现（implements）多个接口
抽象类也可以实现接口
*/

abstract class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    abstract speak(): void;
}
interface Flying {
    fly(): void
}
class Duck extends Animal implements Flying {
    speak() {
        console.log('汪汪汪');
    }
    fly() {
        console.log('我会飞');
    }
}
let duck = new Duck('zhufeng');
duck.speak(); // 汪汪汪
duck.fly(); // 我会飞
export { }
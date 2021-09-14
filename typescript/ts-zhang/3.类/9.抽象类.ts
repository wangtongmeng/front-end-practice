// 抽象类

/* 
抽象描述一种抽象的概念，无法被实例化，只能被继承
无法创建抽象类的实例
抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现


访问控制修饰符	private protected public
只读属性	readonly
静态属性	static
抽象类、抽象方法	abstract
*/

abstract class Animal {
    name!:string;
    abstract speak():void;
}
class Cat extends Animal{
    speak(){
        console.log('喵喵喵');
    }
}
// let animal = new Animal();//Cannot create an instance of an abstract class
// animal.speak();
let cat = new Cat();
cat.speak();

export {}
// 抽象方法
/*
抽象类和方法不包含具体实现，必须在子类中实现
抽象方法只能出现在抽象类中
子类可以对抽象类进行不同的实现
 */
abstract class Animal{
    abstract speak():void;
}
class Dog extends  Animal{
    speak(){
        console.log('小狗汪汪汪');
    }
}
class Cat extends  Animal{
    speak(){
        console.log('小猫喵喵喵');
    }
}
let dog=new Dog();
let cat=new Cat();
dog.speak(); // 小狗汪汪汪
cat.speak(); // 小猫喵喵喵

export {}
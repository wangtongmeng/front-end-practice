// 继承 vs 多态
/* 
继承(Inheritance)子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
多态(Polymorphism)由继承而产生了相关的不同的类，对同一个方法可以有不同的行为
*/

class Animal{
    speak(word:string):string{
        return 'Animal: '+word;
    }
}
class Cat extends Animal{
    speak(word:string):string{
        return 'Cat:'+word;
    }
}
class Dog extends Animal{
    speak(word:string):string{
        return 'Dog:'+word;
    }
}
let cat = new Cat();
console.log(cat.speak('hello')); // Cat:hello
let dog = new Dog();
console.log(dog.speak('hello')); // Dog:hello
export {}
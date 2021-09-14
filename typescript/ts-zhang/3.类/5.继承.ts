// 继承
/* 
子类继承父类后子类的实例就拥有了父类中的属性和方法，可以增强代码的可复用性
将子类公用的方法抽象出来放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑
super可以调用父类上的方法和属性
*/


class Person {
    name: string;//定义实例的属性，默认省略public修饰符
    age: number;
    constructor(name:string,age:number) {//构造函数
        this.name=name;
        this.age=age;
    }
    getName():string {
        return this.name;
    }
    setName(name:string): void{
        this.name=name;
    }
}
class Student extends Person{
    no: number;
    constructor(name:string,age:number,no:number) {
        super(name,age);
        this.no=no;
    }
    getNo():number {
        return this.no;
    }
}
let s1=new Student('zhangsan',18,1);
console.log(s1);


export {}
// 如何定义类


// "strictPropertyInitialization": true / 启用类属性初始化的严格检查/
// name!:string
class Person{
    name:string;
    getName():void{
        console.log(this.name);
    }
}
let p1 = new Person();
p1.name = 'zhangsan';
p1.getName();

/**
 * 当我们写一个类的时候,会得到2个类型
 * 1. 构造函数类型的函数类型
 * 2. 类的实例类型
 */
 class Component {
    static myName: string = '静态名称属性';
    myName: string = '实例名称属性';
}
let com = Component;
//Component类名本身表示的是实例的类型
//ts 一个类型 一个叫值 
//冒号后面的是类型
//放在=后面的是值
let c: Component = new Component();
let f: typeof Component = com;

export {}
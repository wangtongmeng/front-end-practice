// 基础使用

// class Point {
//     public x: number
//     public y: number
//     constructor (x: number, y: number) {
//         this.x = x
//         this.y = y
//     }
//     public getPostion() {
//         return `(${this.x}, ${this.y})`
//     }
// }
// const point = new Point(1,2)
// console.log(point) // Point {x: 1, y: 2}
// // eslint报错 A maximum of 1 class per file is allowed. (max-classes-per-file)tslint(1)
// // 在tslint.json中关掉 "max-classes-per-file": [false]
// class Parent {
//     public name: string
//     constructor (name: string) {
//         this.name = name
//     }
// }

// class Child extends Parent {
//     constructor(name: string){
//         super(name)
//     }
// }

// 修饰符 public 修饰外部可以访问的属性和方法
// 修饰符 private 私有的 它修饰的属性在类外面是无法访问的
// class Parent1 {
//     private age:number
//     constructor(age:number){
//         this.age =age
//     }
// }
// const p = new Parent1(18)
// console.log(p) // Parent1 {age: 18}
// // console.log(p.age) // 不能访问
// class Child1 extends Parent1 {
//     constructor(age:number){
//         super(age)
//         console.log(super.age) // Only public and protected methods of the base class are accessible via the 'super' keyword.
//     }
// }
// 修饰符 protected 它修饰的属性可以再该类的子类中访问
// protected修饰符 还可以修饰constructor，此时类只能用于继承，不能创建实例

{
  // class Parent {
  //     protected age: number
  //     protected constructor(age:number){
  //         this.age = age
  //     }
  //     protected getAge(){
  //         return this.age
  //     }
  // }
  // // const p = new Parent(18) // Constructor of class 'Parent' is protected and only accessible within the class declaration.
  // class Child extends Parent {
  //     constructor(age:number){
  //         super(age)
  //         // console.log(super.age) // Only public and protected methods of the base class are accessible via the 'super' keyword. 通过super智能拿到父类的公共方法和受保护的方法
  //         console.log(super.getAge())
  //     }
  // }
}

{
  // readonly修饰符 将属性设置为只读
  // class UserInfo {
  //     public readonly name: string
  //     constructor(name:string){
  //         this.name = name
  //     }
  // }
  // const userInfo = new UserInfo('zhangsan')
  // console.log(userInfo.name)
  // console.log(userInfo.name = 'lisi') // Cannot assign to 'name' because it is a read-only property.
}
// {
//     // 参数属性
//     class A {
//         // public 修饰constructor参数，可以修饰属性，并让其可以放到实例上
//         constructor (public name:string){} // block is empty (no-empty) 关掉
//     }
//     const a1 = new A('zhangsan')
//     console.log(a1.name) // zhangsan
// }
// {
//     // 静态属性
//     class Parent {
//         public static age:number = 18
//         public static getAge() {
//             return Parent.age
//         }
//         private static father: string = 'zhansan'
//         constructor () {}
//     }
//     const p = new Parent()
//     console.log(Parent.age) // 18
//     console.log(Parent.getAge()) // 18
// }
// {
//     // 可选属性
//     class Info {
//         public name: string
//         public age?: number
//         constructor (name:string, age?:number, public sex?:string){
//             this.name = name
//             this.age = age
//         }
//     }
//     const info1 = new Info('zhangsan') // Info {sex: undefined, name: "zhangsan", age: undefined}
//     const info2 = new Info('zhangsan', 18) // Info {sex: undefined, name: "zhangsan", age: 18}
//     const info3 = new Info('zhangsan', 18, 'man') // Info {sex: "man", name: "zhangsan", age: 18}
//     console.log(info1, info2, info3)
// }
{
  // 存取器
  class Info {
    public name: string;
    public age?: number;
    private _infoStr: string;
    constructor(name: string, age?: number, public sex?: string) {
      this.name = name;
      this.age = age;
    }
    get infoStr() {
      return this._infoStr;
    }
    set infoStr(value) {
      console.log(`setter: ${value}`);
      this._infoStr = value;
    }
  }
  const info3 = new Info("zhangsan", 18, "man");
  info3.infoStr = "zhangsan: 18"; // setter: zhangsan: 18
  console.log(info3.infoStr); // zhangsan: 18
}
{
    // 抽象类 用于被其他类继承，而不是用来创建实例
    abstract class  People {
        constructor(public name: string) {}
        public abstract printName(): void
    }
    // const p1= new People() // Cannot create an instance of an abstract class.

}

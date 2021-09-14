// readonly

/* 
readonly修饰的变量只能在构造函数中初始化
在 TypeScript 中，const 是常量标志符，其值不能被重新分配
TypeScript 的类型系统同样也允许将 interface、type、 class 上的属性标识为 readonly
readonly 实际上只是在编译阶段进行代码检查。而 const 则会在运行时检查（在支持 const 语法的 JavaScript 运行时环境中）
*/

class Animal {
    public readonly name: string
    constructor(name:string) {
        this.name = name;
    }
    changeName(name:string){
        // this.name = name; // Cannot assign to 'name' because it is a read-only property.ts(2540)
    }
    getName () {
        console.log(this.name);
        
    }
}

let a = new Animal('zhangsan');
a.changeName('lisi');
a.getName() // zhangsan

export {}
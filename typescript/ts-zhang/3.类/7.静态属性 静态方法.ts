// 静态属性 静态方法
class Father {
    static className='Father';
    static getClassName() {
        return Father.className;
    }
    public name: string;
    constructor(name:string) {//构造函数
        this.name=name;
    }

}
console.log(Father.className); // Father
console.log(Father.getClassName()); // Father
export {}
// void 类型
/* 
void 表示没有任何类型
当一个函数没有返回值时，TS 会认为它的返回值是 void 类型。
 */

function greeting(name:string):void {
    console.log('hello',name);
    //当我们声明一个变量类型是 void 的时候，它的非严格模式(strictNullChecks:false)下仅可以被赋值为 null 和 undefined
    //严格模式(strictNullChecks:true)下只能返回undefined
    //return null;
    //return undefined;
}

export { }
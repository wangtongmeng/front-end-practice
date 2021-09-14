// 函数重载
/* 在Java中的重载，指的是两个或者两个以上的同名函数，参数不一样
在TypeScript中，表现为给同一个函数提供多个函数类型定义 */

let obj: any = {};
function attr(val: string): void;
function attr(val: number): void;
function attr(val: any): void {
    if (typeof val === 'string') {
        obj.name = val;
    } else {
        obj.age = val;
    }
}
attr('zhangsan');
attr(9);
// attr(true); // No overload matches this call.
console.log(obj);

export { }
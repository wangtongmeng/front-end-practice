// 任意类型(any)
/* any就是可以赋值给任意类型
第三方库没有提供类型文件时可以使用any
类型转换遇到困难时
数据结构太复杂难以定义 */

let root1:any=document.getElementById('root');
root1.style.color='red';


let root2:(HTMLElement|null)=document.getElementById('root');
root2!.style.color='red';//非空断言操作符
export { }
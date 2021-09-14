// 类数组
// 类数组（Array-like Object）不是数组类型，比如 arguments
// function sum() {
//     let args: IArguments = arguments;
//     for (let i = 0; i < args.length; i++) {
//         console.log(args[i]);
//     }
// }
// sum(1, 2, 3); 不行？

let root = document.getElementById('root');
let children: HTMLCollection = (root as HTMLElement).children;
children.length;
let nodeList: NodeList = (root as HTMLElement).childNodes;
nodeList.length;
export { }
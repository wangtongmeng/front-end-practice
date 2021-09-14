// 剩余参数

function sum(...numbers:number[]) {
    return numbers.reduce((val,item)=>val+=item,0);
}
console.log(sum(1,2,3)); // 6

export {}
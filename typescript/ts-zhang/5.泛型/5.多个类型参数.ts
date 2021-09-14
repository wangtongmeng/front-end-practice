// 多个类型参数

// 泛型可以有多个
function swap<A, B>(tuple: [A, B]): [B, A] {
    return [tuple[1], tuple[0]];
}
let swapped = swap<string, number>(['a', 1]);
console.log(swapped);
console.log(swapped[0].toFixed(2)); // 1.00
console.log(swapped[1].length); // 1
export { }
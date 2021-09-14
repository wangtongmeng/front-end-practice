// 默认泛型类型
function createArray3<T = number>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
let result2 = createArray3(3, 'x');
console.log(result2);
export { }
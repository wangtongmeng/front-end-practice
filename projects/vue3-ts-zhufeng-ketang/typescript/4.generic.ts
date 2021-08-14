// 泛型 , 用来在代码执行时传入的类型，来确定结果

function createArray<T>(len: number, value: T): T[] {
    let result = [];
    for (let i = 0; i < len; i++) {
        result.push(value);
    }
    return result
}
let arr = createArray(3, 'HELLO');

// 多个泛型  元组的交换 [boolean,number] = [number,boolean]

const swap = <T, K>(tuple: [T, K]): [K, T] => {
    return [tuple[1], tuple[0]]
}
swap<number, number>([1, 2])
export { }
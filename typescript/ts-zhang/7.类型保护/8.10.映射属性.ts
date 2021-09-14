// 映射属性
// 如果映射类型遍历的时候是unknown,不会映射属性

type getType<T> = {
    [P in keyof T]: number
}
type t = getType<unknown>;
export { }
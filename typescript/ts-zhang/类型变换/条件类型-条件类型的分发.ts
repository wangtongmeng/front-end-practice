interface Fish {
    fish: string
}
interface Water {
    water: string
}
interface Bird {
    bird: string
}
interface Sky {
    sky: string
}

type Condition<T> = {t: T} extends {t: Fish} ? Water : Sky // 如果T不是裸的，就不能分发，而是直接把类型传进来，T = Fish | Bird

// 条件的分发
let con1: Condition<Fish | Bird> = {sky: '天'}


//never会被自动过滤
type Diff<T, U> = T extends U ? never : T;

type R = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d" 

type Filter<T, U> = T extends U ? T : never;
type R1 = Filter<string | number | boolean, number>; // "number"
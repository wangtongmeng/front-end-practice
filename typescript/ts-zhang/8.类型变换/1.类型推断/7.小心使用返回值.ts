// 小心使用返回值

// 尽管 TypeScript 一般情况下能推断函数的返回值，但是它可能并不是你想要的


function addOne(a:any) {
    return a + 1;
}
function sum(a: number, b: number) {
    return a + addOne(b);
}

type Ret = ReturnType<typeof sum>;

export {}
// 泛型的兼容性

// 泛型在判断兼容性的时候会先判断具体的类型,然后再进行兼容性判断

//接口内容为空没用到泛型的时候是可以的
//1.接口内容为空没用到泛型的时候是可以的
interface Empty<T>{}
let x!:Empty<string>;
let y!:Empty<number>;
x = y;

//2.接口内容不为空的时候不可以
interface NotEmpty<T>{
  data:T
}
let x1!:NotEmpty<string>;
let y1!:NotEmpty<number>;
x1 = y1;

//实现原理如下,称判断具体的类型再判断兼容性
interface NotEmptyString{
    data:string
}

interface NotEmptyNumber{
    data:number
}
let xx2!:NotEmptyString;
let yy2!:NotEmptyNumber;
xx2 = yy2;
export {}
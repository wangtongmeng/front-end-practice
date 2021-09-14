// 交叉类型中的 unknown 类型
/* 
在交叉类型中，任何类型都可以吸收 unknown 类型。这意味着将任何类型与 unknown 相交不会改变结果类型
*/

type IntersectionType1 = unknown & null;       // null
type IntersectionType2 = unknown & undefined;  // undefined
type IntersectionType3 = unknown & string;     // string
type IntersectionType4 = unknown & number[];   // number[]
type IntersectionType5 = unknown & any;        // any
export {}
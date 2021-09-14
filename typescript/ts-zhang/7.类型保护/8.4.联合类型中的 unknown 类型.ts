// 联合类型中的 unknown 类型

/* 
在联合类型中，unknown 类型会吸收任何类型。这就意味着如果任一组成类型是 unknown，联合类型也会相当于 unknown：
*/

type UnionType1 = unknown | null;       // unknown
type UnionType2 = unknown | undefined;  // unknown
type UnionType3 = unknown | string;     // unknown
type UnionType4 = unknown | number[];   // unknown
export {}
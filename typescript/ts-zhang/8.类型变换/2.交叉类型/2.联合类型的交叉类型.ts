// 联合类型的交叉类型


type Ta = string | number;
type Tb = number | boolean;
type Tc = Ta & Tb; // Tc的类型是 number

export {}
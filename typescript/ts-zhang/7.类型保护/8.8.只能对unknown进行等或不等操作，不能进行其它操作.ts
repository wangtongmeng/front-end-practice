// 只能对unknown进行等或不等操作，不能进行其它操作

let un1: unknown
let un2: unknown
un1===un2;
un1!==un2;
un1 += un2;
export {}
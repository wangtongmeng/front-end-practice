// 事先考虑某一个变量的所有的可能的值，尽量用自然语言中的单词表示它的每一个值
// 比如性别、月份、星期、颜色、单位、学历

/* 普通枚举 */
enum Gender{
    GIRL,
    BOY
}
console.log(`李雷是${Gender.BOY}`);
console.log(`韩梅梅是${Gender.GIRL}`);

enum Week{
    MONDAY=1,
    TUESDAY=2
}
console.log(`今天是星期${Week.MONDAY}`);

/* 常数枚举 */
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
// 假如包含了计算成员，则会在编译阶段报错
const enum Colors {
    Red,
    Yellow,
    Blue
}

let myColors = [Colors.Red, Colors.Yellow, Colors.Blue];
const enum Color {Red, Yellow, Blue};

export { }
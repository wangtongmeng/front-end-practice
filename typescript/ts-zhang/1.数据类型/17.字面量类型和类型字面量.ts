// 字面量类型和类型字面量
/* 字面量类型的要和实际的值的字面量一一对应,如果不一致就会报错
类型字面量和对象字面量的语法很相似 */


// 字面量类型
const up: 'Up' = 'Up';
const down: "Down" = "Down";
const left: "Left" = "Left";
const right: "Right" = "Right";
type Direction = 'Up' | 'Down' | 'Left' | 'Right';
function move(direction: Direction) { }
move("Up");


type Person = {
    name: string, // 类型字面量
    age: number
};
export { }
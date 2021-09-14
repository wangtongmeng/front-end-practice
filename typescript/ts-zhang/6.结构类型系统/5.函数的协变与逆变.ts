// 函数的协变与逆变
/* 
协变（Covariant）：只在同一个方向；
逆变（Contravariant）：只在相反的方向；
双向协变（Bivariant）：包括同一个方向和不同方向；
不变（Invariant）：如果类型不完全相同，则它们是不兼容的。

A ≼ B 意味着 A 是 B 的子类型。

A → B 指的是以 A 为参数类型，以 B 为返回值类型的函数类型。
x : A 意味着 x 的类型为 A

返回值类型是协变的，而参数类型是逆变的

返回值类型可以传子类,参数可以传父类
参数逆变父类 返回值协变子类 搀你父,返鞋子

*/

class Animal { }
class Dog extends Animal {
    public name: string = 'Dog'
}
class BlackDog extends Dog {
    public age: number = 10
}
class WhiteDog extends Dog {
    public home: string = '北京'
}
let animal: Animal;
let blackDog: BlackDog;
let whiteDog: WhiteDog;
type Callback = (dog: Dog) => Dog;
function exec(callback: Callback): void {
    callback(whiteDog);
}
//不行  callback(redDog);
type ChildToChild = (blackDog: BlackDog) => BlackDog;
const childToChild: ChildToChild = (blackDog: BlackDog): BlackDog => blackDog
exec(childToChild);

//也不行,理由同上
type ChildToParent = (blackDog: BlackDog) => Animal;
const childToParent: ChildToParent = (blackDog: BlackDog): Animal => animal
exec(childToParent);

//不行 因为有可能调用返回的Dog的方法
type ParentToParent = (animal: Animal) => Animal;
const parentToParent: ParentToParent = (animal: Animal): Animal => animal
exec(parentToParent);

//可以,所有的狗都是动物,返回的不管什么狗都是狗
type ParentToChild = (animal: Animal) => BlackDog;
const parentToChild: ParentToChild = (animal: Animal): BlackDog => blackDog
exec(parentToChild);
//(Animal → Greyhound) ≼ (Dog → Dog)
//返回值类型很容易理解：黑狗是狗的子类。但参数类型则是相反的：动物是狗的父类！



// string | number|boolean 是 string | number的父类型
// string是string|number的子类型
type Callback2 = (a: string | number) => string | number;
function exec2(callback: Callback2):void{
    callback('');
}
type ParentToChild2 = (a: string | number | boolean) => string;
const parentToChild2: ParentToChild2 = (a: string | number | boolean): string => ''
exec2(parentToChild2);

type Callback3 = (a: string | number) => string | number;
function exec3(callback: Callback2): void {
    callback('');
}
type ParentToParent3 = (a: string) => string;
const parentToParent3: ParentToParent3 = (a: string): string => ''
exec3(parentToChild3);


// 在 TypeScript 中， 参数类型是双向协变的 ，也就是说既是协变又是逆变的，而这并不安全。但是现在你可以在 TypeScript 2.6 版本中通过 --strictFunctionTypes 或 --strict 标记来修复这个问题
export { }
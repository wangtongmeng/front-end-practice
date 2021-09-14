// 重写(override) vs 重载(overload)

/* 
重写是指子类重写继承自父类中的方法
重载是指为同一个函数提供多个类型定义
*/

class Animal{
    speak(word:string):string{
        return '动作叫:'+word;
    }
}
class Cat extends Animal{
    speak(word:string):string{
        return '猫叫:'+word;
    }
}
let cat = new Cat();
console.log(cat.speak('hello')); // 猫叫:hello
//--------------------------------------------
function double(val:number):number
function double(val:string):string
function double(val:any):any{
  if(typeof val == 'number'){
    return val *2;
  }
  return val + val;
}

let r = double(1);
console.log(r); // 2
export {}
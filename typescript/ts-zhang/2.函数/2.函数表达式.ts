// 函数表达式

// 定义函数类型
type GetUsernameFunction = (x:string,y:string)=>string;
let getUsername:GetUsernameFunction = function(firstName,lastName){
  return firstName + lastName;
}
export {}
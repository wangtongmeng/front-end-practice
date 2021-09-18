/**
 * 变量环境和词法环境
 * let和块级作用域 到底是如何实现的?
 */
 let a = 0;
 function fn() {
     var a = 1;
     let b = 2;
     {//第一个代码块
         let b = 3;
         c = 4;
         let d = 5;
         //console.log(a, b, c, d);//1 3 4 5
     }
     {//第二个代码块
         let b = 6;
         let d = 7; //ReferenceError: d is not defined
         console.log(a, b, c, d);//1 6 4 7
     }
 }
 fn();
 /* var a = 1;// window.a = global.variableEnvironment.a =1;
 let b = 2; //global.lexicalEnvironment.b = 2;
 console.log(window.a);
 console.log(window.b); */
 /**
  * 1.全局下编译
  * VO 变量对象 ，当函数执行上下文处于栈顶的时候，这个VO会变成AO
  * ES5里创建一个VO VariableObject => ActivationObject 
  * ES6 VariableEnvironment  变量环境 var function + LexicalEnvironment 
  */
 let globalEC = {
     //this: globalThis,//代表当前this指针
     outer: null,//外部执行上下文环境  相当实现了以前ES3中的scopeChain
     variableEnvironment: { fn() { } },
     lexicalEnvironment: [{ a: 0 }]
 }
 //2.编译fn
 //静态作用域 语法作用域 一个函数执行的时候的作用域是在通过function声明此
 let fnEC = {
     this: globalThis,//fnEC.outer等于声明fn变量的执行上下文环境对象中的VariableEnvironment对象
     outer: globalEC,
     variableEnvironment: { a: undefined, c: undefined },
     lexicalEnvironment: [{ b: undefined }]
 }
 //3.执行fn 进入第一个代码块的时候
 fnEC.variableEnvironment.a = 1;
 fnEC.variableEnvironment.b = 2;
 //每当函数执行的时候遇到了一个新的代码块，就会创建一个新的词法环境对象
 fnEC.lexicalEnvironment.push({ b: undefined, d: undefined });
 fnEC.lexicalEnvironment[1].b = 3;
 fnEC.variableEnvironment.c = 4;
 fnEC.lexicalEnvironment[1].d = 5;
 //console.log(a, b, c, d);//1 3 4 5
 function getValue(name, ec) {
     for (let i = ec.lexicalEnvironment.length - 1; i >= 0; i--) {
         if (name in ec.lexicalEnvironment[i]) {
             return ec.lexicalEnvironment[i][name];
         }
     }
     if (name in ec.variableEnvironment) {
         return ec.variableEnvironment[name];
     }
     if (ec.outer) {
         return getValue(name, ec.outer);
     }
     return null;
 }
 console.log(getValue('a', fnEC), getValue('b', fnEC), getValue('c', fnEC), getValue('d', fnEC));
 //var function 放在ve le constant 放在le
 // let fn = () => {} 
 // let 会放在词法环境里 LE
 
 //4.执行fn 进入第2个代码块的时候
 fnEC.lexicalEnvironment.pop();
 fnEC.lexicalEnvironment.push({
     b: undefined,
     d: undefined
 });
 fnEC.lexicalEnvironment[1].b = 6;
 fnEC.lexicalEnvironment[1].d = 7;
 console.log(getValue('a', fnEC), getValue('b', fnEC), getValue('c', fnEC), getValue('d', fnEC));


//  练习
function two() { // two的outer是globalEC
    console.log(a);
}
function one() {
    var a = 2;
    two(); // 1
}
var a = 1;
one();
let globalEC = {
    ve: {
        two,
        one,
        a
    }
}
 



'use strict'
function fn() {
    console.log("out");
}
(function () {
    if (false) {
        function fn() {
            console.log("in");
        }
    }
    fn();
}());
// out
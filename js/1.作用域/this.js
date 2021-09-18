/* 
当前函数的this是在被调用的时候才能确定的
如果当前的执行上下文处于调用栈的栈顶，这个时候变量对象变成了活动对象，THIS指针才能确定
*/

/* 
1.全局对象
全局对象this指向本身
*/

var a = 1;//声明绑定变量对象，但在全局环境中，变量对象就是全局对象
this.b = 2;//this绑定全局对象
c = 3;//赋值操作 隐式绑定


/* 
2.用点调用
在一个函数上下文中，this由函数的调用者提供，由调用函数的方式来决定指向
如果是函数执行,如果前面有点，那么点前面是谁this就是谁
*/
let obj = {
    getName() {
        console.log(this); // this是对象 { getName: [Function: getName] }
    }
};
obj.getName();


/* 
3.直接调用
如果没有,this就是window(严格模式下是undefined),自执行函数中的this一般都是window
*/
let obj = {
    getName() {
        console.log(this);
    }
};
let getName = obj.getName;
getName(); // window


/* 
4.绑定事件
给元素绑定事件的时候，绑定的方法中的this一般是元素本身
*/
// container.addEventListener('click',function(){
//     console.log(this);
// });


/* 
5.箭头函数
箭头函数没有自己的this
也没有prototype
也没有arguments
无法创建箭头函数的实例
*/
let fn = () => {
    console.log(this);
    console.log(arguments);//Uncaught ReferenceError: arguments is not defined
}
console.log(fn.prototype);//undefined
fn();
new fn();//VM4416:8 Uncaught TypeError: fn is not a constructor


/* 
6.构造函数
构造函数中的THIS是当前类的实例
*/

function fn(){
    console.log(this); // fn {}
}
let obj = new fn();


/* 
7.call/apply/bind
call/apply/bind可以改变函数中this的指向
第一个参数是改变this指向(非严格模式下，传递null/undefined指向也是window)
call参数是依次传递，apply是以数组的方式传递
*/
!function (proto) {
    function getContext(context) {
        context = context || window
        let type = typeof context
        if(['number','string','boolean', 'null'].includes(type)){
            context = new context.constructor(context)
        }
        return context
    }
    function  call(context, ...args) {
        context = getContext(context)
        context._fn = this
        let result = context._fn(...args)
        delete context._fn
        return result

    }
    function apply(context, args) {
        context = getContext(context)
        context._fn = this
        let result = context._fn(...args)
        delete context._fn
        return result
    }
    function bind(context, ...bindArgs) {
        return (...args) => this.call(context, ...bindArgs, ... args)
    }
    proto.call = call
    proto.apply = apply
    proto.bind = bind
}(Function.prototype)

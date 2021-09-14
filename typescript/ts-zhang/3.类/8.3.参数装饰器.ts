


/* 参数装饰器 */
/* 
会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元数据
    第1个参数对于静态成员是类的构造函数，对于实例成员是类的原型对象
    第2个参数的名称
    第3个参数在函数列表中的索引

*/
namespace d {
    interface Person {
        age: number;
    }
    function addAge(target: any, methodName: string, paramsIndex: number) {
        console.log(target); // {}
        console.log(methodName); // login
        console.log(paramsIndex);
        target.age = 10; // 1
    }
    class Person {
        login(username: string, @addAge password: string) {
            console.log(this.age, username, password); // 10 zhangsan 123456
        }
    }
    let p = new Person();
    p.login('zhangsan', '123456')
}

export { }
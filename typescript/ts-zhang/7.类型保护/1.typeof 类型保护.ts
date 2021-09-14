// 类型保护
/* 
类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型
类型保护就是能够通过关键字判断出分支中的类型
*/

// typeof 类型保护

function double(input: string | number | boolean) {
    if (typeof input === 'string') {
        return input + input;
    } else {
        if (typeof input === 'number') {
            return input * 2;
        } else {
            return !input;
        }
    }
}

double(1)
double('1')
double(true)

export { }
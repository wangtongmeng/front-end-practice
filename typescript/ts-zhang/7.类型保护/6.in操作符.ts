// in操作符
// in 运算符可以被用于参数类型的判断
interface Bird {
    swing: number;
}

interface Dog {
    leg: number;
}

function getNumber(x: Bird | Dog) {
    if ("swing" in x) {
        return x.swing;
    }
    return x.leg;
}

getNumber({
    swing: 1
})
export { }
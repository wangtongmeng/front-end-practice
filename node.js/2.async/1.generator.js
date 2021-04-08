// 核心靠的就是switch case 来实现的

function * read() {
    var a = yield 1
    console.log(a)
    var b = yield 2
    console.log(b)
    var c = yield 3
    console.log(c)
}
let it = read()

var obj = it.next()
console.log(obj)


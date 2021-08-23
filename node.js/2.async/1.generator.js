// 核心靠的就是switch case 来实现的

/* generator使用 */
function * read() {
    var a = yield 1
    console.log(a) // b
    var b = yield 2
    console.log(b) // c
    var c = yield 3
    console.log(c) // d
}
let it = read()

var obj = it.next('a') // next的入参会给上一个yield的返回值，所以第一个next传参是没有意义的
console.log(obj); // { value: 1, done: false } 这里的value: 1 是 yield后表达式(promise，不是也会包装成promise)的结果
var obj = it.next('b')
console.log(obj); // { value: 2, done: false }
var obj = it.next('c')
console.log(obj); // { value: 3, done: false }
var obj = it.next('d')
console.log(obj); // { value: undefined, done: true }


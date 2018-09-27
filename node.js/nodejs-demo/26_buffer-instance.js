/*
buf.length
buf.toString()
buf.fill()
buf.equals()
buf.indexOf()
buf.copy()
*/

const buf = Buffer.from('This is a test!')
console.log(buf.length); // 15
// 注意，length 指的是 buffer 占用的字节数

const buf2 = Buffer.allocUnsafe(10) // 申请 10 个空间
buf2[0] = 2
console.log(buf2.length); // 10

console.log(buf.toString('base64')); // 转成base64的字符串，默认是utf8
console.log(buf.toString());

const buf3 = Buffer.allocUnsafe(10)
console.log(buf3); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buf3.fill(10, 2, 6)); // <Buffer 00 00 0a 0a 0a 0a 00 00 00 00>

const buf4 = Buffer.from('test')
const buf5 = Buffer.from('test')
const buf6 = Buffer.from('test!')

console.log(buf4.equals(buf5)); // true
console.log(buf4.equals(buf6)); // false




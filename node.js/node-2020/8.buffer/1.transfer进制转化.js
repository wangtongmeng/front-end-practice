// js中有进制转换的方法 不用自己转换

// 任意进制转二进制
console.log(parseInt('11111110', 2)) // 254

// js可以识别浮点类型 所以多加个.
console.log(255.0.toString(16)) // ff 字符串类型 可以将任何进制转换成任何进制

// 0.1 + 0.2 !== 0.3 ? 
// 将小数转换成2进制 乘2取值 
// 0.1 * 2 = 0.2    0
// 0.2 * 2 = 0.4    0
// 0.4 * 2 = 0.8    0
// 0.8 * 2 = 1.6    1 => 0.6
// 0.6 * 2 = 1.2    1 => 0.2 无限循环 到一定位会省略 => 取出来的值比以前的大


// base64是如何转换出来的？  数据传递 替代url node不支持gbk编码 只支持utf8
// base64缺点 转化结果比之前大1/3
// 转换原理：一个汉字是由3个字节组成的，把每个字节转成二进制3*8，拆分成4*6后再转成10进制数，之后去特定的规则里查找字符组成最终结果
// node中可以利用 Buffer.from('你').toString('base64') 将汉字转成base64

// -------------这里是字符串转成base64
let r = Buffer.from('你')
// console.log(r) // <Buffer e4 bd a0> 3个字节 3 * 8

console.log(0xe4.toString(2)) // 11100100
console.log(0xbd.toString(2)) // 10111101
console.log(0xa0.toString(2)) // 10100000

// 3*8拆分成4*6 111001 001011 110110 100000 这样四部分都不超过64 (补码，6位前面缺德两位补0)

console.log(parseInt('111001',2)) // 57
console.log(parseInt('001011',2)) // 11
console.log(parseInt('110110',2)) // 54
console.log(parseInt('100000',2)) // 32

let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str+=str.toLowerCase()
str+='0123456789+/'

console.log(str[57] + str[11] + str[54] + str[32]) // 5L2g 测试：https://tool.oschina.net/encrypt?type=3
// -------------这里是字符串转成base64



console.log(Buffer.from('你').toString('base64')) // 5L2g

// csv 前端读取csv
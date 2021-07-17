
// 在服务端，我们需要一个东西可以来标识内存 。但是不能是字符串，因为字符串无法标识图片
// node中用Buffer来标识内存的数据 他把内容转换成了16进制来显示 （16进制比较短）


// 10进制 -> 255  0b11111111 2进制  0xff  16进制    buffer每个字节的取值范围就是 0 - 0xff

// node中buffer可以和字符串任意的转换 （可能会出现乱码）

// 编码规范 ASCII (美国人) -> GB18030/GBK -> unicode -> UTF8  编码的发展史 
// http://www.zhufengpeixun.com/grow/html/8.Encoding.html

// 单字节（因为字母，符号.. 都是一个字节）
// 中国为了能标识自己  （gb2312/GB18030/GBK） 对于文字来说是由2个字节组成的
// unicode 希望统一所有编码 -> 可变字节长度交 没有统一成功
// utf组织解决了这个问题 （utf8编码 一个汉字有3个字节组成）
// http://www.zhufengpeixun.com/grow/html/8.Encoding.html#t101.8%20Unicode

// 全部统一成utf8, node 不支持gbk 只支持utf8
// Buffer代表的是内存，内存是一段“固定空间”， 产生的内存是固定大小，不能随意添加
// 扩容的概念，需要动态创建一个新的内容，把内容迁移过去

// npm install @types/node 可以支持node提示 (仅仅是安装了ts的提示而已，为了方便)
let buffer1 = Buffer.alloc(5);
console.log(buffer1) // <Buffer 00 00 00 00 00> 5个字节
console.log(buffer1[0]); // 0 像数组（但是和数组有区别），数组可以扩展，buffer不能扩展，可以用索引取值,取出来的内容是10进制

// 此方法用的非常少，我们不会直接填16进制
let buffer2 = Buffer.from([0x25, 0x26, 300]); // 超过255 会取余
console.log(buffer2[0]) // 37

// let buffer3 = Buffer.from('张三'); //6个字节
// console.log(buffer3) // <Buffer e5 bc a0 e4 b8 89>

// 一般情况下，我们会alloc来声明一个buffer，或者把字符串转换成buffer使用
// 后台获取的数据都是buffer，包括后面的文件操作也都是buffer形式

// buffer的使用。  无论是2进制还是16进制他们表现的东西都是一样的

// base64“编码”，在后期使用的过程中用的非常多 （base64 没有加密功能）  所有人都知道这个规范
// 加密 -》 解密 
// base64 可以字符串可以放到任何路径的链接里 （可以减少请求的发送） 文件大小会变大（如果采用base64 他的缓存会依赖文件）， base64转化完毕后会比之前的文件大1/3
// const r = Buffer.from('张'); // 可以调用toString转化成指定的编码
// console.log(r) // <Buffer e5 bc a0>
// base64 的来源就是将每个字节多转化成 小于64的值
// console.log(0xe5.toString(2)); // 11100101
// console.log(0xbc.toString(2)); // 10111100
// console.log(0xa0.toString(2)); // 10100000

// 11100101 10111100 10100000  3 x 8 =>  6 * 4
// 111001 011011 110010 100000
// console.log(parseInt('111001', 2)) // 57
// console.log(parseInt('011011', 2)) // 27
// console.log(parseInt('110010', 2)) // 50
// console.log(parseInt('100000', 2)) // 32

// // 0-63 取值范围是 64
// let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// str += str.toLocaleLowerCase();
// str += '0123456789+/';
// // 57 27  50 32
// console.log(str[57] + str[27] + str[50] + str[32]); // 5byg 没有加密功能
// // https://tool.oschina.net/encrypt?type=3



// 回到buffer toString('utf8'/'base64'); 默认 utf8

// console.log(Buffer.from('张').toString()) // 张
// console.log(Buffer.from('张').toString('base64')) // 5byg


// alloc from 

// slice 

// let buffer4 = Buffer.from([1,2,3,4,5]); // 内部存的是引用地址
// console.log(buffer4) // <Buffer 01 02 03 04 05>
// let slicBuffer = buffer4.slice(0,1);
// slicBuffer[0] = 100;
// console.log(buffer4) // <Buffer 64 02 03 04 05> 改变的是同一个buffer


// let arr = [[1],2,3,4];
// let newArr = arr.slice(0,1); // 二维数组的slice 相当于buffer，数组中存的是引用地址slice是浅拷贝
// newArr[0][0] = 100;
// console.log(arr); // [ [ 100 ], 2, 3, 4 ]

// 实现非递归版本的深拷贝。

// copy 可以将buffer的数据拷贝到另一个buffer上 （一般用不到，concat是基于copy的）

// let buf0 = Buffer.from('张三')
// let buf1 = Buffer.from('吃');
// let buf2 = Buffer.from('饭');

// Buffer.prototype.copy = function(targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
//     for (let i = sourceStart; i < sourceEnd; i++) {
//         targetBuffer[targetStart++] = this[i];
//     }
// }
// let bigBuffer = Buffer.alloc(12); // == new Buffer(12)
// buf0.copy(bigBuffer, 0, 0, 6);
// buf1.copy(bigBuffer, 6, 0, 3);
// buf2.copy(bigBuffer, 9); // 默认后两个参数不用传递

// console.log(bigBuffer.toString()) // 张三吃饭


// concat
let buf0 = Buffer.from('张三')
let buf1 = Buffer.from('吃');
let buf2 = Buffer.from('饭');
Buffer.concat = function(bufferList, length = bufferList.reduce((a, b) => a + b.length, 0)) {
    let bigBuffer = Buffer.alloc(length);
    let offset = 0;
    bufferList.forEach(buf=>{
        buf.copy(bigBuffer,offset)
        offset += buf.length
    })
    return bigBuffer
}
let bigBuf = Buffer.concat([buf0, buf1, buf2],100) // http 数据是分包传递的，把每段数据进行拼接
console.log(bigBuf.toString())


//  isBuffer   
console.log(Buffer.isBuffer(bigBuf)); // true
console.log(bigBuf.byteLength,bigBuf.length,Buffer.from('张三').length); // 100 100 6
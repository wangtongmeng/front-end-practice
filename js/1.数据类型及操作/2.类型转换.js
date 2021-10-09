// 说一下js中类型转化的规则

// if () {} 会判断 true/false值    几个false值 false undefined null '' 0 NaN
if (false || undefined || null || '' || 0 || NaN) {
  console.log(1); // 不会执行
}
// ! 可以值转换成boolean类型
console.log('!number', !1) // false
console.log('!string', !'1') // false
console.log('!boolean', !true) // false
console.log('!null', !null) // true
console.log('!undefined', !undefined) // true
console.log('!obj', !{}) // false
console.log('!symbol', !Symbol('1')) // false

// 运算符 +-*/  其中+号还有字符串拼接的含义
console.log(1/'a') // NaN

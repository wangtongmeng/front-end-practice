
// md5特点 摘要算法 不叫加密算法 (加密 必须解密) 但是 md5无法反解释

// 1) 两段不同的内容 摘要出的结果的长度不同
// 2) 如果传入的内容不同输出的结果不同 雪崩效应(传入的东西一样结果一样)
// 3) md5 不可逆

const crypto = require('crypto') // 内置模块

// 撞库：根据用户输入的值 和我表中的作对比 如果对比一样了 说明这个值被撞到了
// 多次摘要 多次md5(>3次)


// update方法里可以放buffer和字符串 可以多次update
console.log(crypto.createHash('md4').update('1234').digest('base64'))
console.log(crypto.createHash('md4').update('12345').digest('base64'))
console.log(crypto.createHash('md4').update('123').update('45').digest('base64'))


// 如果文件过大则不合适  大小长度也可以
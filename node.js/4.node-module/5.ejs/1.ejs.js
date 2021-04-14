// new Function + with来实现的  面试时 这样答 + 字符串拼接
// const ejs = require('ejs');
const fs = require('fs');
const util = require('util');
const read = util.promisify(fs.readFile);

// let ejs = {
//     async renderFile (filename, options) {
//         let content = await read(filename, 'utf8')
//         content = content.replace(/<%=(.+?)%>/g, function () {
//             return options[arguments[1]]
//         })
//         return content
//     }
// };

let ejs = {
    async renderFile(filename, options) {
        let content = await read(filename, 'utf8');
        content = content.replace(/<%=(.+?)%>/g, function() { // .+ 后面加? => 非贪婪
            return '${'+arguments[1]+'}' // 获取对应的内容做这件事  arguments[1] ()中的内容
        });
        let head = 'let str = "";\nwith(obj){\n str+=`';
        let body = content = content.replace(/<%(.+?)%>/g, function() {
            return '`\n' + arguments[1] + '\nstr+=`'
        });
        let tail = '`} return str';
        let fn = new Function('obj',head + body + tail);
        return fn(options);
    }
};
(async function() {
    // let r = await ejs.renderFile('template.html', { name: 'zhangsan', age: 18 })
    // 复杂的情况
    let r = await ejs.renderFile('template.html', { arr: [1, 2, 3] })
    console.log(r);
})();

// 拼接出我想要的代码来
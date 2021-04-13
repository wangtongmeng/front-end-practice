// new Function + with实现的

const ejs = require('ejs');

(async function () {
    let r = await ejs.renderFile('template.html', {name: 'zhangsan', age:12})
    console.log(r)
})();

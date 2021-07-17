
const Application = require('./application')
// 创建 应用和 应用的本身做分割
// 封装
function createApplication() {
    return new Application();
}
module.exports = createApplication
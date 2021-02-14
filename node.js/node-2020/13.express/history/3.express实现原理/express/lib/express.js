
const Application = require('./application')
// express拆分 1.createApplication 创建应用 2.application 应用 3.router


const createApplication = function () {
    // 封装代码
    return new Application()
}

module.exports = createApplication
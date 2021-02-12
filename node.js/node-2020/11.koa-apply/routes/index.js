let articleRouter = require('./articleRouter')
let userRouter = require('./userRouter')

let combineRouters = require('koa-combine-routers')

module.exports = combineRouters(articleRouter, userRouter)
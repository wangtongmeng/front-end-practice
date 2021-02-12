// 添加文章 文章查询
const UserController = require('../controller/userController js')

let Router = require('koa-router')
let userCtrl= new UserController()

// article...
const router = new Router({prefix:'/user'})


router.get('/add', userCtrl.add)
router.get('/list', userCtrl.list)

module.exports = router
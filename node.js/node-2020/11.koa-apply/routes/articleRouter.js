// 添加文章 文章查询
const ArticleController = require('../controller/articleController')

let Router = require('koa-router')
let articleCtrl= new ArticleController()

// article...
const router = new Router({prefix:'/article'})


router.get('/add', articleCtrl.add)
router.get('/list', articleCtrl.list)

module.exports = router
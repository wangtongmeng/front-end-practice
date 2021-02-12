class ArticleController {
    add(ctx, next) {
        ctx.body = '文章添加'
    }
    list(ctx, next) {
        ctx.body = '文章查询'
    }
}

module.exports = ArticleController
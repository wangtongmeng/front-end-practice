const UserModel = require('./model/user')
const mongoose = require('mongoose')

let arr = []
for (let i = 0; i < 10; i++) {
    arr.push({
        username: 'zs' + i,
        password: 'abc' + i,
        age: i,
        gender: 0
    })
}

(async () =>{
    // 添加内容 添加后会返回添加的信息
    // let users = await UserModel.create(arr)

    // 查询 find 查询所有  findById 查询一个
    // 条件查询 并且的情况  或的情况 范围的情况
    // let users = await UserModel.find({})
    
    // 条件查询
    // let users = await UserModel.find({
    //     username: 'zs4',
    //     password: 'abc4'
    // }, {
    //     age:1, // 1要显示的列
    //     gender:1,
    //     _id: 0 // _id不显示  普通字段的1和0只能用一种
    // })

    // 或查询 范围查询 常见的操作符 有$or $in $gt $lt
    // let users = await UserModel.find({
    //     $or: [{username:'zs1'},{username:'zs2'}]
    // })

    // 高级查询 分页
    // 个数 限制个数 跳过个数 排序  (这些方法 在调用的时候 没有顺序问题)
    // 执行顺序 是在所有中 先查找  先跳过 在限制显示
    // const limit = 3
    // const currentPage = 2
    // let users = await UserModel.find({}).skip((currentPage - 1) * limit).limit(limit).sort({age:-1})

    // 更新
    // 以前的api叫 update 现在更新一个叫updateOne  更新多个叫updateMany
    // 默认可以追加新的字段
    // let doc = await UserModel.updateOne({username:'111'},{username:'xxx'},{upsert:true})
    // console.log(doc)

    // 删除
    let r = await UserModel.deleteOne({username: 'xxx'})
    console.log(r);

    // console.log(users);

    mongoose.disconnect()
})()
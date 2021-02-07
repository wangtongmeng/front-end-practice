/**
 * 文件操作
 */
const fs = require('fs')
const path = require('path')

// 1.文件夹 1.创建 2.删除 3.是不是文件夹  4.文件夹中的内容

// 这些方法也分同步和异步

// 这里以异步代码为例。异步代码稍微复杂一些


// fs.mkdir('a/b',(err)=>console.log(err)) // 创建目录前 需要保证父目录存在

// fs.rmdir('a', err=>console.log(err)) // 删除目录时需要保证目录中的内容是空的




// fs.readdir('a', (err, dirs) => { // 读取的结果只有儿子一层
//     dirs = dirs.map(item => {
//         let p = path.join('a', item) // 如果文件不存在就报错
//         console.log(p)
//         fs.stat(p, function (err, stat) {
//             console.log(stat.isDirectory(), stat.isFile())
//             if (stat.isFile()) {
//                 fs.unlink(p, () => {})
//             }
//         })
//         return p
//     })
// })


// 创建文件夹 fs.mkdir
// 删除文件夹 fs.rmdir
// 查看文件夹 fs.readdir(一层)
// 查看文件夹状态 fs.stat()
// 是不是文件 isFile 是不是文件夹 isDirectory 删除文件 unlink



// 异步删除文件夹 串行 并行


// 异步串行的方式 后序遍历的方式              如果用层序遍历该怎么实现？
// function rmdir(dir, cb) {
//     fs.stat(dir, (err, statObj) => {
//         if (statObj.isFile()) {
//             fs.unlink(dir, cb)
//         } else {
//             // 读取文件夹中的内容
//             fs.readdir(dir, (err, dirs) => {
//                 dirs = dirs.map(item => path.join(dir, item))

//                 // 先删子 再删父
//                 let idx = 0

//                 function next() {
//                     if (idx == dirs.length) return fs.rmdir(dir, cb)
//                     let current = dirs[idx++]
//                     rmdir(current, next)
//                 }
//                 next()
//             })
//         }
//     })
// }


// 异步并行
function rmdir(dir, cb) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isFile()) {
            fs.unlink(dir, cb)
        } else { // Promise.all
            // 读取文件夹中的内容
            fs.readdir(dir, (err, dirs) => {
                dirs = dirs.map(item => path.join(dir, item))

                // 先删子 再删父
                // 并发删除多个儿子 删除完毕后通知父亲
                if (dirs.length == 0) {
                    return fs.rmdir(dir, cb)
                }
                let idx = 0

                function done() {
                    if (++idx == dirs.length) {
                        fs.rmdir(dir, cb)
                    }
                }
                for (let i = 0; i < dirs.length; i++) {
                    let dir = dirs[i]
                    rmdir(dir, done)
                }

            })
        }
    })
}



rmdir('a', function () {
    console.log('删除成功') // 递归先考虑两层
})
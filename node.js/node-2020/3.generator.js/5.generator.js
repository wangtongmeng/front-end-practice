/**
 * generator运行机制
 */
let fs = require('fs').promises // async+await === generator+co

function *read(){ // switch-case => babel编译后就是把一个函数分成多个case采用指针的方式向下移动
    let name = yield fs.readFile('name.txt', 'utf8')
    let age = yield fs.readFile(name, 'utf8')
    return age
}

function co(it) { // 异步迭代采用函数的方式
    return new Promise((resolve, reject)=>{
        function step(data){
            let {value,done}=it.next(data)
            if(!done){
                Promise.resolve(value).then(data=>{
                    step(data)
                }, reject)
            } else {
                resolve(value) // 将最终的结果抛出去
            }
        }
        step()
    })
}

co(read()).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})

// let it = read()
// let {value,done} =it.next() // 第一次传参没有意义
// value.then(data=>{
//     let {value,done} = it.next(data) // 这里传入的参数会作为上一次yield的返回值
//     value.then(data=>{
//         let {value,done} = it.next(data)
//         console.log(value)
//     })
// })
let fs = require('fs').promises // async+await === generator+co

async function read(){ // switch-case => babel编译后就是把一个函数分成多个case采用指针的方式向下移动
    let name = await fs.readFile('name.txt', 'utf8')
    let age = await fs.readFile(name, 'utf8')
    return age
}

// async方法执行后返回的是一个promise
read().then(data=>{
    console.log(data)
})

// async+await 是generator的语法糖
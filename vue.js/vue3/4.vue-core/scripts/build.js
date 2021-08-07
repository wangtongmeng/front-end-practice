// 这里就是我们要针对monorepo 进行编译项目
// node 来解析packages目录 
const fs = require('fs');
const execa = require('execa'); // 可以理解成可以打开一个进程去做打包操作

// 读取目录中的 我要打包的文件夹
const dirs =  fs.readdirSync('packages').filter(p=>{
    if(!fs.statSync(`packages/${p}`).isDirectory()){
        return false;
    }
    return true;
});

// 并行打包所有文件夹 
async function build(target){ // rollup -c -environment TARGET=shared
    await execa('rollup',['-c','--environment',`TARGET:${target}`],{stdio:'inherit'}); // 子进程的输出 需要在父进程中打印
}
async function runParallel(dirs,iterFn){ // 并发去打包，每次打包都调用build方法
    let result = [];
    for(let item of dirs){
        result.push(iterFn(item));
    }
    return Promise.all(result); // 存储打包时的promise，等待所有全部打包完毕后，调用成功
}
runParallel(dirs,build).then(()=>{
    console.log('成功')
})
// 10:40
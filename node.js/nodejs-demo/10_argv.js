/*
  argv
  argv0
  execArgv
  execPath
*/

const {argv, argv0, execArgv, execPath} = process

argv.forEach(item => {
  console.log(item);
});
/*
C:\Program Files\nodejs\node.exe // 执行命令路径
C:\Users\wangtongmeng\Desktop\github-repo\front-end-practice\node.js\nodejs-demo\10_argv.js // 执行文件路径
node .\10_argv.js -- test a=1 b=2 // 也可以加参数
*/

console.log('argv0', argv0); // 打印出执行命令路径

console.log(execArgv); // 调用 node 传的特殊参数
// node --inspect .\10_argv.js，--inspect

console.log(execPath); // 脚本路径



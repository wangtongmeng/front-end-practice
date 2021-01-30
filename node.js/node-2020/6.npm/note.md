## npm的使用
- 包是由很多模块组成的(在node中每一个js都是一个模块)
- npm init -y 初始化包的信息文件，json不能写注释
- 包分为全局包和本地包，代码中使用的都是本地包 全局包只能在命令行中使用
- nrm(npm registry manager)默认npm源 很慢 npm install nrm -g 强制覆盖 --force
```
C:\Users\wangtongmeng\AppData\Roaming\npm\nrm -> C:\Users\wangtongmeng\AppData\Roaming\npm\node_modules\nrm\cli.js
```
> npm之所以能够直接使用是因为npm放到了path目录，其他通过npm安装的全局包都在npm下。所以可以直接当成全局命令来执行

- npm link 把当前模块临时放到npm下 方便调试使用
- 全局包必须增加bin字段，会通过配置做软链 执行文件添加`#! /usr/bin/env node`表示用node执行 
```js
{
  "name": "npm-package-demo",
//   "bin": "./bin/www.js", 单执行命令， npm-package-demo
  "bin": {
    "tm": "./bin/www.js" // 多执行命令  tm
  },
}
```
- 安装模块(第三方模块) 依赖方式 1.开发依赖(webpack) 2.项目依赖(vue) 3.同版本依赖 4.捆绑依赖 5.可选依赖
- 开发: npm install webpack --save-dev / npm install webpack -D
- 项目：npm install jquery -S / --save / 新版本可以省略 npm install 默认会安装所有包 npm install --production 只安装生产环境下的
- 常见的版本号(major翻天覆地的变化,minor一些接口修改,patch打补丁) 正式版 ^2.2.0 必须以2开头不能低于当前版本 ~2.2.2 >= <= 1.0.0-2.0.0
- alpha beta rc  https://github.com/vuejs/vue-next的tag
- 通过命令生成包版本 npm version major/minor/patch
- npm version major + git 可以实现版本管理
- scripts + npx包发布 （会默认将当前node_modules下的.bin目录放到全局）只有在运行scripts或者npx 当前目录才可以使用，运行后就会删除掉 npx mime a.js(npx比scripts的好处是如果模块不存在会安装 安装后会销毁，表示安装时采用最新的包来安装)
- 配置scripts命令后，可以通过 npm run xxx来执行，例如 npm run dev -- a.js (--用来占位)
- 发包 nrm use npm 切换成npm源 npm addUser/npm login 输入账号密码 npm publish
- events模块


同版本依赖 安装包后会提醒 需要手动安装的包
```json
"peerDependencies": {
    "vue": "2.6.12"
  },
```

捆绑依赖 npm pack 打包的时候默认是不包含node_modules的，如果配置了捆绑依赖则会一起打包。
```json
{
    "bundledDependencies": [
        "webpack"
    ]
}
```
可选依赖
```json
{
    "optionsDependencies": {
        "vue": "2.6.12"
    },
}
```
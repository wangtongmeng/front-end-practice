
const path = require('path');
const fs = require('fs');
const types = require('babel-types');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const baseDir = toUnitPath(process.cwd());//\
function toUnitPath(filePath) {
    return filePath.replace(/\\/g, '/');
}
class Complication {
    constructor(options) {
        this.options = options;
        //webpack4 数组  webpack5 set
        this.entries = [];//存放所有的入口
        this.modules = [];// 存放所有的模块
        this.chunks = [];//存放所的代码块
        this.assets = {};//所有产出的资源
        this.files = [];//所有产出的文件
    }
    build(callback) {
        //5. 根据配置中的entry找出入口文件
        let entry = {};
        if (typeof this.options.entry === 'string') {
            entry.main = this.options.entry;
        } else {
            entry = this.options.entry;
        }
        //entry={entry1:'./src/entry1.js',entry2:'./src/entry2.js'}
        for (let entryName in entry) {
            //5.获取 entry1的绝对路径
            let entryFilePath = toUnitPath(path.join(this.options.context, entry[entryName]));
            //6.从入口文件出发,调用所有配置的Loader对模块进行编译
            let entryModule = this.buildModule(entryName, entryFilePath);
            //this.modules.push(entryModule);
            //8. 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
            let chunk = {
                name: entryName, entryModule, modules: this.modules.filter(item => {
                    return item.name === entryName || item.extraNames.includes(entryName);
                })
            };
            this.entries.push(chunk);
            this.chunks.push(chunk);
        }
        //9. 再把每个Chunk转换成一个单独的文件加入到输出列表
        this.chunks.forEach(chunk => {
            let filename = this.options.output.filename.replace('[name]', chunk.name);
            // this.assets就是输出列表 key输出的文件名 值就是输出的内容
            this.assets[filename] = getSource(chunk);
        });

        callback(null, {
            entries: this.entries,
            chunks: this.chunks,
            modules: this.modules,
            files: this.files,
            assets: this.assets
        });
    }
    //name=名称,modulePath=模块的绝对路径
    buildModule(name, modulePath) {
        //6. 从入口文件出发,调用所有配置的Loader对模块进行编译
        //1.读取模块文件的内容 
        let sourceCode = fs.readFileSync(modulePath, 'utf8');//console.log('entry1');
        let rules = this.options.module.rules;
        let loaders = [];///寻找匹配的loader
        for (let i = 0; i < rules.length; i++) {
            let { test } = rules[i];
            //如果此rule的正则和模块的路径匹配的话
            if (modulePath.match(test)) {
                loaders = [...loaders, ...rules[i].use];
            }
        }
        sourceCode = loaders.reduceRight((sourceCode, loader) => {
            return require(loader)(sourceCode);
        }, sourceCode);

        /*  for(let i=loaders.length-1;i>=0;i--){
             let loader = loaders[i];
             sourceCode = require(loader)(sourceCode);
         } */
        //console.log('entry1');//2//1
        //console.log(sourceCode);
        //7. 再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
        //获得当前模块模块ID ./src/index.js
        let moduleId = './' + path.posix.relative(baseDir, modulePath);
        let module = { id: moduleId, dependencies: [], name, extraNames: [] };
        let ast = parser.parse(sourceCode, { sourceType: 'module' });
        traverse(ast, {
            CallExpression: ({ node }) => {
                if (node.callee.name === 'require') {
                    //依赖的模块的相对路径
                    let moduleName = node.arguments[0].value;//./title1
                    //获取当前模块的所有的目录
                    let dirname = path.posix.dirname(modulePath);// /
                    //C:/Users/wtm/Desktop/front-end-practice/webpack/4.flow/src/title1.js
                    let depModulePath = path.posix.join(dirname, moduleName);
                    let extensions = this.options.resolve.extensions;
                    depModulePath = tryExtensions(depModulePath, extensions);//已经包含了拓展名了
                    //得到依赖的模块ID C:/Users/wtm/Desktop/front-end-practice/webpack/4.flow/src/title1.js
                    //相对于项目根目录 的相对路径 ./src/title1.js
                    let depModuleId = './' + path.posix.relative(baseDir, depModulePath);
                    //require('./title1');=>require('./src/title1.js');
                    node.arguments = [types.stringLiteral(depModuleId)];
                    //依赖的模块绝对路径放到当前的模块的依赖数组里
                    module.dependencies.push({ depModuleId, depModulePath });
                }
            }
        });
        let { code } = generator(ast);
        module._source = code;//模块源代码指向语法树转换后的新生成的源代码
        //7. 再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
        module.dependencies.forEach(({ depModuleId, depModulePath }) => {
            let depModule = this.modules.find(item => item.id === depModuleId);
            if (depModule) {
                depModule.extraNames.push(name);
            } else {
                let dependencyModule = this.buildModule(name, depModulePath);
                this.modules.push(dependencyModule);
            }
        });
        return module;
    }
}
function getSource(chunk) {
    return `
    (() => {
        var modules = ({
            ${chunk.modules.map(module => `
                    "${module.id}":(module,exports,require)=>{
                        ${module._source}
                    }
                `).join(',')
        }
        });
        var cache = {};
        function require(moduleId) {
          var cachedModule = cache[moduleId];
          if (cachedModule !== undefined) {
            return cachedModule.exports;
          }
          var module = cache[moduleId] = {
            exports: {}
          };
          modules[moduleId](module, module.exports, require);
          return module.exports;
        }
        var exports = {};
        (() => {
         ${chunk.entryModule._source}
        })();
      })()
        ;
    `
}
function tryExtensions(modulePath, extensions) {
    extensions.unshift('');
    for (let i = 0; i < extensions.length; i++) {
        let filePath = modulePath + extensions[i];// ./title.js
        if (fs.existsSync(filePath)) {
            return filePath;
        }
    }
    throw new Error(`Module not found`);
}
module.exports = Complication;
import { forEachValue } from '../utils';
import Module from './module'
export default class ModuleCollection{
    constructor(options){
        this.root = null; // 最后将数据绑定到root上 栈来管理父子关系 
        this.register([],options)
    }
    register(path,rootModule){
        let module = new Module(rootModule)
        if(path.length == 0){
            this.root = module; // 直接将模块定义在根上  [a,b,c]
        }else{ 
            let parent = path.slice(0,-1).reduce((memo,current)=> memo.getChild(current),this.root);
            parent.addChild(path[path.length-1],module)
        }
        if(rootModule.modules){
            forEachValue(rootModule.modules,(module,moduleName)=>{ // [父亲,儿子,孙子]
                this.register(path.concat(moduleName),module)
            })
        }
    }
}
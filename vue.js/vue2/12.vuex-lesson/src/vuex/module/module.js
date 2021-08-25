import { forEachValue } from "../utils";

export default class Module{
    constructor(rootModule){
        this._raw = rootModule;
        this._children = {}
        this.state = rootModule.state
    }
    getChild(key){
        return this._children[key]
    }
    addChild(key,module){
        this._children[key] = module;
    }
    forEachMutation(callback){
        if(this._raw.mutations){
            forEachValue(this._raw.mutations,callback)   
        }
    }
    forEachAction(callback){
        if(this._raw.actions){
            forEachValue(this._raw.actions,callback)   
        }
    }
    forEachGetter(callback){
        if(this._raw.getters){
            forEachValue(this._raw.getters,callback)   
        }
    }
    forEachChildren(callback){
        if(this._children){
            forEachValue(this._children,callback)   
        }
    }
}
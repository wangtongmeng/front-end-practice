

class HookCodeFactory {
    setup(hookInstance, options) {
        //把tapInfo中的fn取出变成数组赋值给hookInstance._x
        hookInstance._x = options.taps.map(tapInfo => tapInfo.fn);
    }
    args(options = {}) {//{taps,args,type}
        let { before, after } = options;
        let allArgs = this.options.args || [];//args = ['name','age'];
        if (before) allArgs = [before, ...allArgs];
        if (after) allArgs = [...allArgs, after];
        return allArgs.join(',');//name,age
    }
    header() {
        let code = '';
        code += `var _x = this._x;\n`;
        return code;
    }
    callTapsSeries() {
        let taps = this.options.taps;
        if (taps.length === 0) {
            return ''
        }
        let code = '';
        for (let i = 0; i < this.options.taps.length; i++) {
            let content = this.callTap(i)
            code += content
        }
        return code;
    }
    //onDone是每一个事件函数执行后的回调
    callTap(tapIndex) {
        //var _fn0 = _x[0];_fn0(name, age);
        let code = '';
        code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;
        let tapInfo = this.options.taps[tapIndex];//{name,fn,type}
        switch (tapInfo.type) {
            case 'sync':
                code += `_fn${tapIndex}(${this.args()})\n`;
                break;
            case 'async':
                code += `_fn${tapIndex}(${this.args({
                    after: ` function () {
                        if (--_counter === 0) _done();
                    }`
                })});\n`;
                break;
            default:
                break;
        }
        return code;
    }
    init(options) {
        this.options = options;
    }
    deinit() {
        this.options = null;
    }
    create(options) {
        this.init(options);
        let fn;
        switch (options.type) {//sync
            case 'sync'://同步
                fn = new Function(
                    this.args(),//name,age
                    this.header() + this.content()
                );
                break;
            case 'async'://异步
                fn = new Function(
                    this.args({ after: '_callback' }),//name,age
                    this.header() + this.content({ onDone: () => "_callback();\n" })
                );
                break;
            default:
                break;
        }
        this.deinit();
        return fn;
    }

}
module.exports = HookCodeFactory;
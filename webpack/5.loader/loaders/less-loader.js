let less = require('less');
/**
 * 希望这个loader可以放在最左侧
 * @param {*} inputSource 
 *   传入的参籹
 *   如果是最后在的或者说最右边的loader,参数就是模块的内容
 *   如果不是最后一个,参数就是上一个loader返回的内容
 */
function loader(inputSource) {
    console.log('less-loader');
    //默认情况下loader的执行是同步的,如果调用了async方法,可以把loader的执行变成异步
    let callback = this.async();
    //this.callback
    //写死的,就是同步
    less.render(inputSource, { filename: this.resource }, (err, output) => {
        //less-loader其实返回的是一段JS脚本,也就是说它可以放在最左侧
        callback(null, `module.exports = ${JSON.stringify(output.css)}`);
    });
}
module.exports = loader;
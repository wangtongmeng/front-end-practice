//normal 必须有的
function loader(inputSource){//'inline2-loader-pitch返回值'
    console.log('inline1-normal');
    return inputSource+'//inline1-normal'
}
//可无可无
loader.pitch = function(){
    console.log('pitch-inline1-loader');
    //如果pitch没有返回值,那就会执行下一个loader 的pitch函数
    //如果有返回值呢,不会继续执行后续的loader就会直接返回
    //return '返回值'
}

module.exports = loader;


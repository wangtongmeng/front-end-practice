//normal 必须有的
function loader(inputSource){//console.log('entry');//pre2-normal
    console.log('pre1-normal');
    return inputSource+'//pre1-normal'//console.log('entry');//pre2-normal//pre1-normal
}
//可无可无
loader.pitch = function(){
    console.log('pitch-pre1-loader');
}

module.exports = loader;


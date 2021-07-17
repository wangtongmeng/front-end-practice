//normal 必须有的
function loader(inputSource){//inputSource=console.log('entry');
    console.log('pre2-normal');
    return inputSource+'//pre2-normal'//console.log('entry');//pre2-normal
}
//可无可无
loader.pitch = function(){
    console.log('pitch-pre2-loader');
}

module.exports = loader;


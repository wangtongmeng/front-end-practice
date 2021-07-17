//normal 必须有的
function loader(inputSource){
    console.log('inline2-normal');
    return inputSource+'//inline2-normal'
}
//可无可无
loader.pitch = function(){
    console.log('pitch-inline2-loader');
}

module.exports = loader;


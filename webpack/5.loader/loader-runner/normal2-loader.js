//normal 必须有的
function loader(inputSource){
    console.log('normal2-normal');
    return inputSource+'//normal2-normal'
}
//可无可无
loader.pitch = function(){
    console.log('pitch-normal2-loader');
}

module.exports = loader;


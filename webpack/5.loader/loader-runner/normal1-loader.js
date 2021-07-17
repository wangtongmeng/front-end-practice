//normal 必须有的
function loader(inputSource){
    console.log('normal1-normal');
    return inputSource+'//normal1-normal'
}
//可无可无
loader.pitch = function(){
    console.log('pitch-normal1-loader');
}

module.exports = loader;


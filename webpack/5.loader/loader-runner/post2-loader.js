//normal 必须有的
function loader(inputSource){
    console.log('post2-normal');
    return inputSource+'//post2-normal'
}
//可无可无
loader.pitch = function(){
    console.log('pitch-post2-loader');
}

module.exports = loader;


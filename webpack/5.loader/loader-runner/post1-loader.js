//normal 必须有的
function loader(inputSource){
    console.log('post1-normal');
    return inputSource+'//post1-normal'
}
//可无可无
loader.pitch = function(){
    console.log('pitch-post1-loader');
}

module.exports = loader;


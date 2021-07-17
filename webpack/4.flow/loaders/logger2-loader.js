

function loader(source){
   console.log('logger2-loader.js');
   return source+'//2';
}
module.exports = loader;
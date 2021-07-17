

function loader(source){
   console.log('logger1-loader.js');
   return source+'//1';
}
module.exports = loader;